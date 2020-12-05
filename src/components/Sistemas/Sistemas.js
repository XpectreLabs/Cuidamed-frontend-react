import React, { useState, useEffect } from 'react';
import { Grid, Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { carpetaSistemas } from './data';
import { CONECTION } from '../../conection';

export default function Sistemas() {

  const [carpSystem, setCarpSystem] = useState([]);
  useEffect(() => {
    fetch(`${CONECTION}api/system`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'x-auth-token': localStorage.getItem('refreshToken'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          const newData = data.data.map((d) => {
            if (d.is_completed === 'NO') {
              d.is_completed = false;
            } else {
              d.is_completed = true;
            }
            const newItem = carpetaSistemas
              .filter((item) => item.name === d.human_system_Id.name.trim());
            d.svg = newItem[0].svg;
            d.color = newItem[0].color;
            d.arrayData = newItem[0].arrayData;
            return d;
          });
          console.log(newData);
          setCarpSystem(newData);
        }
      })
  }, [])

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
          {carpSystem
            .map((carpeta, index) => (
              <div className="carpeta" key={carpeta.id}>
                <Link
                  to={{
                    pathname: '/dashboard/lista-enfermedades',
                    state: {
                      humanSystem: carpeta.human_system_Id.name.trim(),
                      carpetaId: carpeta.id,
                      color: carpeta.color,
                    },
                  }}>
                  {carpeta.svg}
                </Link>
                <Grid.Row>
                  <Button
                    class={'ui button'}
                    style={{
                      backgroundColor: carpeta.is_completed ? '#19A06F' : ' #a01919'
                    }}>
                    {carpeta.is_completed ? 'Completo' : 'Incompleto'}
                  </Button>
                  <Button>Editar</Button>
                </Grid.Row>
                <Grid.Row>
                  <p>{carpeta.human_system_Id.name}</p>
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
