// Import Multer
const { multerUpload } = require('../lib/multer');

// Import Function Delete
const deleteFiles = require('../helpers/deleteFiles');

const uploadPrescription = (req, res, next) => {
  const multerResult = multerUpload.single('prescription_image');
  multerResult(req, res, function (err) {
    try {
      if (err) throw err;
      // Validate each file size
      req.files.images.forEach((value) => {
        if (value.size > 100000000)
          throw {
            message: `${value.originalname} is Too Large`,
            fileToDelete: req.file,
          };
      });
      next();
    } catch (error) {
      if (error.fileToDelete) {
        deleteFiles(error.fileToDelete);
      }
      return res.status(404).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  });
};

const uploadMultiple = (req, res, next) => {
  const multerResult = multerUpload.fields([{ name: 'images', maxCount: 3 }]);
  multerResult(req, res, function (err) {
    try {
      if (err) throw err;
      // Validate each file size
      req.files.images.forEach((value) => {
        if (value.size > 100000000)
          throw {
            message: `${value.originalname} is Too Large`,
            fileToDelete: req.files.images,
          };
      });
      next();
    } catch (error) {
      if (error.fileToDelete) {
        deleteFiles(error.fileToDelete);
      }
      return res.status(404).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  });
};

const uploadProfile = (req, res, next) => {
  console.log(req.body)
  const multerResult = multerUpload.single('profile_image');
  multerResult(req, res, function (err) {
    try {
      if (err) throw err;
      // Validate each file size
      if (req.file && req.file.size > 1000000)
        throw {
          message: `${req.file.originalname} is Too Large`,
          fileToDelete: [req.file],
        };
      next();
    } catch (error) {
      if (error.fileToDelete) {
        deleteFiles(error.fileToDelete);
      }
      return res.status(404).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  });
};

module.exports = { uploadPrescription, uploadMultiple, uploadProfile };
