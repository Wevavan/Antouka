import React, { useEffect, useState } from 'react';
import './profile.css';
import { useDispatch, useSelector } from 'react-redux';
import Toast from '../../components/LoadingError/Toast';
import Message from '../../components/LoadingError/Error';
import Loading from '../../components/LoadingError/Loading';
import { toast } from 'react-toastify';
import { updateUserProfile } from '../../Redux/Actions/UserActions';

import { FiSettings } from 'react-icons/fi';

const ModifProfil = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const toastId = React.useRef(null);

    const dispatch = useDispatch();

    const userDetails = useSelector((state)=>state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdateProfile = useSelector((state)=>state.userUpdateProfile);
    const { loading: updateLoading } = userUpdateProfile;

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, user]);
    
    const submitHandler = (e)=>{
        e.preventDefault();
        // Password match
        if (password !== confirmPassword) {
            if (!toast.isActive(toastId.current)) {
              toastId.current = toast.error("Mots de passe non identique",Toastobjects);
            }
        }else{
            dispatch(updateUserProfile({id:user._id,name,email,password}))
            if (!toast.isActive(toastId.current)) {
              toastId.current = toast.success("Profile mise à jour !",Toastobjects);
            }
        }
    }

    const Toastobjects = {
      pauseOnFocusLoss : false,
      draggable : false,
      pauseOnHover : false,
      autoClose : 3000
    }

  return (
    <div className='modifppp'>
        <Toast/>
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading/>}
        {updateLoading && <Loading/>}
        
        <form className="bodypinfo1" onSubmit={submitHandler}>

          <div className='bodypinfo'>

            <div className='gauchemodif'>
              <label for="username" className="form-label">Nom d'Utilisateur</label>
              <input type="text" className="form-control" id="username" required value={name} onChange={(e) => setName(e.target.value)}/>

              <label for="pass" className="form-label">Nouveau Mot de Passe</label>
              <input type="password" className="form-control" id="pass" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className='droitemodif'>
              <label for="mail" className="form-label">Adresse Email</label>
              <input type="email" className="form-control" id="mail" value={email} onChange={(e) => setEmail(e.target.value)}/>

              <label for="pass2" className="form-label">Confirmer le Mot de Passe</label>
              <input type="password" className="form-control" id="pass2" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
            
          </div>

          <div className='btnmodif'>
            <button type="submit" className="btn btn-secondary" ><i><FiSettings/></i><span> Modifier</span></button>
          </div>

        </form>
    </div>
  )
}

export default ModifProfil