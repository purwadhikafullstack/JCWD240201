const express = require('express');
const router = express.Router();
const { promotionController } = require('../controllers');
const { APIKey } = require('../middleware/APIKey');
const { verifyToken } = require('../middleware/auth');
const { isAdmin } = require('../middleware/checkRole');

router.post(
  '/',
  APIKey,
  verifyToken,
  isAdmin,
  promotionController.createDiscount,
);
router.get('/list', APIKey, verifyToken, promotionController.getPromotionList);

module.exports = router;
