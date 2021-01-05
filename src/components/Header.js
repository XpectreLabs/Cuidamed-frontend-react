import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Image, Header, Grid } from 'semantic-ui-react';
import Logo from '../images/CuidaMEDLogo.png';
export const HeaderLogin = ({ hideElements = false, openModal }) => {
  return (
    // <Header>
      <Grid.Row centered verticalAlign="middle" className='header'>
        <Grid.Column computer={5} tablet={16} textAlign='center' only='computer tablet'>
          {!hideElements && (
              <p>
                ¿No tienes cuenta?
                <br/>
                <Link to="/register">
                  <span>Crear una cuenta</span>
                </Link>
              </p>
          )}
        </Grid.Column>
        <Grid.Column className="header__img-container" computer={5} mobile={12} tablet={8}>
          <Link to="/login">
            <Image src={Logo} className="logo" centered />
          </Link>
        </Grid.Column>
        <Grid.Column computer={5} only='computer'>
          {!hideElements && (
            <Button className="emergency" onClick={() => openModal(true)}>
              Emergencia
            </Button>
          )}
        </Grid.Column>
      </Grid.Row>
    // </Header>
  );
};
