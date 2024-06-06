const express = require('express');
const authRouter = express.Router();
const User = require('../model/user');

authRouter.post('/register', async (req, res) => {
    const { userName, userEmail, password } = req.body;
    try {
        const duplicate = await User.findOne({ userEmail: userEmail });
        if(duplicate) {
            return res.status(400).send('User already exists');
        }   
        const user = new User({ userName, userEmail, password });
        await user.save();
        console.log(user)
        return res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

authRouter.post('/login', async (req, res) => {
    const { userEmail, password } = req.body;
    try {
        const user = await User.findOne({ userEmail: userEmail });
        if(!user) {
            return res.status(400).send('User not found');
        }
        if(user.password !== password) {
            return res.status(400).send('Invalid password');
        }
        return res.status(200).send(user.userName);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = authRouter;