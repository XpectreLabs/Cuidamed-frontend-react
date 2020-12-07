import React, { useState, useEffect } from "react";
import { Grid, Container, Icon, Button, Input } from "semantic-ui-react";

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

import { records } from "./data";

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

import { CustomInput } from '../inputsCustom/CustomInput';
import  Date from '../inputsCustom/Date'

import Question from '../Question';

// import "./Slider.scss"
// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function SliderHistorialMedico() {

  const [activeIndex, setActiveIndex] = useState(0);

  const [formValues, setFormValues] = useState({
    vacunado: '',
  });

  const [vacunasNumber, setvacunasNumber] = useState();
  const [inputNumbers, setInputNumbers] = useState({
    inputNumberCovid: '',
  });
  const vacunasQuantity = [];
  const [vacunasInput, setVacunasInput] = useState();
  const [totalVacunas, setTotalVacunas] = useState([]);

  const [hasRecord, setHasRecord] = useState(false);
  const [isShow, setIsShow] = useState({
    
  });

  const handleInputsVacunas = (e, data) => {
    if (e > 0 && e < 4) {
      for (let index = 0; index < e; index++) {
        vacunasQuantity.push(
          <Grid.Row className="vacunas__title-description">
            <Grid.Column width={5}>
              <CustomInput
                placeholder={data.placeholderAnswer}
                type="text"
                setValue={(e) => {}}
                onblur={(e) =>
                  setTotalVacunas((totalVacunas) => [...totalVacunas, e])
                }
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <Date placeholder={data.placeholderDate}/> 
            </Grid.Column>
          </Grid.Row>
        );
      }
      setVacunasInput(vacunasQuantity);
    } else {
      setVacunasInput([]);
      vacunasQuantity.length = 0;
    }
  };

  useEffect(() => {
    switch(activeIndex) {
      case 0:
        setIsShow(false);
      break;
      case 1:
        setIsShow(true);
      break;
    }
    console.log("active index"+ activeIndex);
  }, [activeIndex])

  const isVacunado = (bool, data) => {
    switch (data.id) {
      case 1: 
        setInputNumbers({
          ...inputNumbers, 
          inputNumberCovid:  
          <>
            <Grid.Row className="vacunas__record">
              <div className="quantity">
                <CustomInput
                  placeholder={data.placeholderNumber}
                  type="number"
                  setValue={(e) => handleInputsVacunas(e, data)}
                />
              </div>
            </Grid.Row>
          </>
        });
        break;
      default: 
      break;

    }
    // if (bool) {
      // setFormValues({ ...formValues, vacunado: true });
      // setvacunasNumber(
        
      //   <>
      //     <Grid.Row className="vacunas__record">
      //       <div className="quantity">
      //         <CustomInput
      //           placeholder={data.placeholderNumber}
      //           type="number"
      //           setValue={(e) => handleInputsVacunas(e, data)}
      //         />
      //       </div>
      //     </Grid.Row>
      //   </>
      // );
    // } else {
    //   // setFormValues({ ...formValues, vacunado: false });
    //   setvacunasNumber('');
    //   setVacunasInput([]);
    //   vacunasQuantity.length = 0;
    // }
  };

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
          simulateTouch={false}
        >
          {records.map((record, index) => (
            <SwiperSlide data-hash="slide1" key={index}>
              <Container>
                <h1 className="title">Historial Médico</h1>
                <h3 className="subtitle-record">{record.subtitle}</h3>
                <Grid centered className="records">
                  <Grid.Row className={ `${hasRecord ? 'small-svg' : ''}`}>{record.icon}</Grid.Row>
                  <Grid.Row>
                    <h3 className="question">{record.question}</h3>
                  </Grid.Row>
                  <Grid.Row className="answers">
                    <Grid.Column width={3}>
                    <Button
                        id="vacunaNo"
                        type="radio"
                        name="vacuna"
                        readOnly=""
                        tabIndex="0"
                        onClick={() => setHasRecord(true)}
                      >Si</Button>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <Button
                        id="vacunaNo"
                        type="radio"
                        name="vacuna"
                        readOnly=""
                        tabIndex="0"
                        onClick={() => setHasRecord(false)}
                      >No</Button>
                    </Grid.Column>
                  </Grid.Row>
                  {/* <div style={{display: `${isShow ? 'none' : ''}`}}> */}
                    {inputNumbers.inputNumberCovid}
                    {vacunasInput}
                  {/* </div> */}
                  {/* <Grid.Row className="answers">
                    <Grid.Column width={3}>
                      <Button>Si</Button>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <Button>No</Button>
                    </Grid.Column>
                  </Grid.Row> */}
                  <Question placeholderAnswer={record.question} placeholderDate = {record.placeholderDate} placeholderNumber={record.placeholderNumber} hasRecord = {hasRecord}  />
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
