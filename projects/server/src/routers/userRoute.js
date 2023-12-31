const express = require('express');
const router = express.Router();
const { userController, QnAController } = require('../controllers');
const { APIKey } = require('../middleware/APIKey');
const { verifyToken, verifyTokenEmail } = require('../middleware/auth');
const { uploadProfile } = require('../middleware/upload');

router.put(
  '/',
  APIKey,
  verifyToken,
  uploadProfile,
  userController.updateUserData,
);
router.patch(
  '/email',
  APIKey,
  verifyToken,
  verifyTokenEmail,
  userController.updateEmail,
);
router.post(
  '/sendChangeEmail',
  APIKey,
  verifyToken,
  userController.sendChangeEmailForm,
);
// sementara
// router.post('/', userController.bcrypt);
router.get('/questions', APIKey,  QnAController.getUserQuestions);

module.exports = router;
