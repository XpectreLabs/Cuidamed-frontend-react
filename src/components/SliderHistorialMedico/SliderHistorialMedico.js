import React, { useState, useEffect } from 'react';
import { Grid, Container, Icon, Button, Input } from 'semantic-ui-react';

// import {
//   Abuelo,
//   Abuela,
//   Alergias,
//   Bisturi,
//   Embarazada,
//   Fractura,
//   Hombre,
//   Madre,
//   Mujer,
//   Padre,
//   Protesis,
//   Silla,
//   UnidadSangre,
//   Virus,
// } from "../../images/icons/icons";

import { records } from './data';

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

// import "./Slider.scss"
// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function SliderHistorialMedico() {
  const [activeIndex, setActiveIndex] = useState(0);

  const [formValues, setFormValues] = useState({
    vacunado: '',
  });

  const [isShow, setIsShow] = useState({});

  useEffect(() => {
    switch (activeIndex) {
      case 0:
        setIsShow(false);
        break;
      case 1:
        setIsShow(true);
        break;
    }
    console.log('active index' + activeIndex);
  }, [activeIndex]);

  return (
    <Grid centered className="slider historial">
      <Grid.Row>
        {/* <h1 className={`title ${titleInfoBasic ? 'hidden-title' : ''}`}>Información Básica</h1> */}
        <Swiper
          spaceBetween={55}
          slidesPerView={1}
          navigation
          pagination={{ clickable: false }}
          // scrollbar={{ draggable: true }}
          onSlideChange={(e) => setActiveIndex(e.activeIndex)}
          className="slider-content"
          simulateTouch={false}>
          {records.map((record, index) => (
            <SwiperSlide data-hash="slide1" key={index}>
              <SliderAntecedentesComponent {...record} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid.Row>
    </Grid>
  );
}
