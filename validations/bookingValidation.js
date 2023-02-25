const Joi = require("joi");

const bookingValidation = (value) => {
  const bookingObject = {
    name: Joi.string().required().min(3).max(255),
    email: Joi.string().required().min(5).max(255).email(),
    destination: Joi.string().required().min(2).max(1024),
    passangers_number: Joi.number().required(),
    time: Joi.string().required(),
    date: Joi.date().min(new Date()).required(),
    car_type: Joi.string().required(),
    user_id: Joi.string().required(),
    data: Joi.object().optional(),
  };

  const bookingJoiSchema = Joi.object(bookingObject);
  return bookingJoiSchema.validate(value);
};

module.exports = { bookingValidation };
