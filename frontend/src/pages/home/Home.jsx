import React from 'react';
import './home.css';
import HomeProducts from '../../components/products/homeproducts/HomeProducts';
import Caroussel from '../../components/caroussel/Caroussel';

const Home = () => {
  return(
      <div>

        <div>
          <Caroussel/>
        </div>

        <div className='container-fluid px-0'>
          <HomeProducts/>
        </div>
          
      </div>
  )
};

export default Home;
