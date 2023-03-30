import React from 'react';
import './footer.css';
import { Link, NavLink } from "react-router-dom";
import { AiOutlineInstagram, AiOutlineWhatsApp } from 'react-icons/ai';
import { TbBrandTelegram } from 'react-icons/tb';

const Footer = () => {
  return(
      <div>
        <footer>
            <div className="footer-content">
              <p><span>Qui somme nous ? </span><span> Commandez pour un proche,</span><span> Contactez nous !</span></p>

              <ul className='socials'>

                <li><a href='https://instagram.com/ant_ouka?igshid=ZDdkNTZiNTM=' target="_blank" rel="noreferrer noopener"><AiOutlineInstagram/></a></li>
                <li><a href='https://t.me/+LmpK4m-LEmAxYTQ0' target="_blank" rel="noreferrer noopener"><TbBrandTelegram/></a></li>
                <li><a href='https://chat.whatsapp.com/K70j75X03tJ57L7qayvFGK' target="_blank" rel="noreferrer noopener"><AiOutlineWhatsApp/></a></li>
                
              </ul>
              
            </div>

            <div className='footer-bottom'>
                <p>copyright &copy; 2023 IsiShine. designed by <span>IsiShine-Tech</span></p>
            </div>
        </footer>
      </div>
  );
};

export default Footer;
