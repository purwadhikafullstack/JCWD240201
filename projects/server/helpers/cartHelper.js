const db = require('../models');
const Cart = db.cart;

const getCart = async (includes, whereQuery) => {
  try {
    return await Cart.findOne({
      //   include: [{ model: Role }],
      where: {
        ...whereQuery,
      },
      //   attributes: { exclude: [excludes] },
    });
  } catch (error) {
    return error;
  }
};
module.exports = {
  getCart,
};