import React, { useEffect, useState } from 'react';
import './profile.css';
// import Footer from '../../components/footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../Redux/Actions/UserActions';
import moment from 'moment';
import ModifProfil from './ModifProfil';
import OrderList from './OrderList';
import { listOrder } from '../../Redux/Actions/OrderActions';

import { FiSettings } from 'react-icons/fi';
import { BsListUl } from 'react-icons/bs';

const Profile = () => {

    const dispatch = useDispatch();
    const [showComponent1, setShowComponent1] = useState(false);
    const [showComponent2, setShowComponent2] = useState(false);

    const userLogin = useSelector((state)=>state.userLogin);
    const { userInfo } = userLogin;
    const orderList = useSelector((state)=>state.orderList);
    const { loading,errors,orders } = orderList;

    useEffect(()=>{
      dispatch(getUserDetails("profile"))
      dispatch(listOrder())
      console.log(userInfo);
    },[dispatch]);

    const handleClick1 = () => {
      setShowComponent1(true);
      setShowComponent2(false);
    };
  
    const handleClick2 = () => {
      setShowComponent1(false);
      setShowComponent2(true);
    };


  return (
    <>
      <div className='profile'>
        <div className='profiltopflex'>

          <div className='but12'>

            <button type="button" className="btn btn-secondary" onClick={handleClick1}><i><FiSettings size='1.2em'/></i>
              <span className='spacetext'>Modifier le profile</span>
            </button>

            <button type="button" className="btn btn-info ms-2" onClick={handleClick2}><i><BsListUl size='1.2em'/></i>
              <span className='spacetext2'>Liste des commades<span className='orderl'>{orders ? orders.length: 0}</span></span>
            </button>

          </div>

        </div>

        <div className='bodyp'>
          {showComponent2 ? <OrderList /> : <ModifProfil/>}
        </div>
      </div>
    </>
  )
}

export default Profile