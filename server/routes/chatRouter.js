const chatRouter = require('express').Router();
const ChatController = require('../controllers/Chat.controller');
const {checkToken} = require('../middlewares/checkToken');

chatRouter.post('/', ChatController.createChat);
chatRouter.get('/:chatId/user/:userId', ChatController.addUserToChat);
chatRouter.get('/', checkToken, ChatController.getAllUserChat);

module.exports = chatRouter;