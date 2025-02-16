const User = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res, next) => {
    try {
        const { userName, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 6)
        const existed = await User.findOne({email})
        if (existed){
            return res.status(400).json({error : "Account with this email already exists"})
        }
        const user = new User({
            userName: userName,
            password: hashedPassword,
            email: email
        })
        console.log(user)
        await user.save()
        res.status(201).json({
            message: 'User Created Succesfully',
            user: user
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'Error creating user',
            error: err
        });
    }
}

exports.getAllUsers = async (req, res, next) => {

    try {
        const users = await User.find()
        res.status(200).json({
            message: 'Users Fetched Succesfully',
            users: users
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'Error fetching Users',
            error: err
        })
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const deletedUser = User.findByIdAndDelete(req.body.userId)
        if (!deletedUser) {
            res.status(404).json({
                message: 'User nnot found',

            })
        }
        else {
            res.status(200).json({
                message: 'User Deleted Succesfully',
                user: deletedUser
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'Error Deleting User',
            error: err
        })
    }
}

exports.updateUserPassword = (req, res, next) => {

    const filter = { userName: req.body.userName }
    const update = { $set: { password: req.body.updatedPassword } }
    User.findOneAndUpdate(filter, update, { new: true })
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: 'User nnot found',

                })
            }
            else {
                res.status(200).json({
                    message: 'User Password Has Been Updated Succesfully',
                    user: user
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error Updating Password User',
                error: err
            })
            console.log(err)
        })
}


exports.signIn = async (req, res, next) => {

    try {
        const { userName, password } = req.body
        const user = await User.findOne({ userName: userName })
        if (!user) {
            return res.status(401).json({
                message: 'Authentication failed. User not found',

            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, 'moijopu', { expiresIn: '1h' });

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', 
                sameSite: 'strict'
            });

            res.status(200).json({
                message: 'Authentication succesfull',
                user: user,
                token: token
            })
        }
        else {
            res.status(401).json({
                message: 'Authentication failed. Wrong Password',
            })
        }


    }
    catch (err) {
        res.status(500).json({
            message: 'Error ',
            error: err
        })
        console.log(err)
    }
}