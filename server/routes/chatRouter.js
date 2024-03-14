const chatRouter = require('express').Router();
const ChatController = require('../controllers/Chat.controller');
const {checkToken} = require('../middlewares/checkToken');

chatRouter.use(checkToken);

chatRouter.post('/', ChatController.createChat);
chatRouter.get('/:chatId/user/:userId', ChatController.addUserToChat);
chatRouter.get('/', ChatController.getAllUserChat);

module.exports = chatRouter;