const { address } = require('./../models');

const validateForm = (data) => {
  if (
    !data.city_id ||
    !data.address ||
    !data.phone_number ||
    !data.receiver ||
    !data.province_id ||
    !data.province_name ||
    !data.city_name
  ) {
    throw { message: 'Please fill your form correctly', code: 400 };
  }

  if (data.address.length > 150) {
    throw { message: 'Address is too long', code: 400 };
  }

  if (data.notes && data.notes.length > 150) {
    throw { message: 'Notes is too long', code: 400 };
  }
};

const manipulateArray = (data) => {
  let result = [];

  for (let index = 0; index < data.length; index++) {
    if (data[index].is_selected) {
      result.unshift(data[index]);
    } else {
      result.push(data[index]);
    }
  }

  return result;
};

const isFirstAddress = async (user_id) => {
  const getAddress = await address.findAll({
    where: { user_id },
  });

  if (getAddress.length) {
    return false;
  }
  return true;
};

const validateUserAndIsDeleted = async (user_id, id) => {
  const getAddress = await address.findOne({
    where: {
      id,
    },
  });

  if (!getAddress) {
    throw { message: 'Address Not Found', code: 404 };
  }

  if (getAddress && getAddress.user_id !== user_id)
    throw { message: 'You Not Allowed to Update this Address', code: 403 };

  return getAddress;
};

const setNewIsSelected = async (user_id) => {
  const getAddress = await address.findOne({
    where: {
      user_id,
      is_main: true,
    },
  });

  await address.update({ is_selected: true }, { where: { id: getAddress.id } });
};

const getOldIsMain = async (user_id) => {
  const getAddress = await address.findOne({
    where: {
      user_id,
      is_main: true,
    },
  });
  return getAddress;
};

const changeOldIsMain = async (id) => {
  const updateOldIsMain = await address.update(
    {
      is_main: false,
    },
    {
      where: {
        id,
      },
    },
  );
  return updateOldIsMain;
};

const getOldIsSelected = async (user_id) => {
  const getAddress = await address.findOne({
    where: {
      user_id,
      is_selected: true,
    },
  });
  return getAddress;
};

const changeOldIsSelected = async (id) => {
  const updateOldIsMain = await address.update(
    {
      is_selected: false,
    },
    {
      where: {
        id,
      },
    },
  );
  return updateOldIsMain;
};

const changeToMainSelect = async (id, user_id, t) => {
  await address.update(
    { is_selected: false },
    { where: { id }, transaction: t },
  );
  await address.update(
    { is_selected: true },
    { where: { user_id, is_main: true }, transaction: t },
  );
};

module.exports = {
  validateForm,
  isFirstAddress,
  validateUserAndIsDeleted,
  changeOldIsMain,
  getOldIsMain,
  setNewIsSelected,
  manipulateArray,
  getOldIsSelected,
  changeOldIsSelected,
  changeToMainSelect,
};
