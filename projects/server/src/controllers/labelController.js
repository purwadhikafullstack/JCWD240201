const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Handlebars = require('handlebars');
const fs = require('fs');
const db = require('../models');
const productCategoryDB = db.product_category;
const labelDB = db.label;
const productDB = db.product;
const productImageDB = db.product_image;
const promotionDB = db.promotion;
const transporter = require('../helpers/transporter');

const getLabels = async (req, res, next) => {
  try {
    const { page, search, limit, sortType, sortOrder, category } = req.query;
    const pageLimit = Number(limit);
    const offset = (Number(page) - 1) * pageLimit;
    const today = new Date();
    let order = [];
    const whereLabel = {};
    const whereCat = {};
    if (category) {
      whereCat.category_name = category;
    }
    if (sortType) {
      order = [['product', sortType, sortOrder]];
    } else {
      order = [['product', 'updatedAt', 'DESC']];
    }
    const categories = await productCategoryDB.findOne({ where: whereCat });
    whereLabel.category_id = categories.dataValues.id;
    const response = await labelDB.findAndCountAll({
      include: [
        {
          model: productDB,
          include: [
            { model: productImageDB },
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
          ],
          // where: { name: { [Op.like]: `%${search}%` } },
        },
        productCategoryDB,
      ],
      limit: pageLimit,
      offset: offset,
      where: whereLabel,
      order: order,
    });
   
    const totalPage = Math.ceil((response.count - 1) / pageLimit);
    const key = 'product';
    const uniqueResponse = [
      ...new Map(response.rows.map((item) => [item[key], item])).values(),
    ];

    return res.status(200).send({
      success: true,
      message: 'get labels success',
      totalPage: totalPage,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const getProductLabels = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await labelDB.findAll({
      include: productCategoryDB,
      where: { id: id },
    });

    return res.status(200).send({
      success: true,
      message: 'get product labels success',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getLabels, getProductLabels };
