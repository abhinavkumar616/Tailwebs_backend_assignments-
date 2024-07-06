const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');


const userRegister = async (req, res) => {

    try {
        const { username, email, mobile, password } = req.body;

        if (!username || !email || !mobile || !password) {
            return res.status(400).send({
                message: "Kindly Provide all details"
            })
        }

        if (await User.findOne({ username: username })) {
            return res.status(409).send({
                message: "Username already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await User.create({
            username, email, mobile, password: hashPassword
        });

        // Set the session for the new user
        req.session.userId = newUser._id;
        console.log("req.session.userId-------", req.session.userId);
        return res.status(201).send({
            status: 201,
            sessionId: req.sessionID
        })
    }
    catch (error) {
        return res.status(500).send({
            error: error.message,
            message: "Internal Server Error"
        })
    }

}

const userLogin = async (req, res, next) => {
    try {
        passport.authenticate('local', (err, user, info) => {
            if (err) throw err;
            if (!user) return res.status(401).json({
                status: 401,
                message: 'Invalid credentials'
            });

            req.logIn(user, err => {
                if (err) throw err;

                req.session.userId = user._id;
                console.log("req.session.userId-------", req.session.userId);

                return res.json({
                    status: 200,
                    message: 'User logged in successfully',
                    sessionId: req.sessionID
                });
            });
        })(req, res, next);
    }
    catch (error) {
        return res.status(500).send({
            error: error.message,
            message: "Internal Server Error"
        })
    }

}

const logout = async (req, res) => {
    try {
        await req.logout(err => {
            if (err) {
                console.log("error", err);
            }
        })
        return res.status(200).send({
            message: 'User logged out successfully'
        })
    }
    catch (error) {
        return res.status(500).send({
            error: error.message,
            message: "Internal Server Error"
        })
    }

}


module.exports = {
    userRegister,
    userLogin,
    logout
}