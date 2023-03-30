import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../Redux/Actions/UserActions';
import Loading from '../../components/LoadingError/Loading';
import Message from '../../components/LoadingError/Error';
import './register.css';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const redirect = location.search ? location.search.split("=")[1]:"/catalogue"

    const userRegister = useSelector((state)=>state.userRegister);
    const {error, loading, userInfo} = userRegister;

    useEffect(() => {
      if (userInfo) {
        navigate(redirect)
      }
    }, [userInfo, navigate, redirect])
    

    const submitHandler= (e) =>{
      e.preventDefault();
      dispatch(register(name,email,password));
    }
    return (
        <>
        <div className='register'>
    
          <div className='leftregister'>
            <div className='carousel_auth'>
    
            <Carousel controls={false} fade className='carousel_a'>

              <Carousel.Item>
                  <div className="cadre d-block w-100">

                  </div>

                  <Carousel.Caption className='mobilecaption_a'>
                      <span>Indispensable pour accompagner vos plats, important pour votre santé.</span>
                  </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                  <div className="cadre2 d-block w-100">

                  </div>

                  <Carousel.Caption className='mobilecaption_a'>
                      <span>Indispensable pour accompagner vos plats, important pour votre santé.</span>
                  </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                  <div className="cadre3 d-block w-100">

                  </div>

                  <Carousel.Caption className='mobilecaption_a'>
                      <span>Indispensable pour accompagner vos plats, important pour votre santé.</span>
                  </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                  <div className="cadre4 d-block w-100">

                  </div>

                  <Carousel.Caption className='mobilecaption_a'>
                      <span>Indispensable pour accompagner vos plats, important pour votre santé.</span>
                  </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
        
            </div>
          </div>
    
          <div className='rightregister'>
            <h3 className=''>Hey Salut !</h3>
            <p className='parag'>Le sait tu ? <span>Dans le menu <Link to="/abonnement" className='lien'>abonnement</Link> tu peux configurer tes commandes. On se charge de te livrer quand tu veux</span></p>
    
            {error && <Message variant="alert-danger">{error}</Message>}
            {loading && <Loading/>}

            <div className='form'>
              <form onSubmit={submitHandler}>
                <p>
                  <span>
                    <small id="nameHelp" class="form-text text-muted">Nom d'utilisateur</small>
                    <input type="text" class="form-control mb-1" id="nameHelp" placeholder="john" value={name} onChange={(e)=>setName(e.target.value)}></input>
                  </span>

                  <span>
                    <small id="nameHelp" class="form-text text-muted">Email</small>
                    <input type="email" class="form-control mb-1" id="nameHelp" placeholder="johndoe@gmail.com" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                  </span>

                  <span>
                    <small id="nameHelp" class="form-text text-muted">Mot de Passe</small>
                    <input type="password" class="form-control" id="nameHelp" placeholder="Entrer votre mot de passe" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                  </span>
                </p>
      
                <input className='btn btn-secondary btnok mb-5' type="submit" value="S'inscrire"/>
              </form>
            </div>
    
            <p className='lienregister'>
              Vous avez déja un compte? <Link to={redirect ? `/login?redirect=${redirect}` : "/login"} className='lien'>S'identifier</Link>
            </p>
          </div>
    
        </div>
        {/* <Footer/> */}
        </>
      )
}

export default Register