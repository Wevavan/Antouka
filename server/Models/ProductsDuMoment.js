const mongoose = require('mongoose');

const ProductsDuMomentSchema = mongoose.Schema(
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

const ProductDuMoment = mongoose.model("ProductDuMoment", ProductsDuMomentSchema);

module.exports = ProductDuMoment;