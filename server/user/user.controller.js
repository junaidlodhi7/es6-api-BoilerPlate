 const User = require('../models')('user');
 const bcrypt = require('bcrypt');
 const salt   = bcrypt.genSaltSync(10);

function load(req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user;
      return next();
    })
    .catch(e => next(e));
}

function get(req, res) {
  return res.json(req.user);
}

function create(req, res, next) {

  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, salt, null)
    
  });

  user.save()
    .then(savedUser => res.status(500).jsonp(savedUser))
    .catch(e => res.status(500).jsonp(e));
}

function update(req, res, next) {
  const user = req.user;
  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}


function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
