import React from 'react';
import './contact.css';

const Contact = () => {
    return(
        (
            <div className='contact'>
                <form>
                    <p>Vos informations de contact</p>

                    <label for='idnom'>Nom :</label><br/>
                    <input type='text' id='idnom' name='nom'/><br/>

                    <label for='idprenom'>Prenom :</label><br/>
                    <input type='text' id='idprenom' name='prenom'/><br/>

                    <label for='idmail'>Adresse e-mail :</label><br/>
                    <input type='text' id='idmail' name='mail'/><br/>

                    <label for='idmail2'>Confirmer votre adresse e-mail :</label><br/>
                    <input type='text' id='idmail2' name='mail2'/><br/>

                    <p>Votre message</p>
                    
                    <label for='idmsg'>Message :</label><br/>
                    <textarea type='text' id='idmsg' name='mail2'/><br/>

                    <input className='submsg' type='submit' value='envoyer le message' name='sendmsg'/>

                </form>
            </div>
        )
    );
};

export default Contact;
