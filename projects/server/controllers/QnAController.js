const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Handlebars = require('handlebars');
const fs = require('fs');
const db = require('../models');
const questionDB = db.question;
const transporter = require('../helpers/transporter');

const getQuestions = async (req, res) => {
  try {
    const { page, search, sort, limit } = req.query;
    const pageLimit = Number(limit);
    const offset = (page - 1) * pageLimit;
    let response = await questionDB.findAll({
      limit: pageLimit,
      offset: offset,
      order: [['updatedAt', 'DESC']],
    });
    const totalPage = response.length;
    console.log(totalPage);
    return res.status(200).send({
      success: true,
      message: 'get questions success',
      data: response,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const createQuestion = async (req, res) => {
  const { question, user_id } = req.body;
  console.log('question');
  try {
    let result = await questionDB.create({ question, user_id });

    return res.status(201).send({
      success: true,
      message: 'Your question was created successfully',
      data: result,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createQuestion, getQuestions };
