import React from 'react';
import './caroussel.css';

const TopCarouProducts = (props) => {
  return (
    <div>
        <div className='carouleft'>
            <div className=' topitemcontainer d-flex justify-content-center'>
                <div className="">
                    <div className="topcaroutaille">

                        <div className='carouimagecadre'>
                            <img src={props.image} className="limage card-img-top" alt=''/>
                        </div>

                        <div className="card-body caroulecadrebody">

                            <p className="card-title text-center caroutitreproduit">{props.title.substring(0,9)}</p> 
                            <p className='text-center titreprice'>${props.price}</p>          

                            {/* <div className='float-start btnnoactive'>
                                <button className="btn px-0 py-0 rounded-3">Ajouter</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default TopCarouProducts