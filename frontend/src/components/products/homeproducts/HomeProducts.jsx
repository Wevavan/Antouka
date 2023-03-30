import React,{useState, useEffect} from 'react';
import './homeproducts.css'
import ItemCard from './ItemCard';
import axios from 'axios';
import HomeTopProducts from './HomeTopProducts';
import Homeachatfor from '../../homeachatforfriend/Homeachatfor';
// import MobiletopProdutcts from './MobiletopProdutcts';

const Products = () => {


  const [products, setProducts] = useState([]);
  const [meilleurajout, setMeilleurajout] = useState([]);

  useEffect(() => {
      const fetchproducts = async() =>{
          const { data } = await axios.get("/api/productsdumoment");
          setProducts(data);
      };
      fetchproducts();
  }, []);

  useEffect(() => {
    const fetchmeilleurajout = async() =>{
        const { data } = await axios.get("/api/topproducts");
        setMeilleurajout(data);
    };
    fetchmeilleurajout();
}, []);

const ShowProducts = () =>{
    return(
        <>
            {products.map((product)=>{
                return(
                    <ItemCard key={product._id} product={product} image={product.image} title={product.title} price={product.price}/>
                )
            })}
        </>
    )
}

const ShowHomeTopProducts = () =>{
  return(
      <>
          {meilleurajout.map((product)=>{
              return(
                  <HomeTopProducts key={product._id} product={product} image={product.image} title={product.title} price={product.price}/>
              )
          })}
      </>
  )
}

  return (
    <div className="container-fluid">
      <div className='acceuilproductcadre pt-5 justify-content-center'>

        <div className="hometp">
          <ShowHomeTopProducts/>
        </div>

        <div className="row homeproductbottom">
          <Homeachatfor/>
        </div>  

        <div className='row'>
          <p className='topproduitstitre'>LES TOPS PRODUITS DU MOMENT</p>
        </div>

        <div className="homeproductbody row">
          <ShowProducts/>
        </div>                  

      </div>    
    </div>
  )
};

export default Products;
