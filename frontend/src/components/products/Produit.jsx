import React, { useEffect, useState }  from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './produit.css';
import Footer from '../footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../../Redux/Actions/ProductActions';
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';



const Produit = () => {
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState("");
  const productDetails = useSelector((state)=> state.productDetails);
  const {loading, error, product} = productDetails;

  console.log(qty);

  const AddToCartHandle = (e) =>{
    e.preventDefault();
    navigate(`/cart/${id}?qty=${qty}`);
  }

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const ShowProduct = () =>{
    return(
      <>
        <div key={product.id} className="container singleproduit">

          {
            loading ? (<div className='mb-5'><Loading/></div>) : error ? (<Message variant="alert-danger">{error}</Message>) :(
              <div className="single_product container-fluid bg-light">
                <div className="flexduct">
                    <div className='productmg'>
                      <div className="order-lg-1 order-2 mg1">
                          <ul className="image_list">
                              <li><img src={product.image} alt=""/></li>
                              <li><img src={product.image} alt=""/></li>
                              <li><img src={product.image} alt=""/></li>
                          </ul>
                      </div>
                      <div className="order-1 mg2">
                          <div className="image_selected"><img src={product.image} alt=""/></div>
                      </div>
                    </div>
                    <div className="col-lg-6 order-3 productdesc">
                        <div className="product_description">
                            <div className="product_name">{product.title}</div>
                            <div> <span className="product_price">${product.price}</span> <strike className="product_discount"> <span className="">$ 2,000</span> </strike> </div>
                            <hr className="singleline"/>

                            <div> 
                              <span className="product_info">{product.description}</span> 
                              <p className='mt-4 fw-bold textstock'>
                                DISPONIBLE EN STOCK ? : 
                                    {
                                      product.countInStock > 0 ?(
                                      <span className='text-success ms-2'>OUI</span>
                                      ) : (<span className='text-danger ms-2'>NON</span>)
                                    }
                              </p>
                            </div>

                            <hr className="singleline"/>
                            <div className="order_info d-flex flex-row">
                                <form action="#"/>
                            </div>
                            <div className="row">
                                <div className="col-xs-6 signle_product_btn">
                                    {/* <div className='flextwobtn'> */}
                                      <div className="product_quantity">
                                        <span>QUANTITÉE : </span>
                                        <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                          {[...Array(product.countInStock).keys()].map(
                                            (x) => (
                                              <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                              </option>
                                            )
                                          )}
                                        </select>
                                      </div>
                                      <>
                                        {
                                          product.countInStock > 0 && 
                                            <button type="button" className="btn shop-button me-1" onClick={AddToCartHandle}>Ajouter au Panier</button>                                            
                                        }
                                      </>
                                    {/* </div> */}

                                    <Link to="/catalogue" className='shop-button2'><button type="button" className="btn">Retour au Magasin</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            )
          }

        </div>

        <Footer/>
      </>
    )
  }
  

  return (
    <div>
      <ShowProduct/>
    </div>
  )
}

export default Produit;