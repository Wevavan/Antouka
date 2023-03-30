import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './app.css';


import Home from '../src/pages/home/Home';
import Panier from '../src/pages/panier/Panier';
import Magasin from '../src/pages/magasin/Magasin';
import Contact from '../src/pages/contact/Contact';
import Abonnement from '../src/pages/abonnement/Abonnement';
import Produit from '../src/components/products/Produit';
import Login from '../src/pages/login/Login';
import Register from '../src/pages/register/Register';
import Profile from '../src/pages/profile/Profile';
import Shipping from '../src/pages/shipping/Shipping';
import Payment from '../src/pages/payment/Payment';
import Placeorder from '../src/pages/placeorder/Placeorder';
import Order from '../src/pages/order/Order';
// import Menu404 from './components/menu/Menu404';
import Menu from './components/menu/Menu';
import Footer from './components/footer/Footer';



function App() {
  return (
    <div className=''>
        
      
        <Router>
          <Menu/>

          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/cart' element={<Panier/>} />
            <Route path='/cart/:id' element={<Panier/>} />
            <Route path='/catalogue' element={<Magasin/>} />
            <Route path='/produits/:id' element={<Produit/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/abonnement' element={<Abonnement/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/shipping' element={<Shipping/>} />
            <Route path='/payment' element={<Payment/>} />
            <Route path='/placeorder' element={<Placeorder/>} />

            <Route path='/order/:id' element={<Order/>}/>

            <Route path='/register' element={<Register/>} />
            <Route path='/profile' element={<Profile/>} />
          </Routes>

          <Footer/>

        </Router>
    </div>
  );
}

export default App;
