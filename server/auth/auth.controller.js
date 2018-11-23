const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const User = require('../models')('user');
const bcrypt = require('bcrypt');



function login(req, res) {
  User.findOne({
    username : req.body.username
  },function(err,done){
    if(err)
    {
      return res.status(400).send({
        message: (err)
      });
    }
    else if(!done){
      const err = new APIError("hahhaha", httpStatus.UNAUTHORIZED);
      return res.json(err);
    }
    else if(done) {

      if(bcrypt.compareSync(req.body.password,done.password)) {
        const token = jwt.sign({
          username: done.username
        }, config.jwtSecret);
        return res.json({
          token,
          username: done.username
        });
      }
      else {
        return res.json("Wrong Password");
      }
  
    }
  });
}



function getRandomNumber(req, res) {
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}



module.exports = { login, getRandomNumber};
