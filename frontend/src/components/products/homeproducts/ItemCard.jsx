import React from 'react';
import './homeproducts.css';

const ItemCard = (props) => {

  return (
        <div className=' homeitemcontainer rounded-3 mb-1 pb-4 d-flex justify-content-center'>
            <div className="">
                <div className=" " key={props.id}>

                    <div className='imagecadre pt-5'>
                        <img src={props.image} className="limage card-img-top" alt={props.title}/>
                    </div>

                    <div className="card-body lecadrebody p-1 md:p-1">
                            
                        <p className='text-center fw-bold mb-0'>${props.price}</p>

                        <p className="card-title text-center mb-3 mt-2 titreproduit">{props.title.substring(0,12)}</p>           

                        {/* <div className='float-start btnnoactive'>
                            <button className="btn px-0 py-0 rounded-3">Ajouter</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ItemCard