const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const QnARouter = require('./QnARouter');
const cartRoute = require('./cartRoute');
const productRoute = require('./productRoute');
const addressRoute = require('./addressRoute');
const categoryRoute = require('./categoryRoute');
const labelRoute = require('./labelRoute');
const transactionRoute = require('./transactionRoute');
const txStatusRoute = require('./transactionStatusRoute');
const rajaOngkirRoute = require('./rajaOngkirRoute');
const stockRoute = require('./stockRoute');
const promotionRoute = require('./promotionRoute');
const txHistoryRoute = require('./transactionHistoryRoute');

module.exports = {
  authRoute,
  userRoute,
  QnARouter,
  cartRoute,
  productRoute,
  addressRoute,
  categoryRoute,
  labelRoute,
  transactionRoute,
  txStatusRoute,
  rajaOngkirRoute,
  stockRoute,
  promotionRoute,
  txHistoryRoute,
};
