import React, { useState, useEffect } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

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
            <div className="info-basic">
              <Grid centered columns={16}>
                <Grid.Column computer={14} tablet={12} mobile={16}>
                  {/* <h1
                    className={`title ${titleInfoBasic ? '' : 'hidden-title'}`}>
                    Información Básica
                  </h1> */}
                  <Grid.Row>
                    <Button
                      className="button-info-basic"
                      onClick={saveAndContinue}>
                      Guardar y Continuar
                    </Button>
                  </Grid.Row>
                </Grid.Column>
              </Grid>
            </div>
          </SwiperSlide>
        </Swiper>
      </Grid.Row>
    </Grid>
  );
}
