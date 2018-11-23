const Joi = require('joi');

module.exports = {
  // POST /api/users


  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
  ,
  signUp: {
    body: {
      username: Joi.string().required().min(4).max(8),
      password: Joi.string().required().min(4).max(8),
    }
  }

};
