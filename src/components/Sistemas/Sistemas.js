import React, { useState, useEffect } from 'react';
import { Grid, Button, Container } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { carpetaSistemas } from './data';
import { CONECTION } from '../../conection';
import { useDispatch } from 'react-redux';
import { types } from '../../redux/types';

export default function Sistemas() {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const [carpSystem, setCarpSystem] = useState([]);
  const [objectState,setObjectState] = useState({
    total:1,
    totalCompleted:0
  })
  useEffect(() => {
    dispatch({type:types.loading});
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
          setObjectState({...objectState,total:newData.length,totalCompleted:newData.filter((value) => value.is_completed && value).length});
          setCarpSystem(newData);
        }
        
        dispatch({type:types.loaded});
      })
  }, []);

  /*useEffect(() => {
    arrowNext();
  }, []);*/

  return (
    <Container className='sistemas'>
      <Grid className="carpeta-enfermedades" centered>
        <Grid.Row>
          <h1 className="title-diseas">Historial Médico</h1>
        </Grid.Row>
        <Grid.Row className="subtitle-diseas">
          <h3>Enfermedades de:</h3>
        </Grid.Row>
        <Grid.Column width={15} className='carpetas'>
          {carpSystem
            .map((carpeta, index) => (
              <div className="carpeta" key={carpeta.id}>
                <Link
                  to={{
                    pathname: '/dashboard/lista-enfermedades',
                    state: {
                      humanSystem: carpeta.human_system_Id.name.trim(),
                      carpetaId: carpeta.id,
                      systemId: carpeta.human_system_Id.id,
                      color: carpeta.color,
                    },
                  }}>
                  {carpeta.svg}
                </Link>
                <Grid.Row>
                  <Button
                    className={'ui button'}
                    style={{
                      backgroundColor: carpeta.is_completed ? '#19A06F' : ' #a01919'
                    }}>
                    {carpeta.is_completed ? 'Completo' : 'Incompleto'}
                  </Button>
                  <Button onClick={() => {
                    history.push('/dashboard/lista-enfermedades',{
                        humanSystem: carpeta.human_system_Id.name.trim(),
                        carpetaId: carpeta.id,
                        systemId: carpeta.human_system_Id.id,
                        color: carpeta.color
                      })
                  }}>Editar</Button>
                <Grid.Row>
                  <p className="folder_text">{carpeta.human_system_Id.name}</p>
                </Grid.Row>
                </Grid.Row>
              </div>
            ))
          }
        </Grid.Column>
        { objectState.totalCompleted === objectState.total && (
        <Grid.Column width={1} className='arrow-next'>
          <Link to={'/dashboard/antecedentes'}>
            <div
              className="swiper-button-next"
              tabIndex="0"
              role="button"
              aria-label="Next slide"
              aria-controls="swiper-wrapper-5ee101923810c92463"
              aria-disabled="false">
                 <div class="arrow right"><button class="ui button">Siguiente</button></div>
              </div>
          </Link>
        </Grid.Column>
        )}
      </Grid>
    </Container>
  );
}
