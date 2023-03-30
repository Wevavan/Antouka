import React, { useEffect, useState } from 'react';
import './caroussel.css';
import { Carousel } from 'react-bootstrap';
import topimg from '../../assets/topimg.jpg';
import topimg6 from '../../assets/topimg6.jpg';
import topimg7 from '../../assets/topimg7.jpg';
// import topimg8 from '../../assets/topimg8.jpg';
import axios from 'axios';
import TopCarouProducts from './TopCarouProducts';

const Caroussel = () => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchproducts = async() =>{
            const { data } = await axios.get("/api/topproducts");
            setProducts(data);
        };
        fetchproducts();
    }, []);

    const ShowProducts = () =>{
        return(
            <>
                {products.map((product)=>{
                    return(
                        <TopCarouProducts key={product._id} product={product} image={product.image} title={product.title} price={product.price}/>
                    )
                })}
            </>
        )
    }


  return(

    <>
      <div className='lecaroussel'>
        <Carousel className='carousel' activeIndex={index} onSelect={handleSelect}>

            <Carousel.Item interval={5000}>
                <img
                    className="d-block w-100"
                    src={topimg}
                    alt=""
                />
                {/* <a href="https://www.freepik.com/free-vector/low-poly-abstract-white-golden-lines-background_9296522.htm#query=gold%20background&position=25&from_view=keyword">Image by starline</a> on Freepik */}
                
                <Carousel.Caption className='mobilecaption'>

                    <div className='carouright'>
                        <p>PETITS PRIX</p>
                        <h5>Sur les articles gaming</h5>
                    </div>

                    <ShowProducts/>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item className='navcarou2'>
                <div className='gauche22'>
                    <img className = "d-block w-100" src={topimg6} alt="Second slide"/>
                </div>

                <div className='milieu'>
                    <p className='top_p1'>Sur IsiShine<span> Acheter pour un proche</span></p>
                    <p className='top_2'>Notre équipe se charge de la livraison. Votre proche aura l'impression d'avoir commandé juste à côté</p>

                </div>
{/* Image by <a href="https://www.freepik.com/free-photo/elevated-view-two-yellow-craftpapers-blue-surface_2856983.htm#page=6&query=double%20color%20background&position=1&from_view=search&track=ais">Freepik</a> */}
                <div className='droite22'>
                    {/* <Carousel.Caption className='mobilecaption'> */}
                        <img className = "d-block w-100" src={topimg7} alt="Second slide"/>
                    {/* </Carousel.Caption> */}
                </div>
            </Carousel.Item>

        </Carousel>
      </div>
    </>
  );
};

export default Caroussel;
