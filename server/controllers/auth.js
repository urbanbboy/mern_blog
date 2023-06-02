import dotenv from 'dotenv';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

dotenv.config();

// Register user
export const register = async (req, res) => {
    try {
        const { username, password } = req.body

//Поиск username в БД, если он есть, то выдаем message
        const isUsed = await User.findOne({ username })

        if(isUsed) {
            return res.json({
                message: 'Данный username уже занят.'
            })
        }

//Если username свободен, то генерируем некий хеш для пароля
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

//записываем нового пользователя в БД 
        const newUser = new User({
            username, 
            password: hash,
        })

        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        res.json({
            newUser, message: 'Регистрация прошла успешно.'
        })

        await newUser.save()
    } catch(error) {
        res.json({message: 'Ошибка при создании пользователя.'})        
    }
}
// Login user
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })

        if(!user) {
            return res.json({
                message: 'Такого пользователя не существует.',
            })
        }
    
//проверяем пароль путем сравнения введенного пароля password с паролем user
        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect) {
            return res.json({
                message: 'Неверный пароль.',
            })
        }
        
//Создание токена для опредения входа в систему или нет
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        res.json({
            token, 
            user, 
            message: 'Вы вошли в систему.',
        })
    } catch(error) {
        res.json({message: 'Ошибка при авторизации.'})
    }
}

//Get me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if(!user) {
            return req.json({
                message: "Такого пользователя не существует"
            })
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        )

        res.json({
            user,
            token
        })
    } catch(error) {
        res.json({message: "Нет доступа."})
    }
}