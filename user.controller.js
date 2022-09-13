const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createNewUser = async (req, res) => {
    const { body } = req;

    try {
        const queriedUser = await User.findOne({email: body.email});
        if (queriedUser) {
            console.log(queriedUser);
            res.status(400).json({errMsg: "this user already exsists"});
            return;
        }
    } catch (error) {
        res.status(400).json(error);
    }

    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    catch (error) {
        res.status(400).json(error);
    }
};

const login = async(req, res) => {
    const { body } = req;
    if (!body.email) {
        res.status(400).json({error: "No email provided, please provide email"});
        return;
    }
    let userQuery;
    try {
        userQuery = await User.findOne({ email: body.email });
        if (userQuery === null) {
            res.status(400).json({msg: "email not found"});
        }
    } catch (error) {
        res.status(400).json(error);
    }

    const passwordCheck = bcrypt.compareSync(body.password, userQuery.password);
    if (!passwordCheck) {
        res.status(400).json({error: "email and password do not match"});
        return;
    }
    const userToken = jwt.sign({_id: userQuery._id}, "tokenkey"); 

    res.cookie("usertoken", userToken, "tokenkey", {
        httpONly: true,
        expires: new Date(Date.now() + 800000000),
    }).json({msg: "successful login"});
};

const deleteUser = (req, res) => {
    User.deleteOne({_id: req.params.id})
    .then((deletedUser) => {
        res.json({ deletedUser });
    })
    .catch((err) => {res.json(400).json({err})
});
};

const getOneUser = (req, res) => {
    User.findOne({_id: req.params.id})
    .then((queriedLink) => {
        res.json(queriedLink);
    })
    .catch((err) => {res.status(400).json({err})
});
};

const getAllUsers = (req, res) => {
    User.find()
    .then((allUsers) => {
        res.json(allUsers);
    })
    .catch((err) => {res.status(400).json({err})
});
};

module.exports = {
    createNewUser,
    deleteUser,
    getOneUser,
    getAllUsers,
    login,
};