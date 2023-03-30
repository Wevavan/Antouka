import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { savePaymentMethod } from '../../Redux/Actions/CartActions';
import './payment.css'

const Payment = () => {

    const navigate= useNavigate();
    const cart = useSelector((state)=>state.cart);
    const shippingAdress = cart;

    if(!shippingAdress){
        navigate("/shipping");
    }

    const [paymentMethod, setPaymentMethod] = useState("Paypal");

    const dispatch = useDispatch();

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder");
    }

  return (
    <div className='bodypaye'>

        <p className='titrelivraison'>Méthode de payement</p>

        <form className="bodypayment" onSubmit={submitHandler}>
            <div className="form-check">
                <div className='div1'>
                  <input className="form-check-input" type="radio" name="exampleRadios" id="paypal" value={paymentMethod} checked onChange={(e)=>setPaymentMethod(e.target.value)}/>
                  <label className="form-check-label" for="paypal">
                      PayPal
                  </label>
                </div>

                <div className='div2'>
                  <input className="form-check-input" type="radio" name="exampleRadios" id="mainpropre" value={paymentMethod} checked onChange={(e)=>setPaymentMethod(e.target.value)}/>
                  <label className="form-check-label" for="mainpropre">
                      Payer en main propre
                  </label>
                </div>
            </div>
            <div className='divsubpaye'>
              <button type="submit" className="btn btn-secondary mt-4 btnsub"> Continuer</button>
            </div>
        </form>
    </div>
  )
}

export default Payment