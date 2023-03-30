import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import './placeorder.css';
import Message from './../../components/LoadingError/Error';
import { ORDER_CREATE_RESET } from '../../Redux/Constants/OrderConstants';
import { createOrder } from '../../Redux/Actions/OrderActions';

import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { CiLocationOn } from 'react-icons/ci';

const Placeorder = () => {

    const dispatch =  useDispatch();
    const cart = useSelector((state) => state.cart);
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const navigate = useNavigate();

    // Calcule du prix
    const addDecimals = (num)=>{
        return(Math.round(num * 100) / 100).toFixed(2);
    };

    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc,item) => acc + item.price * item.qty, 0)
    )
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100 );
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = (
        Number(cart.itemsPrice) + 
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2);

    const orderCreate = useSelector((state) => state.orderCreate);
    const {order,success,error}= orderCreate;

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET});
        }
    }, [navigate,dispatch,success,order])
    

    const placeOrderHandler = ()=>{
        dispatch(
            createOrder({
                orderItems:cart.cartItems,
                shippingAdress:cart.shippingAdress,
                paymentMethod:cart.paymentMethod,
                itemsPrice:cart.itemsPrice,
                shippingPrice:cart.shippingPrice,
                taxPrice:cart.taxPrice,
                totalPrice:cart.totalPrice,
            })
        );
    }

  return (
    <div className='placeorderplace'>
        <div className="placeo">
            <div className="order-detail">
                <div className="order-detail1">
                    <div className="sous-order-detail">
                        <div className="sous-order-detail2">
                            <div className="alert-success order-box">
                                <i><AiOutlineUser/></i>
                            </div>
                        </div>
                        <div className="sous-order-detail2">
                            <h5>
                            <strong>Customer</strong>
                            </h5>
                            <p>{userInfo.name}</p>
                            <p>{userInfo.email}</p>
                        </div>
                    </div>
                </div>
                {/* 2 */}
                <div className="order-detail2">
                    <div className="sous-order-detail">
                        <div className="sous-order-detail2">
                            <div className="alert-success order-box">
                                <i><MdOutlineLocalShipping/></i>
                            </div>
                        </div>
                        <div className="sous-order-detail2">
                            <h5>
                            <strong>Order info</strong>
                            </h5>
                            <p>Shipping: {cart.shippingAdress.pays}</p>
                            <p>Payement method: {cart.paymentMethod}</p>
                        </div>
                    </div>
                </div>
                {/* 3 */}
                <div className="order-detail3">
                    <div className="sous-order-detail">
                        <div className="sous-order-detail2">
                            <div className="alert-success order-box">
                                <i><CiLocationOn/></i>
                            </div>
                        </div>
                        <div className="sous-order-detail2">
                            <h5>
                            <strong>Deliver to</strong>
                            </h5>
                            <p>
                                Address: {cart.shippingAdress.ville}, {""} {cart.shippingAdress.adresse}, {""} {cart.shippingAdress.codePostal}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" order-products justify-content-between mt-1">
                <div className="order-products-part1">
                    {
                        cart.cartItems.length === 0 ? (
                            <Message variant="alert-info mt-5">Your cart is empty</Message>
                        ) 
                        :
                        (
                            <>
                                {
                                    cart.cartItems.map((item,index)=>(
                                        <div className="order-productpo " key={index}>
                                            <div className='sous-order-product'>

                                                <div className="col-md-3 col-6 image">
                                                    <img src={item.image} alt={item.title} />
                                                </div>
                                                <div className="col-md-5 col-6 d-flex align-items-center textop">
                                                    <Link to={`/produits/${item.product}`} className="nounderline colorcendre">
                                                        <h6>{item.title}</h6>
                                                    </Link>
                                                </div>
                                            
                                            </div>
                                            
                                            <div className='sous-order-product'>

                                                <div className="d-flex align-items-center flex-column orderqty ">
                                                    <h6>QUANTITY</h6>
                                                    <h6>{item.qty}</h6>
                                                </div>
                                                <div className="align-items-center  d-flex flex-column justify-content-center ordertot">
                                                    <h6>SUBTOTAL</h6>
                                                    <h6>${item.qty * item.price}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </>
                        )
                    }
                </div>
                {/* total */}
                <div className="subtotal-order order-products-part2">
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td>
                                    <strong>Products</strong>
                                </td>
                                <td>${cart.itemsPrice}</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Shipping</strong>
                                </td>
                                <td>${cart.shippingPrice}</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Tax</strong>
                                </td>
                                <td>${cart.taxPrice}</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Total</strong>
                                </td>
                                <td>${cart.totalPrice}</td>
                            </tr>
                        </tbody>
                    </table>

                    {
                        cart.cartItems.length === 0 ? null :(
                            <button type="submit" className='text-white nounderline' onClick={placeOrderHandler}>
                                PLACE ORDER
                            </button>
                        ) 
                    }
                    {
                        error && (
                            <div className="my-3 col-12">
                                <Message variant="alert-danger">{error}</Message>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Placeorder