import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Image } from 'semantic-ui-react';
import Logo from '../images/CuidaMEDLogo.png';
export const Header = ({ hideElements = false, openModal }) => {
  return (
    <header className="header">
      <div>
        {!hideElements && (
          <div className="header__register">
            <p>
              ¿No tienes cuenta?
              <Link to="/register">
                <span>Crea cuenta</span>
              </Link>
            </p>
          </div>
        )}
      </div>
      <div className="header__img-container">
        <Link to="/login">
          <Image src={Logo} className="logo" centered />
        </Link>
      </div>
      <div>
        {!hideElements && (
          <Button className="emergency" onClick={() => openModal(true)}>
            Emergencia
          </Button>
        )}
      </div>
    </header>
  );
};
