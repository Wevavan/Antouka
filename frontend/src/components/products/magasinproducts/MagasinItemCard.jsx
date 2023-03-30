import React from 'react';
import './magasinproducts.css';
import { NavLink } from 'react-router-dom';

const ItemCard = (props) => {

  return (
        <div className='bglight homeitemcontainer2 col-sm-2 border table-bordered rounded-3 mb-1 pb-4 d-flex justify-content-center'>
            <NavLink to={`/produits/${props._id}`} className="navlink"><div className="">
                <div className=" " key={props._id}>

                    <div className='imagecadre pt-5'>
                        <img src={props.image} className="limage card-img-top" alt={props.title}/>
                    </div>

                    <div className="card-body lecadrebody p-1 md:p-1">
                            
                        <p className='text-center fw-bold mb-0'>${props.price}</p>

                        <p className="card-title text-center mb-3 mt-2 titreproduit">{props.title.substring(0,12)}</p>           

                        {/* <div className='btnnoactive'>
                            <button className=" px-0 py-0 rounded-3">Ajouter</button>
                        </div> */}
                    </div>
                </div>
            </div></NavLink>
        </div>
  )
}

export default ItemCard