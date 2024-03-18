const chatRouter = require('express').Router();
const ChatController = require('../controllers/Chat.controller');
const {checkToken} = require('../middlewares/checkToken');

// chatRouter.use(checkToken);

chatRouter.post('/', ChatController.createChat);
chatRouter.get('/:chatId/user/:userId', checkToken, ChatController.addUserToChat);
chatRouter.get('/', checkToken, ChatController.getAllUserChat);
chatRouter.get('/:chatId', checkToken, ChatController.getOneChat)

module.exports = chatRouter;