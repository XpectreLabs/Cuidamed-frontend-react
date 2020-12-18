import React, { useState, useEffect } from "react";
import { Grid, Container, Icon, Button, Input } from "semantic-ui-react";

import { Menstruacion, Embarazada, Menopausia } from "../../images/icons/icons";

// import Swiper core and required components
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  HashNavigation,
} from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory } from 'react-router-dom';
import { updateHistoryMedical } from '../../redux/actions/UserAction';
import { useDispatch } from 'react-redux';

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import { CustomInput } from "../inputsCustom/CustomInput";
import Date from "../inputsCustom/Date";
import { SelectCustom } from '../inputsCustom/Select/Select';

// import "./Slider.scss"
// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function SliderGinecologia() {

  const [isValidIndex, setIsValidIndex] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [formValues, setFormValues] = useState({});
  const [isPregnant, setIsPregnant] = useState(false);
  const [menopause, setMenopause] = useState(false);
  const [menstruationAge, setMenstruationAge] = useState(false);
  const period = [
    { key: 'regular', value: 'Regular', text: 'Regular' },
    { key: 'iregular', value: 'Iregular', text: 'Iregular' },
  ];

  const handleCounter = (e) => {

    if (e > 0) {
      setMenstruationAge(true);
    } else setMenstruationAge(false);
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const saveAndContinue = (e) => {
    e.preventDefault();
    dispatch(updateHistoryMedical(formValues, history));
  };

  useEffect(() => {
    console.log(formValues);
    switch (activeIndex) {
      case 0:
        if (formValues) {
          setIsValidIndex(true);
        } else setIsValidIndex(false);
        break;
      case 1:
        if (formValues) {
          setIsValidIndex(true);
        } else setIsValidIndex(false);
        break;
      case 2:
        if (formValues) {
          setIsValidIndex(true);
        } else setIsValidIndex(false);
        break;
      case 3:
        if (formValues) {
          setIsValidIndex(true);
        } else setIsValidIndex(false);
        break;
      case 4:
        if (formValues) {
          setIsValidIndex(true);
        } else setIsValidIndex(false);
        break;
      case 5:
        if (formValues) {
          setIsValidIndex(true);
        } else setIsValidIndex(false);
        break;
      case 6:
        if (formValues) {
          setIsValidIndex(true);
        } else setIsValidIndex(false);
        break;
      case 7:
        if (formValues.Transplante) {
          setIsValidIndex(true);
        } else setIsValidIndex(false);
        break;
      default:
        break;
    }
  }, [activeIndex, formValues]);

  function Pregnant(props) {
    let isPregnant = props.ispregnant;
    if (isPregnant) {
      return (
        <>
          <Grid.Row>
            <Grid.Column width={5}>
              <CustomInput placeholder="Número de embarazos" type="number" defaultValue="1" />
            </Grid.Column>
            <Grid.Column width={5}>
              <CustomInput placeholder="Número de partos" type="number" defaultValue="0" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={5}>
              <CustomInput placeholder="Número de cesareas" type="number" defaultValue="0" />
            </Grid.Column>
            <Grid.Column width={5}>
              <CustomInput placeholder="Número de abortos" type="number" defaultValue="0" />
            </Grid.Column>
          </Grid.Row>
        </>
      );
    }

    return null;
  }

  function Menopause(props) {
    let menopause = props.menopause;
    if (menopause) {
      return (
        <Grid.Row>
          <Grid.Column width={5}>
            <Date placeholder="Fecha de inicio" id="menopause" />
          </Grid.Column>
        </Grid.Row>
      );
    }

    return null;
  }

  function Menstruation(props) {
    let menstruation = props.menstruation;
    if (menstruation) {
      return (
        <Grid.Row>
          <Grid.Column width={6}>
            <SelectCustom
              placeholder="Tipo de periodo"
              dataOptions={period}
            />
          </Grid.Column>
        </Grid.Row>
      );
    } else {
      return (
        <Grid.Row className="answers">
          <Grid.Column width={4}>
            <Button id="vacunaNo" type="radio">
              Ya no la tengo
                    </Button>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button id="vacunaNo" type="radio" name="vacuna">
              No la tengo
                    </Button>
          </Grid.Column>
        </Grid.Row>
      );
    }


    return null;
  }

  const slide = (s) => {
    var mySwiper = document.querySelector('.swiper-container').swiper;
    mySwiper.slideTo(s);
  };


  return (
    <Grid centered className="slider historial">
      <Grid.Row>
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
          <SwiperSlide>
            <Container className="gynecology">
              <Grid centered>
                <Grid.Row>
                  <h1 className="title">Historial Médico</h1>
                </Grid.Row>
                <Grid.Row className="subtitle">
                  <h2>Ginecología</h2>
                </Grid.Row>
                <Grid.Row className={`${menstruationAge ? 'small-icon' : ''}`}>
                  <Menstruacion />
                </Grid.Row>
                <Grid.Row>
                  <h3 className="question">
                    ¿Cual fue la edad de tu primera menstruación?
                  </h3>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={6}>
                    <CustomInput
                      placeholder="Edad de primera menstruación"
                      type="number"
                      setValue={(e) => handleCounter(e)}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Menstruation menstruation={menstruationAge} />
                {/* <Grid.Row className="answers">
                  <Grid.Column width={4}>
                    <Button id="vacunaNo" type="radio">
                      Ya no la tengo
                    </Button>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Button id="vacunaNo" type="radio" name="vacuna">
                      No la tengo
                    </Button>
                  </Grid.Column>
                </Grid.Row> */}
              </Grid>
            </Container>
          </SwiperSlide>
          <SwiperSlide>
            <Container className="gynecology">
              <Grid centered>
                <Grid.Row>
                  <h1 className="title">Historial Médico</h1>
                </Grid.Row>
                <Grid.Row className="subtitle">
                  <h2>Ginecología</h2>
                </Grid.Row>

                <Grid.Row className={`${menopause ? 'small-icon' : ''}`}>
                  <Menopausia />
                </Grid.Row>
                <Grid.Row>
                  <h3 className="question">¿Tienes la menopausia?</h3>
                </Grid.Row>
                <Grid.Row className="answers menopause">
                  <Grid.Column width={3}>
                    <Button type="radio" onClick={() => setMenopause(true)}>Si</Button>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Button type="radio" name="vacuna" onClick={() => setMenopause(false)}>
                      No
                    </Button>
                  </Grid.Column>
                </Grid.Row>
                <Menopause menopause={menopause} />
              </Grid>
            </Container>
          </SwiperSlide>
          <SwiperSlide>
            <Container className="gynecology">
              <Grid centered>
                <Grid.Row>
                  <h1 className="title">Historial Médico</h1>
                </Grid.Row>
                <Grid.Row className="subtitle">
                  <h2>Ginecología</h2>
                </Grid.Row>
                <Grid.Row className={`${isPregnant ? 'small-icon' : ''}`}>
                  <Embarazada />
                </Grid.Row>
                <Grid.Row>
                  <h3 className="question">¿Has estado embarazada?</h3>
                </Grid.Row>
                <Grid.Row className="answers menopause">
                  <Grid.Column width={3}>
                    <Button type="radio" onClick={() => setIsPregnant(true)}>Si</Button>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Button type="radio" name="vacuna" onClick={() => setIsPregnant(false)}>
                      No
                    </Button>
                  </Grid.Column>
                </Grid.Row>
                <Pregnant ispregnant={isPregnant} />
              </Grid>
            </Container>
          </SwiperSlide>
          <SwiperSlide style={{ position: 'relative' }} data-hash="slide10">
            {/* <div className="resume"> */}
            <Container>
              <Grid centered columns={16} className="resume">
                <Grid.Row>
                  <h1 className="title">Historial Médico</h1>
                </Grid.Row>
                <Grid.Row className="subtitle">
                  <h2>Ginecología</h2>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={3} className="icon">
                    <Menstruacion />
                  </Grid.Column>
                  <Grid.Column verticalAlign="middle" width={4}>
                    <Grid.Row className="question">Edad de la primera menstruación</Grid.Row>
                    <Grid.Row className="answer">{menstruationAge}15 años</Grid.Row>
                  </Grid.Column>
                  <Grid.Column verticalAlign="middle" width={3}>
                    <Grid.Row className="question">Tipo de periodo</Grid.Row>
                    <Grid.Row className="answer">Regular</Grid.Row>
                  </Grid.Column>
                  <Grid.Column className="edit" verticalAlign="middle" width={2}>
                    <label onClick={() => slide(0)}>
                      <Icon
                      name="pencil alternate"
                      size="small"
                      />
                      Editar
                    </label>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={3} className="icon">
                    <Menopausia />
                  </Grid.Column>
                  <Grid.Column verticalAlign="middle"  width={4}>
                    <Grid.Row className="question">Menopausia</Grid.Row>
                    <Grid.Row className="answer">{menopause ? 'Si' : 'No'}</Grid.Row>
                  </Grid.Column>
                  <Grid.Column verticalAlign="middle" width={3}>
                    <Grid.Row className="question">Fecha de inicio</Grid.Row>
                    <Grid.Row className="answer">2004</Grid.Row>
                  </Grid.Column>
                  <Grid.Column className="edit" verticalAlign="middle" width={2}>
                    <label onClick={() => slide(1)}>
                      <Icon
                      name="pencil alternate"
                      size="small"
                      />
                      Editar
                    </label>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={3} className="icon">
                    <Embarazada />
                  </Grid.Column>
                  <Grid.Column verticalAlign="middle" width={4}>
                    <Grid.Row className="question">Num. de embarazos</Grid.Row>
                    <Grid.Row className="answer">2</Grid.Row>
                    <Grid.Row className="question">Num. de embarazos</Grid.Row>
                    <Grid.Row className="answer">2</Grid.Row>
                  </Grid.Column>
                  <Grid.Column verticalAlign="middle" width={3}>
                    <Grid.Row className="question">Num. partos</Grid.Row>
                    <Grid.Row className="answer">0</Grid.Row>
                    <Grid.Row className="question" >Num. partos</Grid.Row>
                    <Grid.Row className="answer">0</Grid.Row>
                  </Grid.Column>
                  <Grid.Column className="edit" verticalAlign="middle" width={2}>
                    <label onClick={() => slide(2)}>
                      <Icon
                      name="pencil alternate"
                      size="small"
                      />
                      Editar
                    </label>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="save">
                  <Grid.Column width={13}>
                    <Button
                      className="button-info-basic"
                      onClick={saveAndContinue}>
                      Guardar y Continuar
                    </Button>

                  </Grid.Column>
                </Grid.Row>
              </Grid>

            </Container>
            {/* </div> */}
          </SwiperSlide>
        </Swiper>
      </Grid.Row>
    </Grid>
  );
}
