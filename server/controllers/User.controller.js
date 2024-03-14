const bcrypt = require('bcrypt');
const {User} = require('../models');
const {deletePassword} = require('../utils/deletePassword');
const {createTokenPair} = require('../service/tokenService');
const {verifyRefreshToken} = require('../service/tokenService');


module.exports.signUp = async (req, res, next) => {
    try {
        const {body} = req;
        const createdUser = await User.create(body); 
        const readyUser = deletePassword(createdUser)
        // перед тим, як повертати юзера, треба з об'єкта видалити пароль
        const tokens = await createTokenPair(readyUser.id, readyUser.email);
        res.status(201).send({data: readyUser, tokens});
    } catch(error) {
         next(error)
    }
};

module.exports.signIn= async (req, res, next) => {
    try {
         //   1. Приймаємоінформацію юзера
         const {body: {email, password}} = req;
         //   2. Знаходимо юзера в БД за певним фільтром, що містgoиться в запиті(напр, мейл)
         const foundUser = await User.findOne({
            email
         });
         if (!foundUser) {
         //       - якщо такого юзера немає - відповідаємо помилкою (404/400)
            throw new Error('User not found');  // ось тут може бути створена наша помилка
         }
         //   3. Якщо такий юзер є - перевіряємо правильність пароля за допомогою хешованої перевірки
         const result = await bcrypt.compare(password, foundUser.passwordHash);
         console.log(result); // result - true, якщо співпадають, false якщо ні
              //       - якщо пароль не співпав - відповідаємо помилкою (400)
            if(!result) {
                throw new Error('Invalid data');
            }
         //   4. Якщо пароль співпав - створюємо сесію юзера і генеруємо для нього токен для всіх подальших запитів
            const tokens = await createTokenPair(foundUser.id, foundUser.email);
            res.status(200).send({data: deletePassword(foundUser), tokens})
          //      Всі наступні (подальші) запити мають приходити з цим виданим токеном
    } catch (error) {
        next(error)
    }
};

module.exports.refreshSession = async (req, res, next) => {
    try {
        const {body: {refreshToken}} = req;
        const payload = await verifyRefreshToken(refreshToken);
        const tokenPair = await createTokenPair(payload);
        res.status(200).send({tokens: tokenPair})
    } catch (error) {
        next(error)
    }
}