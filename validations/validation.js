const Joi = require("joi");

const registerValidationMethod = (value) => {
  const registerObject = {
    name: Joi.string().required().min(4).max(255),
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(6).max(1024),
    role: Joi.string().required(),
  };

  const registerJoiSchema = Joi.object(registerObject);
  return registerJoiSchema.validate(value);
};

const loginValidationMethod = (value) => {
  const loginObject = {
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(6).max(1024),
  };

  const loginJoiSchema = Joi.object(loginObject);
  return loginJoiSchema.validate(value);
};
const changePasswordValidationMethod = (value) => {
  const changePasswordObject = {
    email: Joi.string().required().min(5).max(255).email(),
    old_password: Joi.string().required().min(6).max(1024),
    new_password: Joi.string().required().min(6).max(1024),
  };
  const changePasswordJoiSchema = Joi.object(changePasswordObject);
  return changePasswordJoiSchema.validate(value);
};

const editUserInfoValidationMethod = (value) => {
  const editUserInfoObject = {
    name: Joi.string().required().min(4).max(255),
    email: Joi.string().required().min(5).max(255).email(),
    _id: Joi.string().required(),
  };

  const editUserInfoJoiSchema = Joi.object(editUserInfoObject);
  return editUserInfoJoiSchema.validate(value);
};

module.exports = {
  registerValidationMethod,
  loginValidationMethod,
  changePasswordValidationMethod,
  editUserInfoValidationMethod,
};
