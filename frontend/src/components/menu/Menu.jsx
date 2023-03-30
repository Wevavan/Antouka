import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/Actions/UserActions';
import { listProduct } from '../../Redux/Actions/ProductActions';
import { NavLink } from "react-router-dom";
import './menu.css';

import { FaStore } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiMessage } from 'react-icons/bi';
import { FiShoppingCart, FiLogOut, FiLogIn } from 'react-icons/fi';
import { FaHouseUser } from 'react-icons/fa';

const Menu = () => {

    const dispatch = useDispatch();

    const cart = useSelector((state)=> state.cart);
    const {cartItems} = cart;

    const userLogin = useSelector((state)=>state.userLogin);
    const { userInfo } = userLogin;

    const productList = useSelector((state) => state.productList);
    const {loading, error, products} = productList;
    console.log(productList);
    const [data, setData] = useState(productList);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = event => {
        setSearchTerm(event.target.value);
        const filteredData = productList.filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setData(filteredData);
    };

    useEffect(() => {
        dispatch(listProduct());
        
    }, [dispatch]);

    const logoutHandler=()=>{
        dispatch(logout());
    }

  return (

        <header>
            <NavLink to='/' className='logo'>
                <span className="whitec">Isi</span>
                <span className="orangec">Shine</span>
            </NavLink>

                <input type='checkbox' id='menu-bar'></input>
                <label for='menu-bar'>MENU</label>

            <nav className='navbar'>
                
                <ul>
                    <li>
                        {/* div recherche categorie */}
                        <div className="categorie headerdiv">
                            <div className="categorioption">
                            <select class="" name="option">                                
                                <option value="" disabled selected>
                                catégories
                                </option>
                                <option value="1">Afficher tout</option>
                                <option value="2">Accessoire jeux vidéos</option>
                                <option value="3">Sports et loisirs</option>
                                <option value="4">Beauté, Santé et Bien être</option>
                                <option value="5">Livres</option>
                                <option value="6">Fournitures scolaire et de bureaux</option>
                                <option value="7">Jouets enfants et bébé</option>
                            </select>
                            </div>

                            <form className="d-flex navinput noactiveinput">
                                <input className="form-control mx-1" type="search" placeholder="" aria-label="Search" value={searchTerm} onChange={handleSearch}/>
                            </form>

                            <div className="btnsearch">
                            <button type="button" className="btn">
                                <AiOutlineSearch />
                            </button>
                            </div>
                        </div>
                    </li>

                    <li><NavLink to='/catalogue'><FaStore/> Magasins</NavLink></li>
                    <li><NavLink to='/cart'><FiShoppingCart/> Panier <span className='orangec'>({cartItems.length})</span></NavLink></li>
                    <li><NavLink to='/contact'><BiMessage/> Contact</NavLink>

                    </li>
                    <li><div className='menuli'>
                        {/* div login */}
                            {
                                userInfo ? (
                                <>
                                    <li className="ms-1 profilebtn">
                                        <NavLink to='/profile' className="profilname">
                                            <FaHouseUser/>
                                            <span>{userInfo.name}</span>
                                        </NavLink>
                                    </li>
                                    <li className="profilebtn2">
                                        <NavLink to='/login' className="text-dark logoutbtn" onClick={logoutHandler}>
                                            <FiLogOut/>
                                        </NavLink>
                                    </li>
                                </>
                                ) : (
                                <li>
                                    <NavLink to="/login" className='loginbtn'><FiLogIn/> S'identifier </NavLink>
                                </li>
                                )
                            }
                    </div></li>
                </ul>

            </nav>
        </header>

  )
}

export default Menu