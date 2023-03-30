const express = require('express');
const asyncHandler = require('express-async-handler');
const TopProduct = require('../Models/TopProductModel');

const TopProductRoutes = express.Router()

// GET ALL TOP PRODUCTS
TopProductRoutes.get("/", asyncHandler(
    async(req,res)=>{
        const topproducts = await TopProduct.find({});
        res.json(topproducts);
    }
));

module.exports = TopProductRoutes;