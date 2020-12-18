import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import {
  Abuelo,
  Abuela,
  Alergias,
  Bisturi,
  Embarazada,
  Fractura,
  Hombre,
  Madre,
  Mujer,
  Padre,
  Protesis,
  Silla,
  UnidadSangre,
  Virus,
  IconDonador
} from "../../images/icons/icons";

import { records, relativeRecords } from './data';

// import Swiper core and required components
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import { CONECTION } from '../../conection';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import SliderAntecedentesComponent from './SliderAntecedentesComponent';
import SliderFamiliaresComponent from './SliderFamiliaresComponent';

import { updateHistoryMedical } from '../../redux/actions/UserAction';
import { useDispatch } from 'react-redux';

// import "./Slider.scss"
// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);



export default function SliderHistorialMedico() {

  const [isValidIndex, setIsValidIndex] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [formValues, setFormValues] = useState({});

  const dispatch = useDispatch();

  const history = useHistory();
  const saveAndContinue = (e) => {
    e.preventDefault();
    let objFracture = {};
    objFracture['objFracture'] = formValues;
    dispatch(updateHistoryMedical(objFracture, history));
  };

  const [responseDataHistorial, setResponseDataHistorial] = useState();
  useEffect(() => {
    fetch(`${CONECTION}api/get-all-historial`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'x-auth-token': localStorage.getItem('refreshToken'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setResponseDataHistorial(data);
          setFormValues({
            ...formValues,
            covid: data.covid,
            transplantes: data.transplantes,
            cirujias: data.cirujias,
            alergias: data.alergias,
            discapacidad: data.discapacidad,
            transplantes: data.transplantes,
            other: data.other,
            sangre: data.sangre,
            fracturas: data.fracturas,
          });
        }
      });
  }, []);

  useEffect(() => {
    console.log(formValues);
    switch (activeIndex) {
      case 0:
        if (formValues.covid) {
          setIsValidIndex(true);
        } else setIsValidIndex(false);
        break;
      case 1:
        if (formValues.cirujias) {
          setIsValidIndex(true);
        } else setIsValidIndex(false);
        break;
      case 2:
        if (formValues.fracturas) {
          setIsValidIndex(true);
        } else setIsValidIndex(false);
        break;
      case 3:
        if (formValues.sangre) {
          setIsValidIndex(true);
        } else setIsValidIndex(false);
        break;
      case 4:
        if (formValues.alergias) {
          setIsValidIndex(true);
        } else setIsValidIndex(false);
        break;
      case 5:
        if (formValues.discapacidad) {
          setIsValidIndex(true);
        } else setIsValidIndex(false);
        break;
      case 6:
        if (formValues.other) {
          setIsValidIndex(true);
        } else setIsValidIndex(false);
        break;
      case 7:
        if (formValues.transplantes) {
          setIsValidIndex(true);
        } else setIsValidIndex(false);
        break;
      default:
        break;
    }
  }, [activeIndex, formValues]);

  useEffect(() => {
    console.log(formValues)
  }, [formValues])

  return (
    <Grid centered className="slider historial">
      <Grid.Row>
        {/* <h1 className={`title ${titleInfoBasic ? 'hidden-title' : ''}`}>Información Básica</h1> */}
        <Swiper
          spaceBetween={55}
          slidesPerView={1}
          allowSlideNext={isValidIndex}
          navigation
          pagination={{ clickable: false }}
          // scrollbar={{ draggable: true }}
          onSlideChange={(e) => setActiveIndex(e.activeIndex)}
          className="slider-content"
          simulateTouch={false}>
          {records.map((record, index) => (
            <SwiperSlide data-hash="slide1" key={index}>
              <SliderAntecedentesComponent {...record} getValue={(e) => {
                setFormValues({ ...formValues, ...e });

              }}
                objResponse={responseDataHistorial}
              />
            </SwiperSlide>
          ))}
          {relativeRecords.map((relativeRecord, index) => (
            <SwiperSlide data-hash="slide1" key={index}>
              <SliderFamiliaresComponent {...relativeRecord} />
            </SwiperSlide>
          ))}
          <SwiperSlide style={{ position: 'relative' }} data-hash="slide10">
          <Container>
            <h1 className="title">Historial Médico</h1>
            <h3 className="subtitle-record"></h3>
            <Grid centered className="resume">
              <Grid.Row>
                <Grid.Column width={3} className="icon">
                  <Virus />
                </Grid.Column>
                <Grid.Column width={4} verticalAlign="middle">
                  <Grid.Row>
                    <h3 className="subtitle">Covid 19</h3>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column verticalAlign="middle" width={6}>
                    <Grid.Row className="question">Medicamentos tomados</Grid.Row>
                      <Grid.Row className="answer">Paracetamol</Grid.Row>
                      <Grid.Row className="answer">Paracetamol</Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column width={4} verticalAlign="middle" className="right">
                  <Grid.Row>
                    <Grid.Column verticalAlign="middle" width={3}>
                    <Grid.Row className="question">Fecha de contagio</Grid.Row>
                      <Grid.Row className="answer">1 de diciembre del 2020</Grid.Row>
                      <Grid.Row className="answer">12 de octubre del 2020</Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column className="edit" verticalAlign="middle" width={2}>
                  <label>
                    <Icon
                    name="pencil alternate"
                    size="small"
                    />
                    Editar
                  </label>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                  <Grid.Column width={13} className="line"></Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3} className="icon">
                  <Bisturi />
                </Grid.Column>
                <Grid.Column width={4} verticalAlign="middle">
                  <Grid.Row>
                    <h3 className="subtitle">Cirugías</h3>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column verticalAlign="middle" width={6}>
                    <Grid.Row className="question">Tipo de cirugía</Grid.Row>
                      <Grid.Row className="answer">Paracetamol</Grid.Row>
                      <Grid.Row className="answer">Paracetamol</Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column width={4} verticalAlign="middle" className="right">
                  <Grid.Row>
                    <Grid.Column verticalAlign="middle" width={3}>
                    <Grid.Row className="question">Fecha de cirugía</Grid.Row>
                      <Grid.Row className="answer">1 de diciembre del 2020</Grid.Row>
                      <Grid.Row className="answer">12 de octubre del 2020</Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column className="edit" verticalAlign="middle" width={2}>
                  <label>
                    <Icon
                    name="pencil alternate"
                    size="small"
                    />
                    Editar
                  </label>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                  <Grid.Column width={13} className="line"></Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3} className="icon">
                  <Fractura />
                </Grid.Column>
                <Grid.Column width={4} verticalAlign="middle">
                  <Grid.Row>
                    <h3 className="subtitle">Fracturas</h3>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column verticalAlign="middle" width={6}>
                    <Grid.Row className="question">Tipo de fractura</Grid.Row>
                      <Grid.Row className="answer">Paracetamol</Grid.Row>
                      <Grid.Row className="answer">Paracetamol</Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column width={4} verticalAlign="middle" className="right">
                  <Grid.Row>
                    <Grid.Column verticalAlign="middle" width={3}>
                    <Grid.Row className="question">Fecha de fractura</Grid.Row>
                      <Grid.Row className="answer">1 de diciembre del 2020</Grid.Row>
                      <Grid.Row className="answer">12 de octubre del 2020</Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column className="edit" verticalAlign="middle" width={2}>
                  <label>
                    <Icon
                    name="pencil alternate"
                    size="small"
                    />
                    Editar
                  </label>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                  <Grid.Column width={13} className="line"></Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3} className="icon">
                  <UnidadSangre />
                </Grid.Column>
                <Grid.Column width={4} verticalAlign="middle">
                  <Grid.Row>
                    <h3 className="subtitle">Transfusiones</h3>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column verticalAlign="middle" width={6}>
                    <Grid.Row className="question">Cantidad de unidades</Grid.Row>
                      <Grid.Row className="answer">Paracetamol</Grid.Row>
                      <Grid.Row className="answer">Paracetamol</Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column width={4} verticalAlign="middle" className="right">
                  <Grid.Row>
                    <Grid.Column verticalAlign="middle" width={3}>
                    <Grid.Row className="question">Fecha de tranfusión</Grid.Row>
                      <Grid.Row className="answer">1 de diciembre del 2020</Grid.Row>
                      <Grid.Row className="answer">12 de octubre del 2020</Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column className="edit" verticalAlign="middle" width={2}>
                  <label>
                    <Icon
                    name="pencil alternate"
                    size="small"
                    />
                    Editar
                  </label>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                  <Grid.Column width={13} className="line"></Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3} className="icon">
                  <Alergias />
                </Grid.Column>
                <Grid.Column width={4} verticalAlign="middle">
                  <Grid.Row>
                    <h3 className="subtitle">Alergias</h3>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column verticalAlign="middle" width={6}>
                    <Grid.Row className="question">Tipo de alergia</Grid.Row>
                      <Grid.Row className="answer">Paracetamol</Grid.Row>
                      <Grid.Row className="answer">Paracetamol</Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column width={4} verticalAlign="middle" className="right">
                  <Grid.Row>
                    <Grid.Column verticalAlign="middle" width={3}>
                    <Grid.Row className="question">Fecha de diagnóstico</Grid.Row>
                      <Grid.Row className="answer">1 de diciembre del 2020</Grid.Row>
                      <Grid.Row className="answer">12 de octubre del 2020</Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column className="edit" verticalAlign="middle" width={2}>
                  <label>
                    <Icon
                    name="pencil alternate"
                    size="small"
                    />
                    Editar
                  </label>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                  <Grid.Column width={13} className="line"></Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3} className="icon">
                  <Silla />
                </Grid.Column>
                <Grid.Column width={4} verticalAlign="middle">
                  <Grid.Row>
                    <h3 className="subtitle">Discapacidades</h3>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column verticalAlign="middle" width={6}>
                    <Grid.Row className="question">Tipo de discapacidad</Grid.Row>
                      <Grid.Row className="answer">Paracetamol</Grid.Row>
                      <Grid.Row className="answer">Paracetamol</Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column width={4} verticalAlign="middle" className="right">
                  <Grid.Row>
                    <Grid.Column verticalAlign="middle" width={3}>
                    <Grid.Row className="question">Fecha de diagnóstico</Grid.Row>
                      <Grid.Row className="answer">1 de diciembre del 2020</Grid.Row>
                      <Grid.Row className="answer">12 de octubre del 2020</Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column className="edit" verticalAlign="middle" width={2}>
                  <label>
                    <Icon
                    name="pencil alternate"
                    size="small"
                    />
                    Editar
                  </label>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                  <Grid.Column width={13} className="line"></Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3} className="icon">
                  <Protesis />
                </Grid.Column>
                <Grid.Column width={4} verticalAlign="middle">
                  <Grid.Row>
                    <h3 className="subtitle">Características</h3>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column verticalAlign="middle" width={6}>
                    <Grid.Row className="question">Tipo de característica</Grid.Row>
                      <Grid.Row className="answer">Paracetamol</Grid.Row>
                      <Grid.Row className="answer">Paracetamol</Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column width={4} verticalAlign="middle" className="right">
                  <Grid.Row>
                    <Grid.Column verticalAlign="middle" width={3}>
                    <Grid.Row className="question">Fecha de diagnóstico</Grid.Row>
                      <Grid.Row className="answer">1 de diciembre del 2020</Grid.Row>
                      <Grid.Row className="answer">12 de octubre del 2020</Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column className="edit" verticalAlign="middle" width={2}>
                  <label>
                    <Icon
                    name="pencil alternate"
                    size="small"
                    />
                    Editar
                  </label>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                  <Grid.Column width={13} className="line"></Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3} className="icon">
                  <IconDonador />
                </Grid.Column>
                <Grid.Column width={4} verticalAlign="middle">
                  <Grid.Row>
                    <h3 className="subtitle">Transplantes</h3>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column verticalAlign="middle" width={6}>
                    <Grid.Row className="question">Tipo de transplante</Grid.Row>
                      <Grid.Row className="answer">Paracetamol</Grid.Row>
                      <Grid.Row className="answer">Paracetamol</Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column width={4} verticalAlign="middle" className="right">
                  <Grid.Row>
                    <Grid.Column verticalAlign="middle" width={3}>
                    <Grid.Row className="question">Fecha de transplante</Grid.Row>
                      <Grid.Row className="answer">1 de diciembre del 2020</Grid.Row>
                      <Grid.Row className="answer">12 de octubre del 2020</Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column className="edit" verticalAlign="middle" width={2}>
                  <label>
                    <Icon
                    name="pencil alternate"
                    size="small"
                    />
                    Editar
                  </label>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                  <Grid.Column width={13} className="line"></Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3} className="icon">
                  <Madre />
                </Grid.Column>
                <Grid.Column width={3} verticalAlign="middle">
                  <Grid.Row>
                    <h3 className="subtitle">Madre</h3>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column verticalAlign="middle" width={6}>
                    <Grid.Row className="question">Enfermedad de madre</Grid.Row>
                      <Grid.Row className="answer">Artritis</Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column width={3} className="icon">
                  <Padre />
                </Grid.Column>
                <Grid.Column width={2} verticalAlign="middle">
                  <Grid.Row>
                    <h3 className="subtitle">Padre</h3>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column verticalAlign="middle" width={6}>
                    <Grid.Row className="question">Enfermedad de padre</Grid.Row>
                      <Grid.Row className="answer">Artritis</Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column className="edit" verticalAlign="middle" width={2}>
                  <label>
                    <Icon
                    name="pencil alternate"
                    size="small"
                    />
                    Editar
                  </label>
                </Grid.Column>

                {/* <Grid.Column width={4} verticalAlign="middle" className="right">
                  <Grid.Row>
                    <Grid.Column verticalAlign="middle" width={3}>
                    <Grid.Row className="question">Fecha de transplante</Grid.Row>
                      <Grid.Row className="answer">1 de diciembre del 2020</Grid.Row>
                      <Grid.Row className="answer">12 de octubre del 2020</Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column className="edit" verticalAlign="middle" width={2}>
                  <label>
                    <Icon
                    name="pencil alternate"
                    size="small"
                    />
                    Editar
                  </label>
                </Grid.Column> */}
              </Grid.Row>
              <Grid.Row>
                  <Grid.Column width={13} className="line"></Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={14}>
                  <Button
                    className="button-info-basic"
                    onClick={saveAndContinue}>
                    Guardar y Continuar
                  </Button>

                </Grid.Column>
              </Grid.Row>
            </Grid>

          </Container>
            {/* <div className="info-basic">
              <Grid centered columns={16}>
                <Grid.Column computer={14} tablet={12} mobile={16}>
                  <Grid.Row>
                    <Button
                      className="button-info-basic"
                      onClick={saveAndContinue}>
                      Guardar y Continuar
                    </Button>
                  </Grid.Row>
                </Grid.Column>
              </Grid>
            </div> */}
          </SwiperSlide>
        </Swiper>
      </Grid.Row>
    </Grid>
  );
}
