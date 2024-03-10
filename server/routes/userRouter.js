const userRouter = require('express').Router();
const UserController = require('../controllers/User.controller');
const {hashPass} = require('../middlewares/hashPass');

userRouter.post('/sign-up', hashPass, UserController.signUp);
userRouter.post('/sign-in', )

module.exports = userRouter;


