const express = require('express');
const asyncHandler = require('express-async-handler');

const User = require('./Models/UserModel');
const users = require('./data/Users');
const Product = require('./Models/ProductModel');
const products = require('./data/Products');

const TopProduct = require('./Models/TopProductModel');
const topproducts = require('./data/TopProducts');


const productsdumoment = require('./data/ProductsDuMoment');
const ProductDuMoment = require('./Models/ProductsDuMoment');


const Importdata = express.Router();

Importdata.post("/users", asyncHandler(
    async(req,res)=>{
        await User.remove({});
        const importUser = await User.insertMany(users);
        res.send({importUser});
    }
));

// IMPORT ALL PRODUCTS

Importdata.post("/products", asyncHandler(
    async(req,res)=>{
        await Product.remove({});
        const importProducts = await Product.insertMany(products);
        res.send({importProducts});
    }
));

// IMPORT TOP PRODUCTS

Importdata.post("/topproducts", asyncHandler(
    async(req,res)=>{
        await TopProduct.remove({});
        const importTopProducts = await TopProduct.insertMany(topproducts);
        res.send({importTopProducts});
    }
));

// IMPORT PRODUCTS DU MOMENT

Importdata.post("/productsdumoment", asyncHandler(
    async(req,res)=>{
        await ProductDuMoment.remove({});
        const ProductsDuMoment = await ProductDuMoment.insertMany(productsdumoment);
        res.send({ProductsDuMoment});
    }
));

module.exports = Importdata;