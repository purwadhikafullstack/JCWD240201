const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');
const db = require('../models');
const { getCart, getCartByPk, getUserCarts } = require('../helpers/cartHelper');
const { getUserByPk } = require('../helpers/authHelper');
const Cart = db.cart;
const Transaction = db.transaction;
const TransactionDetail = db.transaction_detail;
const TransactionHistory = db.transaction_history;
const ClosedStockDB = db.closed_stock;
const Product = db.product;
const PrescriptionCartDB = db.prescription_cart;
const Promotion = db.promotion;
const StockHistoryDB = db.stock_history;
const ClosedStock = db.closed_stock;
const OpenStock = db.opened_stock;
const UserDB = db.user;
const { sequelize } = require('../models');
const { getOldIsSelected } = require('../helpers/addressHelper');
const {
  getUserTransactions,
  getTransactionById,
} = require('../helpers/transactionHelper');
const { getPromotionByProductId } = require('../helpers/promotionHelper');
const { unitConversionHelper } = require('../helpers/unitConversionHelper');

const checkout = async (req, res, next) => {
  console.log('masuk checkout');
  const t = await sequelize.transaction();
  try {
    const userId = req.user.id;
    const {
      shippingFee = 10000,
      discount,
      activeCart,
      promotionActive,
      courier,
      duration,
      totalPrice,
    } = req.body;

    let whereQuery = { user_id: userId, is_check: true };
    const { rows, count } = await getUserCarts('', whereQuery);

    const cartQty = rows.reduce((accumulator, object) => {
      return accumulator + object.qty;
    }, 0);

    if (cartQty !== activeCart)
      throw { message: 'Check again your cart', code: 400 };

    // cek promoTransaction
    let totalDiscount = 0,
      totalAllPriceDB = 0;
    if (promotionActive) {
      const promoTx = await Promotion.findByPk(promotionActive);
      if (!promoTx)
        throw {
          message: 'Promotion not Found!',
          code: 400,
          data: promotionActive,
        };
      if (promoTx && promoTx.minimum_transaction <= totalPrice) {
        if (promoTx.limit <= 0) throw { message: 'Promotion quota exceed' };
        let disc = (totalPrice * promoTx.discount) / 100;
        totalDiscount +=
          disc > promoTx.maximum_discount_amount
            ? promoTx.maximum_discount_amount
            : disc;

        //update promo limit
        await Promotion.update(
          {
            ...promoTx,
            limit: promoTx.limit - 1,
          },
          { where: { id: promoTx.id }, transaction: t },
        );
      }
    }
    //checkDiscount
    const address = await getOldIsSelected(userId);
    console.log(address, '>>>>');
    //create transaction
    const transaction = await Transaction.create(
      {
        promotion_id: promotionActive || null,
        user_id: userId,
        // image
        city_id: address.city_id,
        notes: address.notes,
        address: address.address,
        phone_number: address.phone_number,
        receiver: address.receiver,
        shipment_fee: shippingFee,
        total_discount: discount,
        total_price: totalPrice,
        shipment: courier + ' ' + duration,
      },
      { transaction: t },
    );

    //create transactionDetail Data Model
    let stockHistoryData = [],
      closedStockData = [],
      promotionData = [];
    const txDetailData = await Promise.all(
      rows.map(async (value) => {
        totalAllPriceDB += value.qty * value.product.price;
        if (value.product_id !== 1) {
          //cekPromotion & promotionStock
          if (value.product.promotions.length !== 0) {
            // console.log(value);
            if (value.dataValues.disc != 0) {
              //promo disc
              totalDiscount += value.qty * value.dataValues.disc;
              if (value.product.promotions[0].limit < value.qty)
                throw {
                  message: 'not enough stocks (Promotion)',
                  code: 400,
                  data: value,
                };
            }

            //update promo limit
            promotionData.push({
              ...value.product.promotions[0],
              limit:
                value.product.promotions[0].limit -
                (value.disc == 0 ? 1 : value.qty),
            });
          }

          // cekStock
          if (
            (value.product.closed_stocks.length !== 0,
            value.product.closed_stocks[0].total_stock < value.qty)
          ) {
            throw { message: 'not enough stocks', code: 400, data: value };
          }

          const newStock =
            value.product.closed_stocks[0].total_stock -
            (value.product.promotions.length !== 0 && value.disc == 0 // promo buy get
              ? value.qty +
                (value.product.promotions[0].get -
                  value.product.promotions[0].buy)
              : //selisih, karna tdk berlaku kelipatan
                value.qty);

          closedStockData.push({
            ...value.product.closed_stocks[0].dataValues,
            total_stock: newStock,
          });

          // write stockHistory MODEL
          stockHistoryData.push({
            product_id: value.product_id,
            transaction_id: transaction.id,
            unit: 0,
            stock_history_type_id: 4,
            qty: value.qty,
            action: 'out',
            total_stock: newStock,
          });
        } else {
          const prescriptionCarts = await PrescriptionCartDB.findAll({
            where: {
              cart_id: value.id,
            },
          });
          prescriptionCarts.map(async (prescCart) => {
            await unitConversionHelper(
              {
                product_id: prescCart.product_id,
                qty: value.qty,
              },
              t,
            );
          });
        }

        return {
          product_id: value.product_id,
          promotion_id:
            value.product.promotions.length !== 0
              ? value.product.promotions[0].id
              : null,
          transaction_id: transaction.id,
          product_name: value.product.name,
          price: value.product.price - (value.disc ? value.disc : 0),
          prescription_image: value.prescription_image || null,
          qty: value.qty,
        };
      }),
    );

    if (totalDiscount !== Number(discount))
      throw {
        code: 400,
        message: 'promotion changed',
        // data: { totalDiscount, discount },
      };

    if (totalAllPriceDB !== Number(totalPrice))
      throw {
        code: 400,
        message: 'Total changed',
        // data: { totalAllPriceDB, totalPrice },
      };

    //update To Database
    await Promotion.bulkCreate(promotionData, {
      updateOnDuplicate: ['limit'],
      transaction: t,
    });
    await ClosedStock.bulkCreate(closedStockData, {
      updateOnDuplicate: ['total_stock'],
      transaction: t,
    });
    await StockHistoryDB.bulkCreate(stockHistoryData, { transaction: t });
    await TransactionDetail.bulkCreate(txDetailData, { transaction: t });

    const cartIds = rows.map((value) => {
      return value.id;
    });

    await Cart.destroy({ where: { id: [...cartIds] }, transaction: t });

    await TransactionHistory.create(
      {
        transaction_id: transaction.id,
        transaction_status_id: 1,
        is_active: true,
      },
      { transaction: t },
    );
    // throw { message: 'sabar' };
    await t.commit();

    return res.status(200).send({
      success: true,
      message: 'Checkout Success',
      data: txDetailData,
      // pageCount: count,
    });
  } catch (error) {
    await t.rollback();
    console.log(error);
    next(error);
  }
};

const getAllTransaction = async (req, res, next) => {
  try {
    const user = await UserDB.findByPk(req.user.id);

    const {
      searchStatusId = '',
      sortType,
      sortOrder,
      search = '',
      page = 1,
      startDate,
      endDate,
      limitPage,
    } = req.query;

    let whereQuery = {};
    whereQuery.dates = { startDate, endDate };
    whereQuery.transaction = {};

    if (user.role_id !== 1) whereQuery.transaction.user_id = user.id;

    whereQuery.transactionHistory = {
      transaction_status_id: { [Op.like]: `%${searchStatusId}%` },
      is_active: true,
    };
    whereQuery.transactionDetail = {
      product_name: { [Op.like]: `%${search}%` },
    };
    if (limitPage)
      whereQuery.pagination = {
        limit: Number(limitPage),
        offset: (Number(page) - 1) * limitPage,
      };

    const { count, rows } = await getUserTransactions(whereQuery, {
      sortType,
      sortOrder,
    });
    console.log(whereQuery);
    // console.log(startDate);

    return res.status(200).send({
      success: true,
      message: 'Get All Transaction Success',
      data: rows,
      pageCount: count,
      totalPage: Math.ceil(count / (limitPage || 1)),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserDB.findByPk(req.user.id);

    const transaction = await getTransactionById(id, user.role_id === 1);

    return res.status(200).send({
      success: true,
      message: 'Get Transaction Success',
      data: transaction,
      // pageCount: count,
    });
  } catch (error) {
    next(error);
  }
};

const uploadPayment = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { transaction_id, transaction_status_id } = req.body;
    const image = req.file;
    const imagePath = image ? image.path : undefined;
    if (!image) throw { message: 'Please upload image' };
    const updateTransaction = await Transaction.update(
      { image: imagePath },
      { where: { id: transaction_id } },
      { transaction: t },
    );

    const txFind = await TransactionHistory.findOne({
      where: { is_active: true, transaction_id },
    });

    if (txFind !== null) {
      const txUpdate = await TransactionHistory.update(
        { is_active: false },
        {
          where: { is_active: true, transaction_id },
        },
        { transaction: t },
      );
    }

    const txCreate = await TransactionHistory.create(
      {
        is_active: true,
        transaction_id,
        transaction_status_id,
      },
      { transaction: t },
    );

    await t.commit();
    return res.status(200).send({
      success: true,
      message: 'Upload payment Success',
      data: [],
    });
  } catch (error) {
    console.log(error);

    await t.rollback();
    next(error);
  }
};
const cancelTransaction = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const user = await UserDB.findByPk(req.user.id);

    const transaction = await getTransactionById(id, user.role_id === 1);

    if (!transaction) throw { message: 'transaction not found', code: 400 };
    if (user.role_id !== 1 && user.id !== transaction.user_id)
      throw { message: 'transaction not found', code: 400 };

    const status = await TransactionHistory.findOne({
      where: { transaction_id: transaction.id, is_active: true },
    });

    if (status.status === 'Cancelled') throw { message: 'Already Cancelled' };

    let promoUpdateData = [],
      stockUpdateData = [],
      openStockUpdateData = [];
    //cek promotion
    if (transaction.promotion_id) {
      const promoTx = await Promotion.findByPk(transaction.promotion_id);
      if (promoTx)
        promoUpdateData.push({
          ...promoTx.dataValues,
          limit: promoTx.limit + 1,
        });
    }

    let isPrescription = false;
    await Promise.all(
      transaction.transaction_details.map(async (value) => {
        //getPromotionData
        if (value.product_id !== 1) {
          if (value.promotion_id) {
            const promoProd = await Promotion.findByPk(value.promotion_id);
            // throw { message: 'testtt', data: promoProd };
            promoUpdateData.push({
              ...promoProd.dataValues,
              limit: promoProd.limit + 1,
            });
          }

          //getStockData
          const stockProduct = await ClosedStock.findOne({
            where: { product_id: value.product_id },
          });
          stockUpdateData.push({
            ...stockProduct.dataValues,
            total_stock: stockProduct.total_stock + value.qty,
          });
        } else {
          isPrescription = true;
        }
      }),
    );
    if (isPrescription) {
      // kalo dalam 1 cart ada 2 resep
      const prescriptionDetail = await StockHistoryDB.findAll({
        where: { transaction_id: transaction.id, stock_history_type_id: 4 },
      });
      await Promise.all(
        prescriptionDetail.map(async (value) => {
          if (unit === 0) {
            const stockProduct = await ClosedStock.findOne({
              where: { product_id: value.product_id },
            });
            stockUpdateData.push({
              ...stockProduct.dataValues,
              total_stock: stockProduct.total_stock + value.qty,
            });
          } else {
            // unit conversion
            const stockProduct = await OpenStock.findOne({
              where: { product_id: value.product_id },
            });
            openStockUpdateData.push({
              ...stockProduct.dataValues,
              total_stock: stockProduct.total_stock + value.qty,
            });
          }
        }),
      );
    }

    await Promotion.bulkCreate(promoUpdateData, {
      updateOnDuplicate: ['limit'],
      transaction: t,
    });
    await ClosedStock.bulkCreate(stockUpdateData, {
      updateOnDuplicate: ['total_stock'],
      transaction: t,
    });
    await OpenStock.bulkCreate(openStockUpdateData, {
      updateOnDuplicate: ['total_stock'],
      transaction: t,
    });
    //stockHistory
    await StockHistoryDB.destroy({
      where: { transaction_id: transaction.id },
      transaction: t,
    });

    //transactionDetail
    //none

    //transactionHistory
    // const
    await TransactionHistory.update(
      {
        is_active: false,
      },
      {
        where: { transaction_id: transaction.id, is_active: true },
        transaction: t,
      },
    );
    await TransactionHistory.create(
      {
        transaction_id: transaction.id,
        transaction_status_id: 7,
        is_active: true,
      },
      { transaction: t },
    );

    await t.commit();

    // const updatedTransaction = await Transaction.findByPk(id);

    return res.status(200).send({
      success: true,
      message: 'Transaction Cancelled',
      data: transaction,
    });
  } catch (error) {
    console.log(error);
    await t.rollback();
    next(error);
  }
};

module.exports = {
  checkout,
  getAllTransaction,
  getTransaction,
  uploadPayment,
  cancelTransaction,
};
