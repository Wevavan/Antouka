import React, {  } from 'react';
// import { Carousel } from 'react-bootstrap';

const HomeTopProducts = (props) => {
    // const [index, setIndex] = useState(0);

    // const handleSelect = (selectedIndex, e) => {
    //     setIndex(selectedIndex);
    // };

  return (
    <div className='col-sm-3 hometopproducts'>

        <div className='divhometopproducts' key={props.id}>
            <div className='tophomeproducttext'>
                <p>{props.title}</p>
            </div>

            <div className='tophomeimgproduct'>
                <img src={props.image} className="" alt={props.title}/>
            </div>

            <div className='topproductbtn'>
                <a href='/catalogue'>Découvrir</a>
            </div>
        </div>
    </div>
  )
}

export default HomeTopProducts;