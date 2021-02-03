import React, { useState, useEffect } from 'react';
import { Grid, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { commonDiseases } from './data';

export default function EnfermedadesComunes() {
  const [listCommonDiseases, setListCommonDiseases] = useState([]);
  const handleCheckedInput = (e) => {
    const value = e.target.value;

    if (e.currentTarget.checked) {
      setListCommonDiseases((listCommonDiseases) => [
        ...listCommonDiseases,
        value,
      ]);
    } else {
      setListCommonDiseases((listCommonDiseases) => {
        const newItems = listCommonDiseases.filter((disease) => disease !== value);
        return [...newItems];
      })
    }
  };

  useEffect(() => {
    console.log(listCommonDiseases);
    if (listCommonDiseases) {
      localStorage.setItem('commonDiseases', JSON.stringify(listCommonDiseases));
    }
  }, [listCommonDiseases])

  const arrowNext = () => {
    const arrowNext = document.querySelector('.swiper-button-next');
    arrowNext.style.color = '#00a199';
    const buttonNext = document.createElement('button');
    buttonNext.textContent = 'Siguiente';
    buttonNext.classList.add('ui', 'button');
    const divNext = document.createElement('div');
    divNext.appendChild(buttonNext);
    divNext.classList.add('arrow', 'right');
    arrowNext.appendChild(divNext);
  }

  useEffect(() => {
    arrowNext();
  }, []);

  return (
    <div>
      <Container className='common-diseases'>
        <Grid verticalAlign="middle">
          <Grid.Row>
            <h1 className="title-diseas">Historial Médico</h1>
          </Grid.Row>
          <Grid.Row className="subtitle">
            <h2 className="subtitle-diseas">
              ¿Tienes algunas de estas enfermedades?
            </h2>
          </Grid.Row>
          <Grid.Row
            verticalAlign="middle"
            className="list-enfermedades-comunes">
            <Grid.Column width={15} verticalAlign="middle">
              <div className="container-enfermedades">
                {commonDiseases.map((disease, index) => (
                  <div key={index} className="container-enfermedades__btn">
                    <input
                      type="checkbox"
                      id={disease.id}
                      value={disease.name}
                      onChange={handleCheckedInput}></input>
                    <label htmlFor={disease.id} className="ui button">
                      {disease.name}
                    </label>
                  </div>
                ))}
              </div>
            </Grid.Column>
            <Grid.Column width={1}>
              <Link to={'/dashboard/sistemas'}>
                <div
                  className="swiper-button-next"
                  tabIndex="0"
                  role="button"
                  aria-label="Next slide"
                  aria-controls="swiper-wrapper-5ee101923810c92463"
                  aria-disabled="false"></div>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}
