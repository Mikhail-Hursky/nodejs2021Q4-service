const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll()

  res.status(201).json(users.map(User.toResponse));
});

router.route('/:userId').get(async (req, res) => {
  const { userId } = req.params
  const user = await usersService.getUserBuId(userId)

  if (!user) {
    res.status(403).send({message: 'User not founded'})
    return;
  }

  res.status(201).json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const {name, login, password} = req.body

  if (!name) {
    res.send({message: 'Name is required'})
    return;
  }
  if (!login) {
    res.send({message: 'Login is login'})
    return;
  }
  if (!password) {
    res.send({message: 'Password is password'})
    return;
  }

  const user = await usersService.createUser({name, login, password})

  res.status(201).json(User.toResponse(user));
});

router.route('/:userId').put(async (req, res) => {
  const { userId } = req.params
  const {name, login, password} = req.body

  const user = await usersService.updateUser(userId, {name, login, password})

  if (!user) {
    res.status(403).send({message: 'User not founded'})
    return;
  }

  res.status(201).json(User.toResponse(user));
});

router.route('/:userId').delete(async (req, res) => {
  const { userId } = req.params

  const message = await usersService.deleteUser(userId)

  res.status(201).json({message: `User ${message}`});
});

module.exports = router;
