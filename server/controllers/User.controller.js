const bcrypt = require('bcrypt');
const {User,RefreshToken} = require('../models');
const {deletePassword} = require('../utils/deletePassword');
const {createTokenPair} = require('../service/tokenService');
const {verifyRefreshToken} = require('../service/tokenService');
const AuthError =require('../errors/AuthError');


module.exports.signUp = async (req, res, next) => {
    try {
        const {body} = req;
        const createdUser = await User.create(body); 
        const readyUser = deletePassword(createdUser)
        // перед тим, як повертати юзера, треба з об'єкта видалити пароль
        //створюємо сесію юзера
        const tokens = await createTokenPair({
            userId: readyUser._id, 
            email: readyUser.email
        });
        //зберігаємо RT до БД
        const add = await RefreshToken.create({
            token: tokens.refreshToken,
            userId: readyUser._id
        })
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
            const tokens = await createTokenPair({userId: foundUser._id, email: foundUser.email});
             //зберігаємо RT до БД
             const add = await RefreshToken.create({
                token: tokens.refreshToken,
                userId: foundUser._id
            });
            res.status(200).send({data: deletePassword(foundUser), tokens})
          //      Всі наступні (подальші) запити мають приходити з цим виданим токеном
    } catch (error) {
        next(error)
    }
};

module.exports.refreshSession = async (req, res, next) => {
        const {body: {refreshToken}} = req;
        //перевіряємо валідність refreshToken
        let verifyResult;
        try {
            verifyResult = await verifyRefreshToken(refreshToken);
        } catch (error) {
            next(new AuthError('Invalid refresh token'));
        }
        console.log(verifyResult);
        try {
            if (verifyResult) {
                const foundUser = await User.findOne({
                    email: verifyResult.email
                });
                console.log(foundUser);
                const rftFromDB = await RefreshToken.findOne({
                    $and: [{
                        token: refreshToken
                    }, {
                        userId: foundUser._id
                    }]
                });

                if(rftFromDB) {
                    // Видаляємо старий РТ з БД
                    const removed = await rftFromDB.deleteOne();
                    // Робимо нову пару токенів та відправляємо їх у відповідь
                    const tokenPair = await createTokenPair({
                        userId: foundUser._id,
                        email: foundUser.email
                    });

                    // новий РТ додаємо в БД 
                    const add = await RefreshToken.create({
                        token: tokenPair.refreshToken,
                        userId: foundUser._id
                    })
                    res.status(200).send({tokens: tokenPair})
                } else {
                    // якщо токен такий в БД не знайшли - видаємо помилку
                    // Якщо RT не підходить - відповідаємо 401 помилкою
                    // Для обмеження кількості пристроїв, з яких можливо оновити сесію, RT має зберігатись в БД
                    // При оновленні сесії він має замінюватись на наступний

                    throw new AuthError('Token not found')
                }
            }
        }
       catch (error) {
        next(error)
    }
}