import React,{useEffect} from 'react';
import './magasinproducts.css';
import MagasinItemCard from './MagasinItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { listProduct } from '../../../Redux/Actions/ProductActions';
import Loading from '../../LoadingError/Loading';
import Message from '../../LoadingError/Error';



const ProductsMarche = () => {
  
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const {loading, error, products} = productList;

    useEffect(() => {
        dispatch(listProduct());
        
    }, [dispatch]);
    
  const ShowProducts = () =>{
    return(
      <>

        {
            loading ? (<div className='mb-5'><Loading/></div>) : error ? (<Message variant="alert-danger">{error}</Message>) :(
                <>
                    {products.map((product)=>{
                        return(
                            <MagasinItemCard _id={product._id} key={product._id} product={product} image={product.image} title={product.title} price={product.price}/>
                        )
                    })}
                </>
            )
        }
      </>
    )
  }
  
    return (
      <div className="productcomponent">
  
  {/* PRODUCTCADRE */}
  
        <div className='productcadre'>
          <div className="container mb-5 pt-0 px-0">
                <div className="row mx-0 productmagasin">
                    <ShowProducts/>
                </div>
          </div>
        </div>   
      </div>
    )

}

export default ProductsMarche;