const deleteFiles = require('../helpers/deleteFiles');
const { validate } = require('../helpers/userHelper');
const { user, role } = require('./../models');
const fs = require('fs');

// const validate = (data) => {
//   if (
//     !data.full_name ||
//     !data.phone_number ||
//     !data.gender ||
//     !data.birthdate
//   ) {
//     throw { message: 'Please fill your form correctly', code: 400 };
//   }
// };

const getUserData = async (req, res) => {
  try {
    // TODO: get user_id from token
    const data = await user.findOne({
      include: { model: role, attributes: ['role_name'] },
      attributes: {
        exclude: ['password', 'username'],
      },
      where: {
        id: 1,
      },
    });
    res.send(data);
  } catch (error) {
    res.send(error.message || error);
  }
};

const updateUserData = async (req, res, next) => {
  try {
    const auth = req.user;
    const image = req.file;
    const { full_name, phone_number, gender, birthdate } = req.body;
    validate({ full_name, phone_number, gender, birthdate });

    if (image) {
      const previousImage = await user.findOne({
        attributes: ['profile_image'],
        where: {
          id: auth.id,
        },
      });

      await user.update(
        {
          full_name,
          phone_number,
          gender,
          birthdate,
          profile_image: image.path,
        },
        { where: { id: auth.id } },
      );

      if (previousImage.dataValues.profile_image) {
        const oldPath = previousImage.dataValues.profile_image;
        const fileName = previousImage.dataValues.profile_image.split('/');
        const newPath = `public/deleted_user_profile_images/${
          fileName[fileName.length - 1]
        }`;

        fs.rename(oldPath, newPath, function (err) {
          if (err) throw err;
        });
      }
    } else {
      await user.update(
        {
          full_name,
          phone_number,
          gender,
          birthdate,
        },
        {
          where: {
            id: auth.id,
          },
        },
      );
    }

    res.status(200).send({
      success: true,
      message: 'User updated successfully',
    });
  } catch (error) {
    if (req.file) {
      deleteFiles([req.file]);
    }
    next(error);
  }
};

module.exports = {
  getUserData,
  updateUserData,
};
