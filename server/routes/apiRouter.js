const express = require('express');
const chatRouter = require('./chatRouter');
const userRouter = require('./userRouter');

const apiRouter = express.Router();

apiRouter.use('/chats', chatRouter);
apiRouter.use('/users', userRouter);


module.exports = apiRouter;

