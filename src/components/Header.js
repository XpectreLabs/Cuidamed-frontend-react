import React from 'react';
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
              <a href="/register">
                <span>Crea cuenta</span>
              </a>
            </p>
          </div>
        )}
      </div>
      <div className="header__img-container">
        <Image src={Logo} className="logo" centered />
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
