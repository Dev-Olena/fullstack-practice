const {User} = require('../models');
const {deletePassword} = require('../utils/deletePassword');


module.exports.createUser = async (req, res, next) => {
    try {
        const {body} = req;
        const createdUser = await User.create(body); 
        const readyUser = deletePassword(createdUser)
        // перед тим, як повертати юзера, треба з об'єкта видалити пароль
        res.status(201).send({data: readyUser});
    } catch(error) {
         next(error)
    }
};