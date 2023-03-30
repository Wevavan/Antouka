const express = require('express');
const asyncHandler = require('express-async-handler');
const ProductDuMoment = require('../Models/ProductsDuMoment');


const ProductDuMomentRoutes = express.Router()

// GET ALL PRODUCTS
ProductDuMomentRoutes.get("/", asyncHandler(
    async(req,res)=>{
        const productsdumoment = await ProductDuMoment.find({});
        res.json(productsdumoment);
    }
));



module.exports = ProductDuMomentRoutes;