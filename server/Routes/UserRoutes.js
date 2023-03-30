const express = require('express');
const asyncHandler = require('express-async-handler');
const protect = require('../Middleware/AuthMiddleware');
const User = require('../Models/UserModel');
const generateToken = require('../utils/generateToken');

const UserRoutes = express.Router()

//  LOGIN
UserRoutes.post("/login", asyncHandler(
    async(req,res)=>{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id : user._id,
                name : user.name,
                email : user.email,
                isAdmin : user.isAdmin,
                token : generateToken(user._id),
                createdAt : user.createdAt,
            })
        } else {
            res.status(401)
            throw new Error("Erreur d'authentification !")
        }
    }
));

//  REGISTER
UserRoutes.post("/register", asyncHandler(
    async(req,res)=>{
        const {name, email, password} = req.body;

        const userExists = await User.findOne({email});

        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            res.status(201).json({
                _id : user._id,
                name : user.name,
                email : user.email,
                isAdmin : user.isAdmin,
                token : generateToken(user._id),
            })
        }else{
            res.status(404)
            throw new Error("Invalid user Data")
        }
    }
));

//  PROFILE
UserRoutes.get("/profile", protect, asyncHandler(
    async(req,res)=>{
        const user = await User.findById(req.user._id);
        if (user) {
            res.json({
                _id : user._id,
                name : user.name,
                email : user.email,
                isAdmin : user.isAdmin,
                createdAt : user.createdAt,
            })
        } else {
            res.status(404)
            throw new Error("User Not found !")
        }
    }
));


//  UPDATE PROFILE
UserRoutes.put("/profile", protect, asyncHandler(
    async(req,res)=>{
        const user = await User.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            if (req.body.password) {
                user.password = req.body.password
            }
            const updateUser = await user.save()
            res.json({
                _id : updateUser._id,
                name : updateUser.name,
                email : updateUser.email,
                isAdmin : updateUser.isAdmin,
                token : generateToken(updateUser._id),
                createdAt : updateUser.createdAt,
            })
        } else {
            res.status(404)
            throw new Error("User Not found !")
        }
    }
));


module.exports = UserRoutes;