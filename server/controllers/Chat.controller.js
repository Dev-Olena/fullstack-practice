const {Chat, User, Message} = require('../models');

module.exports.createChat = async (req, res, next) => {
    try {
        const {body, payload: {userId}} = req;
        const chat = await Chat.create({...body, members: [userId]});
        res.status(201).send({data: chat});
    } catch (error) {
        next(error)
    }
};

module.exports.addMessage = async (req, res, next) => {
    try {
        
       const {body, params: {chatId}, file} = req;
       console.log(body);
        console.log(file)
        const newMessageInstanse = await Message.create({...body, chat: chatId, imagePath: file?.filename});
        console.log(newMessageInstanse);
        const chatInstanse = await Chat.findById(chatId);
        chatInstanse.messages.push(newMessageInstanse);
        await chatInstanse.save();
        res.status(201).send({data: newMessageInstanse});
    } catch(error) {
        next(error)
    }
};

module.exports.addUserToChat = async (req, res, next) => {
    try {
        const {params: {chatId, userId}} = req;
        const foundChat = await Chat.findById(chatId);
        if (!foundChat) {
            throw new Error('Chat not found')
        };
        const userInstanse = await User.findById(userId);
        foundChat.members.push(userInstanse);
        await foundChat.save();
        res.status(200).send({
            data: 'ok'
        })
    } catch (error) {
        next (error)
    }
};



////////////////Всі чати юзера без використання токену
// module.exports.getAllUserChat = async (req, res, next) => {
//     try {
//         const {params: {userId}} = req;
//         const userInstanse = await User.findById(userId);
//         if (!userInstanse) {
//             throw new Error ('User not found')
//         };
//         const chats = await Chat.find({
//             members: userInstanse.id
//         })
//         res.status(200).send({data: chats})
//     } catch (error) {
//         next (error)
//     }
// }

module.exports.getAllUserChat = async (req, res, next) => {
    try {
        const {payload: {userId}} = req;
        const userChats = await Chat.find({
            members: userId
        })
        res.status(200).send({data: userChats})
    } catch (error) {
        next (error)
    }
};

module.exports.getOneChat = async (req, res, next) => {
    try {
        const {params: {chatId}} = req;
        const foundChat = await Chat.findById(chatId).populate('members').populate('messages');
        if (!foundChat) {
            throw new Error('Chat not found')
        };
        res.status(200).send({data: foundChat})

    } catch (error) {
        next(error)
    }
};
