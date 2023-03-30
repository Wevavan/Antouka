const { createStore, combineReducers, applyMiddleware } = require('redux');
const thunk = require('redux-thunk');
const { composeWithDevTools } = require('redux-devtools-extension');
const { productListReducer, productDetailsReducer } = require('./Reducers/ProductReducers');
const { cartReducer } = require('./Reducers/CartReducers');
const { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } = require('./Reducers/UserReducers');
const { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListReducer } = require('./Reducers/OrderReducers');


const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    cart : cartReducer,
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    orderCreate : orderCreateReducer,
    orderDetails : orderDetailsReducer,
    orderPay : orderPayReducer,
    orderList : orderListReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [] ;

// LOGIN

const userInfoFromLocalStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null ;

// SHIPPING ADRESS

const shippingAddressFromLocalStorage = localStorage.getItem("shippingAdress") ? JSON.parse(localStorage.getItem("shippingAdress")) : {} ;

const initialState = {
    cart : {
        cartItems : cartItemsFromLocalStorage,
        shippingAdress : shippingAddressFromLocalStorage,
    },
    userLogin : {
        userInfo : userInfoFromLocalStorage,
    }
};

const middleware = [thunk.default];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
);

module.exports = store;