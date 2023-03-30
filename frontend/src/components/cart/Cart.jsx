import React, { useEffect } from 'react';
import './cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../Redux/Actions/CartActions';
import carte from '../../assets/cart.jpg';

import { RiDeleteBin6Line } from 'react-icons/ri';

const Cart = () => {
  const location = useLocation()
  const { id } = useParams();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state)=> state.cart);
  const {cartItems} = cart;

  const total = cartItems.reduce((a,i) => a + i.qty * i.price, 0).toFixed(2);

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id,qty));
    }
  }, [dispatch, id, qty]);
  
  const checkOutHandler = ()=>{
    navigate("/login?redirect=/shipping");
  }

  const removeFromCartHandler = (id)=>{
    dispatch(removeFromCart(id))
  }


  return (
    <div className='cartetable d-flex justify-content-center d-inline'>
        <div className='container'>

          {
            cartItems.length === 0 ? (
              <div className='paniervide'>
                <div className='paniervideimgdiv'>
                  <img src={carte} alt=''/>
                </div>

                <div className='paniervidetext'>
                  <p className='pt1'>Votre panier IsiShop est vide !</p>
                  <p className='pt2'>voir les offres du mois </p>
                </div>
              </div>
            ): (
              <>
                {/* row des produits et leurs details */}

                {
                  cartItems.map((item)=>(
                    <>
                      <div className='cartitemrow'>

                        <div className='grp1'>
                          <div className='caseimgcarte py-4'>
                            <img src={item.image} alt={item.title} />
                          </div>

                          <div className='casedescriptioncarte'>
                            <p className='fw-bold'>{item.title}</p>
                            <span>{item.description}</span>
                          </div>
                        </div>

                        <div className='grp2'>
                          <div className='casequantitecarte'>
                            <div className="">
                              <span>QUANTITÉE: </span>
                              <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))}>
                                {[...Array(item.countInStock).keys()].map(
                                  (x) => (
                                          <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                          </option>
                                        )
                                )}
                              </select>
                            </div>
                          </div>

                          <div className='caseprixcarte'>
                            <p className='fw-bold'>${item.price}</p>
                            {/* <span>old price</span> */}
                          </div>

                          <div className='casedeleteitem'>
                            <span><button className="btn border " onClick={()=>removeFromCartHandler(item.product)}><RiDeleteBin6Line/></button></span>
                          </div>
                        </div>

                      </div>

                    
                    </>
                  ))
                }

                <div className='row'>
                        <div className='col-sm-3 casedescriptioncarte'>
                          
                        </div>

                        <div className='col-sm-3 casedescriptioncarte'>
                          
                        </div>

                        <div className='col-sm-2 casequantitecarte fw-bold'>
                        </div>

                        <div className='col-sm-2 caseprixcarte'>
                          <p className='fw-bold'> <span className='fw-bold fs-5 me-2 text-danger'>TOTAL :</span> <span>${total}</span></p>
                        </div>

                        <div className='col-sm-2 caseprixcarte2'>
                          {
                            total > 0 && (
                              <button type="button" className="btn btn-secondary btn-sm mb-2" onClick={checkOutHandler}>VALIDER LE PANIER</button>
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

export default Cart