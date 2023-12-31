const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Handlebars = require('handlebars');
const fs = require('fs');
const db = require('../models');
const productCategoryDB = db.product_category;
const labelDB = db.label;
const transporter = require('../helpers/transporter');
const productDB = db.product;
const productImageDB = db.product_image;
const packagingDB = db.packaging_type;
const productTypeDB = db.product_type;
const openedStockDB = db.opened_stock;
const closedStockDB = db.closed_stock;
const promotionDB = db.promotion;
const { sequelize } = require('../models');
const deleteFiles = require('../helpers/deleteFiles');
const path = require('path');
// Get the current script's directory
const currentDir = __dirname;
// Go up one levels to get the desired directory
const oneLevelsUpDir = path.join(currentDir, '..');

const getAllProducts = async (req, res, next) => {
  try {
    const {
      page,
      search,
      limit,
      sortType,
      sortOrder,
      minPrice,
      maxPrice,
      category_id,
    } = req.query;
    const today = new Date();
    const pageLimit = Number(limit);
    const offset = (Number(page) - 1) * pageLimit;
    let where = {};
    let label = {};
    let order = [];
    where.name = { [Op.like]: `%${search}%` };
    where.id = { [Op.not]: 1 };

    if (minPrice && maxPrice) {
      where.price = {
        [Op.and]: [{ [Op.gte]: Number(minPrice), [Op.lte]: Number(maxPrice) }],
      };
    }

    if (sortType) {
      order = [[sortType, sortOrder]];
    } else {
      order = [['name', 'ASC']];
    }
    const response = await productDB.findAndCountAll({
      include: [
        { model: labelDB },
        { model: packagingDB },
        { model: productTypeDB },
        { model: closedStockDB },
        { model: openedStockDB },
        {
          model: promotionDB,
          where: {
            [Op.and]: [
              { limit: { [Op.gt]: 0 } },
              { date_start: { [Op.lte]: today } },
              { date_end: { [Op.gte]: today } },
            ],
          },
          required: false,
        },
        { model: productImageDB },
      ],
      limit: pageLimit,
      offset: offset,
      where: where,
      //  {
      //   ...where,
      //   price: {
      //     [Op.and]: [
      //       { [Op.gte]: Number(minPrice), [Op.lte]: Number(maxPrice) },
      //     ],
      //   },
      //   // price: { [Op.lte]: Number(maxPrice) },
      // },

      order: order,
      distinct: true,
    });
    const totalPage = Math.ceil(response.count / pageLimit);

    return res.status(200).send({
      success: true,
      message: 'get all products success',
      totalPage: totalPage,
      data: response,
    });
  } catch (error) {
    next(error);
    // return res.send({
    //   success: false,
    //   message: error.message,
    // });
  }
};
const getProductDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const today = new Date();
    const response = await productDB.findOne({
      include: [
        { model: packagingDB },
        { model: productTypeDB },
        { model: productImageDB },
        {
          model: promotionDB,
          where: {
            // [Op.and]: [
            //  limit: { [Op.gt]: 0 } ,
            date_start: { [Op.lte]: today },
            date_end: { [Op.gte]: today },
            // ],
          },
          required: false,
        },
      ],
      where: { id },
    });
    const labels = await labelDB.findAll({
      include: productCategoryDB,
      where: { product_id: id },
    });
    const openedStock = await openedStockDB.findOne({
      where: { product_id: id },
    });
    const closedStock = await closedStockDB.findOne({
      where: { product_id: id },
    });

    return res.status(200).send({
      success: true,
      message: 'get product details success',
      labels: labels,
      data: response,
      opened_stock: openedStock,
      closed_stock: closedStock,
    });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    //get data from client
    const data = JSON.parse(req.body.data);
    const productCategories = JSON.parse(req.body.productCategories); //array of category id

    //create product data
    let postProduct = await productDB.create({ ...data }, { transaction: t });

    const dataToCreate = req.files.product_images.map((value) => {
      return {
        product_id: postProduct.id,
        image: `${value.fieldname}/${value.filename}`,
      };
    });

    await productImageDB.bulkCreate(dataToCreate, {
      transaction: t,
      ignoreDuplicate: true,
    });

    const categoryData = productCategories.map((value) => {
      return { product_id: postProduct.id, category_id: value };
    });

    await labelDB.bulkCreate(categoryData, {
      transaction: t,
      ignoreDuplicate: true,
    });

    await closedStockDB.create(
      { product_id: postProduct.id, total_stock: 0 },
      { transaction: t },
    );

    await t.commit();

    return res.send({
      success: true,
      status: 200,
      message: 'Create product success',
      data: postProduct,
    });
  } catch (error) {
    await t.rollback();
    deleteFiles(req.files.product_images);
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { productId } = req.params;
    const findImageData = await productImageDB.findAll({
      where: { product_id: productId },
    });

    const oldPath = findImageData.map((value) => {
      return value.image;
    });

    //delete data
    await productDB.destroy({ where: { id: productId } , transaction: t });
    await productImageDB.destroy(
      { where: { product_id: productId }, transaction: t  },
    );
    await labelDB.destroy(
      { where: { product_id: productId } , transaction: t },
    );

    await t.commit();
    
    let isDirectoryExist = fs.existsSync(`${oneLevelsUpDir}/public/deleted_product_images`);

    if (!isDirectoryExist) {
      await fs.promises.mkdir(`${oneLevelsUpDir}/public/deleted_product_images`, {
        recursive: true,
      });
    }

    oldPath.map((value) => {
      const fileName = value.split('/');
      const newPath = `${oneLevelsUpDir}/public/deleted_product_images/${
        fileName[fileName.length - 1]
      }`;
      fs.rename(`${oneLevelsUpDir}/public/${value}`, newPath, function (err) {
        if (err) throw err;
      });
    });

    return res.send({
      success: true,
      status: 200,
      message: 'Delete product success',
      data: null,
    });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    //get data from client
    const { productId } = req.params;
    const data = JSON.parse(req.body.data);
    const categoryId = JSON.parse(req.body.categoryId);

    //search product image
    if (req.files.product_images) {
      const getImage = await productImageDB.findOne({
        where: { product_id: productId },
      });

      if (getImage) {
        //find image old path and new path
        const findImageData = await productImageDB.findOne({
          where: { product_id: productId },
        });
      
        var oldPath = `${oneLevelsUpDir}/public/${findImageData.image}`;
        var fileName = findImageData.image.split('/');
        var newPath = `${oneLevelsUpDir}/public/deleted_product_images/${
          fileName[fileName.length - 1]
        }`;

        //delete old image
        await productImageDB.destroy(
          { where: { product_id: productId }, transaction: t },
        );
      }
    }

    //delete old label
    await labelDB.destroy(
      { where: { product_id: productId }, transaction: t  },
      
    );

    //update product data
    const updateProduct = await productDB.update(
      data,
      {
        where: { id: productId },transaction: t
      },
    );

    const labelData = categoryId.map((value) => {
      return { product_id: productId, category_id: value };
    });

    await labelDB.bulkCreate(labelData, {
      transaction: t,
      ignoreDuplicate: true,
    });

    if (req.files.product_images) {
      var productImage = req.files.product_images.map((value) => {
        return {
          product_id: productId,
          image: `${value.fieldname}/${value.filename}`,
        };
      });

      await productImageDB.bulkCreate(productImage, {
        transaction: t,
        ignoreDuplicate: true,
      });
    }

    await t.commit();

    let isDirectoryExist = fs.existsSync(`${oneLevelsUpDir}/public/deleted_product_images`);

    if (!isDirectoryExist) {
      await fs.promises.mkdir(`${oneLevelsUpDir}/public/deleted_product_images`, {
        recursive: true,
      });
    }

    //move old image to deleted folder
    if (oldPath && newPath) {
      fs.rename(oldPath, newPath, function (err) {
        if (err) throw err;
      });
    }

    return res.send({
      success: true,
      status: 200,
      message: 'Update product success',
      data: updateProduct,
    });
  } catch (error) {
    await t.rollback();
    deleteFiles(req.files.product_images);
    next(error);
  }
};

const getPackaging = async (req, res, next) => {
  try {
    const result = await packagingDB.findAll();

    return res.send({
      success: true,
      status: 200,
      message: 'get data success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getProductType = async (req, res, next) => {
  try {
    const result = await productTypeDB.findAll();

    return res.send({
      success: true,
      status: 200,
      message: 'get data success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductDetails,
  createProduct,
  deleteProduct,
  updateProduct,
  getPackaging,
  getProductType,
};
