import React, { useState, useEffect } from 'react';
import { Grid, Container, Icon, Button, Input } from 'semantic-ui-react';

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
} from "../../images/icons/icons";

import { records, relativeRecords } from './data';

// import Swiper core and required components
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  HashNavigation,
} from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import { CustomInput } from '../inputsCustom/CustomInput';
import Date from '../inputsCustom/Date';

import Question from '../Question';
import SliderAntecedentesComponent from './SliderAntecedentesComponent';
import SliderFamiliaresComponent from './SliderFamiliaresComponent';

// import "./Slider.scss"
// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function SliderHistorialMedico() {

  const [activeIndex, setActiveIndex] = useState(0);

  const [formValues, setFormValues] = useState([
    { name: {} },
  ]);
  const [isValidIndex, setIsValidIndex] = useState(false);


  useEffect(() => {
    console.log(formValues);
    switch (activeIndex) {
      case 0:
        // if (formValues.otros != '' && formValues.otros != undefined) {
        //   setIsValidIndex(true);
        // } else setIsValidIndex(false);
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
      default:
        break;
    }
  }, [activeIndex, formValues]);



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
              <SliderAntecedentesComponent
                {...record}
                setValue={(e) => {
                  setFormValues((values) => {
                    const updateValue = values.map((value, indexd) => {
                      return index === indexd ? { ...value, e } : value
                    }
                    );
                    console.log(updateValue);
                    return updateValue;
                  })
                }} />
            </SwiperSlide>
          ))}
          {relativeRecords.map((relativeRecord, index) => (
            <SwiperSlide data-hash="slide1" key={index}>
              <SliderFamiliaresComponent {...relativeRecord} />
            </SwiperSlide>
          ))}
          {/* <SwiperSlide>
            <Container>
            <h1 className="title">Historial Médico</h1>
            <h3 className="subtitle-record">Antecedentes familiares</h3>
            <Grid centered className="records">
            <Grid.Row>
              <h3 className="question">Enfermedades de los abuelos paternos</h3>
            </Grid.Row>
            <Grid.Row className="relatives">
              <Grid.Column width={6}>
                <Abuela />
                <Grid.Row className="relatives__answers">
                  <Grid.Column >
                    <Button className="button__main">Con cuenta Cuidamed</Button>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="relatives__answers">
                  <Grid.Column >
                    <Button className="button__main">Sin cuenta cuidamed</Button>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="relatives__answers">
                  <Grid.Column >
                    <Button className="button__secondary">No tengo información</Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={6}>
                <Abuelo />
                <Grid.Row className="relatives__answers">
                  <Grid.Column >
                    <Button className="button__main">Con cuenta Cuidamed</Button>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="relatives__answers">
                  <Grid.Column >
                    <Button className="button__main">Sin cuenta cuidamed</Button>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="relatives__answers">
                  <Grid.Column >
                    <Button className="button__secondary">No tengo información</Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
            </Grid>
            </Container>
          </SwiperSlide> */}
        </Swiper>
      </Grid.Row>
    </Grid>
  );
}
