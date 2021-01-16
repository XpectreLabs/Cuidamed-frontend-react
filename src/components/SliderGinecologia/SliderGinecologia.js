import React, { useState, useEffect } from "react";
import { Grid, Container, Icon, Button } from "semantic-ui-react";

import { Menstruacion, Embarazada, Menopausia } from "../../images/icons/icons";

// import Swiper core and required components
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory } from 'react-router-dom';
import { updateGinecologia } from '../../redux/actions/UserAction';
import { useDispatch } from 'react-redux';

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import { CustomInput } from "../inputsCustom/CustomInput";
import Date from "../inputsCustom/Date";
import { SelectCustom } from '../inputsCustom/Select/Select';
import { CONECTION } from '../../conection';

// import "./Slider.scss"
// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function SliderGinecologia() {

  useEffect(() => {
    // fetch(`${CONECTION}api/ginecologia`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //     'x-auth-token': localStorage.getItem('refreshToken'),
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.data) {
    //       const { has_menstruation, menopause, embarazos } = data.data[0];
    //       let meno = "";
    //       if (menopause === 'NO') {
    //         meno = false;
    //       } else if (menopause === 'YES') {
    //         meno = true;
    //       }
    //       if (embarazos === 0) {
    //         setIsPregnant(false);
    //       } else if (embarazos > 0) {
    //         setIsPregnant(true);
    //       }
    //       setMenopause(meno);
    //       setFormValues({
    //         ...formValues,
    //         has_menstruation,
    //         menopause: menopause
    //       });
    //     }
    //   });
  }, [])

  const [isValidIndex, setIsValidIndex] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [formValues, setFormValues] = useState({});
  const [isPregnant, setIsPregnant] = useState();
  const [menopause, setMenopause] = useState();
  const [menstruationAge, setMenstruationAge] = useState(false);
  const period = [
    { key: 're1', value: 'REGULAR', text: 'REGULAR' },
    { key: 'ire2', value: 'IRREGULAR', text: 'IRREGULAR' },
  ];

  const handleCounter = (e) => {
    console.log(e);
    if (e > 0) {
      console.log('entramos aquí chavo');
      setFormValues({ ...formValues, age_mestruation: e, has_menstruation: '' });
      setMenstruationAge(true);
    } else {
      setMenstruationAge(false);
      setFormValues({ ...formValues, age_mestruation: null });
    }

  };

  const dispatch = useDispatch();
  const history = useHistory();

  const saveAndContinue = (e) => {
    e.preventDefault();
    dispatch(updateGinecologia(formValues, history));
  };

  const { has_menstruation } = formValues;
  useEffect(() => {
    if (has_menstruation) {
      if (has_menstruation === "NOT_HAD") {
        document.getElementById('notHad').checked = true;
      } else {
        document.getElementById('notHave').checked = true;
      }
    }
    console.log(formValues);
    switch (activeIndex) {
      case 0:
        if (formValues) {
          setIsValidIndex(true);
          removeArrowNext();
          arrowNext();
        } else {
          setIsValidIndex(false)
          removeArrowNext();
        };
        break;
      case 1:
        if (formValues) {
          setIsValidIndex(true);
          removeArrowNext();
          arrowNext();
        } else {
          setIsValidIndex(false)
          removeArrowNext();
        };
        break;
      case 2:
        if (formValues) {
          setIsValidIndex(true);
          removeArrowNext();
          arrowNext();
        } else {
          setIsValidIndex(false)
          removeArrowNext();
        };
        break;
      case 3:
        if (formValues) {
          setIsValidIndex(true);
          removeArrowNext();
          arrowNext();
        } else {
          setIsValidIndex(false)
          removeArrowNext();
        };
        break;
      case 4:
        if (formValues) {
          setIsValidIndex(true);
          removeArrowNext();
          arrowNext();
        } else {
          setIsValidIndex(false)
          removeArrowNext();
        };
        break;
      case 5:
        if (formValues) {
          setIsValidIndex(true);
          removeArrowNext();
          arrowNext();
        } else {
          setIsValidIndex(false)
          removeArrowNext();
        };
        break;
      case 6:
        if (formValues) {
          setIsValidIndex(true);
          removeArrowNext();
          arrowNext();
        } else {
          setIsValidIndex(false)
          removeArrowNext();
        };
        break;
      case 7:
        if (formValues) {
          setIsValidIndex(true);
          removeArrowNext();
          arrowNext();
        } else {
          setIsValidIndex(false)
          removeArrowNext();
        };
        break;
      default:
        break;
    }
  }, [activeIndex, formValues]);

  function Pregnant() {
    //let isPregnant = props.ispregnant;
    if (isPregnant) {
      return (
        <>
          <Grid.Row>
            <Grid.Column width={5}>
              <CustomInput
                placeholder="Número de embarazos"
                type="number"
                // value={1}
                setValue={(e) => setFormValues({ ...formValues, embarazos: e })}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <CustomInput
                placeholder="Número de partos"
                type="number"
                // value="0"
                setValue={(e) => setFormValues({ ...formValues, partos: e })} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={5}>
              <CustomInput
                placeholder="Número de cesareas"
                type="number"
                // value="0"
                setValue={(e) => setFormValues({ ...formValues, cesarea: e })}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <CustomInput
                placeholder="Número de abortos"
                type="number"
                value="0"
                setValue={(e) => setFormValues({ ...formValues, abortos: e })}
              />
            </Grid.Column>
          </Grid.Row>
        </>
      );
    }

    return null;
  }

  function Menopause() {
    //let menopause = props.menopause;
    if (menopause) {
      return (
        <Grid.Row>
          <Grid.Column width={5}>
            <Date placeholder="Fecha de inicio" id="menopause"
              setValue={e => {
                setFormValues({ ...formValues, year_menopause: e });
              }}
            />
          </Grid.Column>
        </Grid.Row>
      );
    }

    return null;
  }

  function Menstruation() {
    //let menstruation = props.menstruation;
    if (menstruationAge) {
      return (
        <>
          <Grid.Row>
            <Grid.Column width={6}>
              <SelectCustom
                placeholder="Tipo de periodo"
                dataOptions={period}
                setValue={e => {
                  setFormValues({ ...formValues, kind_mestruation: e });
                }}
                value={formValues.kind_mestruation}
              />
            </Grid.Column>
          </Grid.Row>
        </>
      );
    } else {
      return (
        <Grid.Row className="answers">
          <Grid.Column width={5}>
            <input
              id="notHad"
              type="radio"
              name="menstruation"
              className="hidden"
              readOnly=""
              tabIndex="0"
            />
            <label
              htmlFor="notHad"
              className={'ui button'}
              onClick={(e) => {
                setFormValues({ ...formValues, has_menstruation: 'NOT_HAD' })
              }}
            >
              Ya no la tengo
            </label>
          </Grid.Column>
          <Grid.Column width={5}>
            <input
              id="notHave"
              type="radio"
              name="menstruation"
              className="hidden"
              readOnly=""
              tabIndex="0"
            />
            <label
              htmlFor='notHave'
              className={'ui button'}
              onClick={() => {
                setFormValues({ ...formValues, has_menstruation: 'NOT_HAVE' })
              }}
            >
              No la tengo
                    </label>
          </Grid.Column>
        </Grid.Row>
      );
    }


    return null;
  }

  const slide = (s) => {
    const mySwiper = document.querySelector('.swiper-container').swiper;
    mySwiper.slideTo(s);
  };

  const arrowNext = () => {
    const arrow = document.querySelector('.swiper-button-next');
    arrow.style.color = '#00a199';
    const button = document.createElement('button');
    button.textContent = 'Siguiente';
    button.classList.add('ui', 'button');
    const div = document.createElement('div');
    div.appendChild(button);
    div.classList.add('arrow');
    arrow.appendChild(div);
  }

  const removeArrowNext = () => {
    const arrow = document.querySelector('.swiper-button-next');

    if(arrow) {
      arrow.style.color = '#ffffff';
      while (arrow.firstChild) {
  
          arrow.removeChild(arrow.firstChild);
      }
      
    }

  }


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
                  <Grid.Column width={10}>
                    <CustomInput
                      placeholder="Edad de primera menstruación"
                      type="number"
                      setValue={(e) => handleCounter(e)}

                    />
                  </Grid.Column>
                </Grid.Row>
                {/* <Menstruation menstruation={menstruationAge} /> */}
                {Menstruation()}
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
                    <Button
                      className={menopause ? 'isChecked' : ''}
                      type="radio"
                      onClick={() => {
                        setMenopause(true);
                        setFormValues({ ...formValues, menopause: 'YES' });
                      }}>Si</Button>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Button
                      type="radio"
                      name="vacuna"
                      className={menopause === false ? 'isChecked' : ''}
                      onClick={() => {
                        setMenopause(false);
                        setFormValues({ ...formValues, menopause: 'NO' });
                      }}>
                      No
                    </Button>
                  </Grid.Column>
                </Grid.Row>
                {/* <Menopause menopause={menopause} /> */}
                {Menopause()}
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
                    <Button
                      className={isPregnant ? 'isChecked' : ''}
                      type="radio"
                      onClick={() => {
                        setIsPregnant(true);
                        setFormValues({ ...formValues, isPregnancy: 'YES' })
                      }}>Si</Button>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Button
                      className={isPregnant === false ? 'isChecked' : ''}
                      type="radio"
                      name="vacuna"
                      onClick={() => {
                        setIsPregnant(false)
                        setFormValues({ ...formValues, isPregnancy: 'NO' })
                      }}>
                      No
                    </Button>
                  </Grid.Column>
                </Grid.Row>
                {/* <Pregnant ispregnant={isPregnant} />
                 */}
                {Pregnant()}
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
                    <Grid.Row className="answer">{menstruationAge > 0 ? menstruationAge : 'N/A'}</Grid.Row>
                  </Grid.Column>
                  <Grid.Column verticalAlign="middle" width={3}>
                    <Grid.Row className="question">Tipo de periodo</Grid.Row>
                    <Grid.Row className="answer">{formValues.kind_mestruation ? formValues.kind_mestruation : 'N/A'}</Grid.Row>
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
                  <Grid.Column verticalAlign="middle" width={4}>
                    <Grid.Row className="question">Menopausia</Grid.Row>
                    <Grid.Row className="answer">{menopause ? 'SI' : 'NO'}</Grid.Row>
                  </Grid.Column>
                  <Grid.Column verticalAlign="middle" width={3}>
                    <Grid.Row className="question">Fecha de inicio</Grid.Row>
                    <Grid.Row className="answer">{formValues.year_menopause ? formValues.year_menopause : 'N/A'}</Grid.Row>
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
                    <Grid.Row className="answer">{formValues.embarazos ? formValues.embarazos : 0}</Grid.Row>
                    <Grid.Row className="question">Num. de cesareas</Grid.Row>
                    <Grid.Row className="answer">{formValues.cesarea ? formValues.cesarea : 0}</Grid.Row>
                  </Grid.Column>
                  <Grid.Column verticalAlign="middle" width={3}>
                    <Grid.Row className="question">Num. partos</Grid.Row>
                    <Grid.Row className="answer">{formValues.partos ? formValues.partos : 0}</Grid.Row>
                    <Grid.Row className="question" >Num. abortos</Grid.Row>
                    <Grid.Row className="answer">{formValues.abortos ? formValues.abortos : 0}</Grid.Row>
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
