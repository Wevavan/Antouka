const express = require('express');
const asyncHandler = require('express-async-handler');
const protect = require('../Middleware/AuthMiddleware');
const Order = require('../Models/OrderModel');

const mongoose = require('mongoose');

const OrderRoutes = express.Router();



//  GET ORDER BY ID
OrderRoutes.get("/:id",protect, asyncHandler(
    async(req,res)=>{
        // const id = (req.order.id);
        const order = await Order.findById("63b036807898c627de8a2d36");

        if (order) {
            res.json(order);
        } else {
            res.status(404);
            throw new Error ("Order Not Found");
        }
    }
));

//  USER LOGIN ORDERS
OrderRoutes.get("/",protect, asyncHandler(
    async(req,res)=>{
        // const id = (req.order.id);
        const order = await Order.find({user: req.user._id}).sort({_id: -1});
        res.json(order);
    }
));

//  CREATE ORDER
OrderRoutes.post("/",protect, asyncHandler(
    async(req,res)=>{
        const { orderItems,
                shippingAdress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice 
            } = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error("No order items");
            return
        } else {
            const order = new Order({ 
                user:req.user._id,
                orderItems,
                shippingAdress,
                paymentMethod,
                itemsPrice, 
                taxPrice, 
                shippingPrice, 
                totalPrice
            })
            const createOrder = await order.save();
            res.status(201).json(createOrder);
        }
    }
));

//  ORDER IS PAID
OrderRoutes.put("/:id/pay",protect, asyncHandler(
    async(req,res)=>{
        // const id = (req.order.id);
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id : req.body.id,
                status : req.body.status,
                update_time : req.body.update_time,
                email_adress : req.body.email_adress,
            };
            const updateOrder = await Order.save();
            res.json(updateOrder);
        } else {
            res.status(404);
            throw new Error ("Order Not Found");
        }
    }
));


module.exports = OrderRoutes;