import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { saveShippingAdress } from '../../Redux/Actions/CartActions';
import './shipping.css'

const Shipping = () => {

    const cart = useSelector((state)=>state.cart);
    const shippingAdress = cart;

    const [ville, setVille] = useState(shippingAdress.ville);
    const [adresse, setAdresse] = useState(shippingAdress.adresse);
    const [codePostal, setCodePostal] = useState(shippingAdress.codePostal);
    const [pays, setPays] = useState(shippingAdress.pays);

    const dispatch = useDispatch();
    const navigate= useNavigate();

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(saveShippingAdress({ville,adresse,codePostal,pays}));
        navigate("/payment");
    }

  return (
    <div className='shippingship'>
        <form className="bodypinfoship" onSubmit={submitHandler}>
          <p className='titrelivraison'>Adresse de Livraison</p>

          <div className='bodypinfo2'>
            <div className='gaucheflex'>
              <label for="adresse" className="form-label">Entrez l'adresse de livraison</label>
              <input type="text" className="form-control" id="adresse" value={adresse} required onChange={(e)=>setAdresse(e.target.value)}/>

              <label for="ville" className="form-label">Entrez la ville</label>
              <input type="text" className="form-control" id="ville" value={ville} required onChange={(e)=>setVille(e.target.value)}/>
            </div>

            <div className='droiteflex'>
              <label for="codep" className="form-label">Entrez le code postal</label>
              <input type="text" className="form-control" id="codep" value={codePostal} required onChange={(e)=>setCodePostal(e.target.value)}/>

              <label for="pays" className="form-label">Entrez le pays</label>
              <input type="text" className="form-control" id="pays" value={pays} required onChange={(e)=>setPays(e.target.value)}/>

              <input type="submit" className='btn btn-secondary submitmobile' value='Continuer'/>
            </div>
          </div>

          <div>
            <button type="submit" className="btn btn-secondary submitweb"> Continuer</button>
          </div>
        </form>
    </div>
  )
}

export default Shipping