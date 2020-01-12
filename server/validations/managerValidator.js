import Joi from 'joi';

const registrationValidator = {
  validation(user) {
    const uservalidation = {
      employeeName: Joi.string().min(2).max(20).required()
        .trim(),
      nationalID: Joi.string().min(16).max(16).required(),
      phoneNumber: Joi.string().min(10).max(10).required(),
      email: Joi.string().email().required().trim(),
      dateOfBirth: Joi.string().required(),
      status: Joi.string().required(),
      position: Joi.string().required(),
      password: Joi.string().min(2).max(10).required()
        .trim(),
    };

    return Joi.validate(user, uservalidation);
  },

};

export default registrationValidator;
