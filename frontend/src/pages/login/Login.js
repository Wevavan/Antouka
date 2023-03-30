import React, { useEffect, useState } from 'react';
import './login.css';
import { Carousel } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import Footer from '../../components/footer/Footer';
import { login } from '../../Redux/Actions/UserActions';
import Message from '../../components/LoadingError/Error';
import Loading from '../../components/LoadingError/Loading';

const Login = () => {

  const navigate= useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1]:"/catalogue";

  const userLogin = useSelector((state)=>state.userLogin);
  const {error, loading, userInfo} = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect])
  

  const submitHandler= (e) =>{
    e.preventDefault();
    dispatch(login(email,password));
  }

  return (
    <>
    <div className='loginlogin'>

      <div className='leftlogin'>
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

      <div className='rightlogin'>
        <h3 className=''>Hey Salut !</h3>
        <p className='parag'>Le sait tu ? <span>Dans le menu <Link to="/abonnement" className='lien'>abonnement</Link> tu peux configurer tes commandes. On se charge de te livrer quand tu veux</span></p>

        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading/>}
        <div className='form'>
          <form onSubmit={submitHandler}>
            <p>
              <span>
                <small id="nameHelp" className="form-text text-muted">Email</small>
                <input type="email" className="form-control mb-1" id="nameHelp" placeholder="johndoe@gmail.com" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
              </span>
              <span>
                <small id="nameHelp" className="form-text text-muted">Mot de Passe</small>
                <input type="password" className="form-control" id="nameHelp" placeholder="Entrer votre mot de passe" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <p id="nameHelp" className="form-text text-muted forgetpass"><Link to="" className='lien'>Mot de Passe oublié !</Link></p>
              </span>
            </p>

            <input className='btn btn-secondary btnok mb-5' type="submit" value="S'identifier"/>
          </form>
        </div>

        <p className='lienregister'>
          Vous n'avez pas de compte? <Link to={redirect ? `/register?redirect=${redirect}` : "/register"} className='lien'>S'inscrire</Link>
        </p>
      </div>

    </div>
    {/* <Footer/> */}
    </>
  )
}

export default Login