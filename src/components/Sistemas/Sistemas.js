import React from 'react';
import { Grid, Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { carpetaSistemas } from './data';

export default function Sistemas() {
  return (
    <Container>
      <Grid className="carpeta-enfermedades" centered>
        <Grid.Row>
          <h1 className="title-diseas">Historial Médico</h1>
        </Grid.Row>
        <Grid.Row className="subtitle-diseas">
          <h3>Enfermedades de:</h3>
        </Grid.Row>
        <Grid.Column width={15}>
        {carpetaSistemas
            .map((carpeta, index) => (
              <div className="carpeta">
              <Link
                to={{
                  pathname: '/dashboard/lista-enfermedades',
                  state: {
                    humanSystem: carpeta.humanSystem,
                    arrayData: carpeta.arrayData,
                    color: carpeta.color,
                  },
                }}>
                {carpeta.svg}
              </Link>
              <Grid.Row>
                <Button>Incompleto</Button>
                <Button>Editar</Button>
              </Grid.Row>
              <Grid.Row>
                <p>{carpeta.name}</p>
              </Grid.Row>
            </div>
            ))
        }
        </Grid.Column>
        <Grid.Column width={1}>
              <Link to={'/dashboard/antecedentes'}>
                <div
                  className="swiper-button-next"
                  tabIndex="0"
                  role="button"
                  aria-label="Next slide"
                  aria-controls="swiper-wrapper-5ee101923810c92463"
                  aria-disabled="false"></div>
              </Link>
        </Grid.Column>
      </Grid>
    </Container>
  );
}
