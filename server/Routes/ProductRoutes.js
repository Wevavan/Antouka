const express = require('express');
const asyncHandler = require('express-async-handler');
const Product = require('../Models/ProductModel');


const ProductRoutes = express.Router()

// GET ALL PRODUCTS
ProductRoutes.get("/", asyncHandler(
    async(req,res)=>{
        const products = await Product.find({});
        res.json(products);
    }
));

//GET SINGLE PRODUCT
ProductRoutes.get("/:id", asyncHandler(
    async(req,res)=>{
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        }else{
            res.status(404);
            throw new Error("Product not Found");
        }
    }
));



module.exports = ProductRoutes;