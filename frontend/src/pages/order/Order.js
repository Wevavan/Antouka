import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import './order.css';
import Message from './../../components/LoadingError/Error';
// import { ORDER_CREATE_RESET } from '../../Redux/Constants/OrderConstants';
import { getOrderDetails, payOrder } from '../../Redux/Actions/OrderActions';
import { PayPalButton } from 'react-paypal-button-v2';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import Loading from '../../components/LoadingError/Loading';
import axios from 'axios';
import { ORDER_PAY_RESET } from '../../Redux/Constants/OrderConstants';

import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { CiLocationOn } from 'react-icons/ci';

const Order = () => {

    const id = useParams();
    const dispatch = useDispatch();
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error  } = orderDetails;
    const orderPay = useSelector((state) => state.orderPay);
    const { loading : loadingPay, success : successPay  } = orderPay;

    if (!loading) {
        // Calcule du prix
        const addDecimals = (num)=>{
            return(Math.round(num * 100) / 100).toFixed(2);
        };
        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc,item) => acc + item.price * item.qty, 0)
        )
    }

    useEffect(() => {
        const addPaypalScript = async()=>{
            const {data:clientID} = await axios.get("/api/config/paypal");
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`;
            script.async = true;
            script.onload = ()=>{
                setSdkReady(true)
            }
            document.body.appendChild(script);
        };

        if (!order || successPay) {
            dispatch({type: ORDER_PAY_RESET});
            dispatch(getOrderDetails(id));
        }
        else if (!order.isPaid){
            if(!window.paypal){
                addPaypalScript()
            }
        }
        else{
            setSdkReady(true);
        }

        console.log (id);
    }, [dispatch, id, successPay, order]);

    const successPaymentHandler = (paymentResult)=>{
        // id = orderID
        console.log(paymentResult)
        dispatch(payOrder(id, paymentResult));
    }

    return (
        <div className='placeorderplace'>
            <div className="placeo">

                {
                    loading ? (<Loading/>) : error ? (<Message variant="alert-danger">{error}</Message>) :
                    (
                        <>
                            <div className="order-detail">
                                <div className="order-detail1">
                                    <div className="sous-order-detail ">
                                        <div className="sous-order-detail2">
                                            <div className="alert-success order-box">
                                                <i><AiOutlineUser/></i>
                                            </div>
                                        </div>
                                        <div className="sous-order-detail2">
                                            <h5>
                                            <strong>Customer</strong>
                                            </h5>
                                            <p>{order.user.name}</p>
                                            <p><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
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
                                            <p>Shipping: {order.shippingAdress.pays}<br/>
                                            Payement method: {order.paymentMethod}</p>
                                            
                                            {
                                                order.isPaid ? (
                                                    <div className='bg-info p-2 col-12'>
                                                        <p className='text-white text-center text-sm-start'>
                                                            Payé le {moment(order.paidAt).calendar()} 
                                                        </p>
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className='bg-danger p-2 etapayer'>
                                                        <p className='text-white text-center text-sm-start'>
                                                            Non payé
                                                        </p>
                                                    </div>
                                                )
                                            }
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
                                                Address: {order.shippingAdress.ville}, {""} {order.shippingAdress.adresse}, {""} {order.shippingAdress.codePostal}
                                            </p>

                                            {
                                                order.isDelivered ? (
                                                    <div className='bg-info p-2 col-12'>
                                                        <p className='text-white text-center text-sm-start'>
                                                            Livré le {moment(order.DeliveredAt).calendar()} 
                                                        </p>
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className='bg-danger p-2 etaplivrer'>
                                                        <p className='text-white text-center text-sm-start'>
                                                            Non Livré
                                                        </p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="order-products justify-content-between mt-1">
                                <div className="order-products-part1">
                                    {
                                        order.orderItems.length === 0 ? (
                                            <Message variant="alert-info mt-5">Votre commande est vide</Message>
                                        ) 
                                        :
                                        (
                                            <>
                                                {
                                                    order.orderItems.map((item,index)=>(
                                                        <div className="order-productpo" key={index}>
                                                            <div className='sous-order-product'>
                                                                <div className="col-md-3 col-6 image">
                                                                    <img src={item.image} alt={item.title} />
                                                                </div>
                                                                <div className="col-md-5 col-6 d-flex align-items-center">
                                                                    <Link to={`/produits/${item.product}`} className="nounderline colorcendre">
                                                                        <h6>{item.title}</h6>
                                                                    </Link>
                                                                </div>
                                                            </div>

                                                            <div className='sous-order-product'>
                                                                <div className="d-flex align-items-center flex-column orderqty ">
                                                                    <h4>QUANTITY</h4>
                                                                    <h6>{item.qty}</h6>
                                                                </div>
                                                                <div className="align-items-center  d-flex flex-column justify-content-center ordertot ">
                                                                    <h4>SUBTOTAL</h4>
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
                                                <td>${order.itemsPrice}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Shipping</strong>
                                                </td>
                                                <td>${order.shippingPrice}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Tax</strong>
                                                </td>
                                                <td>${order.taxPrice}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Total</strong>
                                                </td>
                                                <td>${order.totalPrice}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    {
                                        !order.isPaid && (
                                            <div className='col-12'>
                                                {loadingPay && (<Loading/>)}
                                                {
                                                    !sdkReady ? (
                                                        <Loading/>
                                                    ):(
                                                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                                                    )
                                                }
                                            </div>                                         
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
                        </>
                    )
                }
            </div>
        </div>
      )
}

export default Order