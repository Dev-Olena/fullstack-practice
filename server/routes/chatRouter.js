const chatRouter = require('express').Router();
const ChatController = require('../controllers/Chat.controller');

chatRouter.post('/', ChatController.createChat);

module.exports = chatRouter;