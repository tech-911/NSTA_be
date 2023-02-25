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

module.exports = { registerValidationMethod, loginValidationMethod };
