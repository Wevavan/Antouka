import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADRESS } from "../Constants/CartConstants";
import axios from "axios";


export const addToCart = (id, qty) => async(dispatch, getState) =>{
    const {data} = await axios.get(`/api/products/${id}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product : data._id,
            title : data.title,
            description : data.description,
            image : data.image,
            price : data.price,
            countInStock : data.countInStock,
            qty,
        }
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

// REMOVE ITEM

export const removeFromCart = (id)=> (dispatch, getState)=> {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

// SAVE SHIPPING ADRESS

export const saveShippingAdress = (data)=> (dispatch)=> {
    dispatch({
        type: CART_SAVE_SHIPPING_ADRESS,
        payload: data,
    });

    localStorage.setItem("shippingAdress", JSON.stringify(data));
}

// SAVE PAYMENT METHOD

export const savePaymentMethod = (data)=> (dispatch)=> {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    });

    localStorage.setItem("paymentMethod", JSON.stringify(data));
}