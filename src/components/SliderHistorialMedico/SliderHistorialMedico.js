import React, { useState, useEffect } from "react";
import { Grid, Container, Icon, Button } from "semantic-ui-react";

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
} from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

// import "./Slider.scss"
// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function SliderHistorialMedico() {
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
          //   onSlideChange={(e) => setActiveIndex(e.activeIndex)}
          className="slider-content"
          simulateTouch={false}
        >
             {records.map((record, index) => (
                 <SwiperSlide data-hash="slide1" key={index}>
                 <Container>
                   <h1 className="title">Historial Médico</h1>
                    <h3 className="subtitle-record">{record.subtitle}</h3>
                   <Grid centered>
                     <Grid.Row>
                       {record.icon}
                     </Grid.Row>
                     <Grid.Row>
                        <h3 className="question">{record.question}</h3>
                     </Grid.Row>
                     <Grid.Row className="answers">
                       <Grid.Column width={3}>
                         <Button>Si</Button>
                       </Grid.Column>
                       <Grid.Column width={3}>
                         <Button>No</Button>
                       </Grid.Column>
                     </Grid.Row>
                   </Grid>
                 </Container>
               </SwiperSlide>
                ))}

          {/* <SwiperSlide data-hash="slide1">
            <Container>
              <h1 className="title">Historial Médico</h1>
              <h3 className="subtitle-record">Covid 19</h3>
              <Grid name="covid" centered>
                <Grid.Row>
                  <Virus />
                </Grid.Row>
                <Grid.Row>
                  <h3 className="question">
                    ¿Alguna ves has tenido coronavirus?
                  </h3>
                </Grid.Row>
                <Grid.Row className="answers">
                  <Grid.Column width={3}>
                    <Button>Si</Button>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Button>No</Button>
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
