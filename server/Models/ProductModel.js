const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      description: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        default: 0,
      },
      countInStock: {
        type: Number,
      },
      meilleurajout:{
        type: Boolean,
        default: false,
      },
      topproduits:{
        type: Boolean,
        default: false,
      },
      produitapresenter:{
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;