import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Moment from 'react-moment';
import 'moment/locale/es';
import { Grid, Container, Icon, Button } from 'semantic-ui-react';
import { CONECTION } from '../../conection';
//icons
import {
  IconMen,
  IconWomen,
  IconFechaNacimiento,
  IconMapa,
  IconMundo,
  IconAltura,
  IconPeso,
  IconGotaSangre,
  IconOcupacion,
  IconGradoEstudio,
  IconDonador,
  IconEstadoCivil,
  IconReligion,
  IconSeguro,
  IconVacuna,
} from '../../images/icons/icons';

import {
  bloodType,
  gradesStudy,
  religionArray,
  hospitals,
  maritalStatus,
  ifNot,
} from './data';

import Date from '../inputsCustom/Date';
import { SelectCustom } from '../inputsCustom/Select/Select';
import { CustomInput } from '../inputsCustom/CustomInput';

//Placess
import PlacesComplete from '../PlacesComplete';

// import Swiper core and required components
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  HashNavigation,
} from 'swiper';

import { updateInfoBasic } from '../../redux/actions/UserAction';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { useDispatch } from 'react-redux';

// import "./Slider.scss"
// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function Slider() {
  const dispatch = useDispatch();
  const [isValidIndex, setIsValidIndex] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectSex, setSelectSex] = useState(<IconMen />);

  const [totalVacunas, setTotalVacunas] = useState([]);
  const { id } = JSON.parse(localStorage.getItem('user'));
  const [vacunaText, setVacunaText] = useState('');
  const [formValues, setFormValues] = useState({
    sex: '',
    birthDate: '',
    birth_place: '',
    place: '',
    height: '',
    weight: '',
    type_blood: '',
    career: '',
    social_number: '',
    ocupation: '',
    religion: '',
    stateMarital: '',
    organDonor: '',
    vacunado: '',
    is_vaccinated: '',
    vaccine: '',
  });
  useEffect(() => {
    fetch(`${CONECTION}api/getUser/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'x-auth-token': localStorage.getItem('refreshToken'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const {
          birth_date,
          birth_place,
          career,
          civil_status,
          height,
          is_vaccinated,
          ocupation,
          vaccine_number,
          organ_donor,
          place,
          religion,
          sex,
          social_number,
          type_blood,
          weight,
          vaccine,
        } = data.users[0];
        setFormValues({
          ...formValues,
          sex,
          weight,
          height,
          birth_place,
          birthDate: birth_date,
          place,
          type_blood,
          career,
          social_number,
          ocupation,
          religion,
          stateMarital: civil_status,
          organDonor: organ_donor,
          is_vaccinated,
          vaccine_number,
          vacunado: is_vaccinated === 'YES' ? true : false,
        });
        setTotalVacunas(vaccine);
        if (birth_date &&
          birth_place &&
          career &&
          civil_status &&
          height &&
          is_vaccinated &&
          ocupation &&
          vaccine_number &&
          organ_donor &&
          place &&
          religion &&
          sex &&
          social_number &&
          type_blood &&
          weight &&
          vaccine) {
          slide(6);
        }
      });
  }, []);
  const {
    sex,
    birthDate,
    birth_place,
    place,
    height,
    weight,
    type_blood,
    career,
    social_number,
    ocupation,
    religion,
    stateMarital,
    organDonor,
    vacunado,
    vaccine_number,
    is_vaccinated,
  } = formValues;

  const infoBasicDescriptionIcons = [
    {
      iconFirst: <IconFechaNacimiento />,
      dataFirst: <Moment date={birthDate} locale="es" format="LL" />,
      labelFirst: 'Fecha de nacimiento',
      slideFirst: 1,
      iconSecond: <IconMundo />,
      dataSecond: birth_place,
      labelSecond: 'Lugar de nacimiento',
      slideSecond: 1,
    },
    {
      iconFirst: <IconMapa />,
      dataFirst: place,
      labelFirst: 'Lugar de residencia',
      slideFirst: 1,
      iconSecond: <IconAltura />,
      dataSecond: height,
      labelSecond: 'Altura (cm)',
      slideSecond: 2,
    },
    {
      iconFirst: <IconPeso />,
      dataFirst: weight,
      labelFirst: 'Peso (kg)',
      slideFirst: 2,
      iconSecond: <IconGotaSangre />,
      dataSecond: type_blood,
      labelSecond: 'Tipo de sangre',
      slideSecond: 2,
    },
    {
      iconFirst: <IconOcupacion />,
      dataFirst: ocupation,
      labelFirst: 'Ocupación',
      slideFirst: 3,
      iconSecond: <IconGradoEstudio />,
      dataSecond: career,
      labelSecond: 'Grado de estudios',
      slideSecond: 3,
    },
    {
      iconFirst: <IconDonador />,
      dataFirst: organDonor,
      labelFirst: 'Donador de organos',
      slideFirst: 4,
      iconSecond: <IconEstadoCivil />,
      dataSecond: stateMarital,
      labelSecond: 'Estado civil',
      slideSecond: 4,
    },
    {
      iconFirst: <IconReligion />,
      dataFirst: religion,
      labelFirst: 'Religión',
      slideFirst: 4,
      iconSecond: <IconSeguro />,
      dataSecond: social_number,
      labelSecond: 'Seguro Medico',
      slideSecond: 3,
    },
    {
      iconFirst: <IconVacuna />,
      dataFirst: vacunaText,
      labelFirst: 'Vacunas los últimos 6 meses',
      slideFirst: 5,
      iconSecond: selectSex,
      dataSecond: sex,
      labelSecond: 'Sexo',
      lideSecond: 0,
    },
    // ,
    // ,
    // IconVacuna,
  ];

  const [flagNext, setFlagNext] = useState(true);

  useEffect(() => {
    // console.log(formValues);
    let flag = true;
    if (sex) {
      if (sex === 'M') {
        document.getElementById('iconMen').checked = true;
      } else {
        document.getElementById('iconWomen').checked = true;
      }
    }
    // arrowPrev();
    // setFlagNext(false);
    switch (activeIndex) {
      case 0:
        setTitleInfoBasic(false);
        if (sex != '' && sex != undefined) {
          setIsValidIndex(true);
          removeArrowNext();
          arrowNext();
          // if(flagNext) slide(1);
          if (sex === 'F') {
            setSelectSex(<IconWomen />);
          }
        } else {
          setIsValidIndex(false);
          removeArrowNext();
        }
        break;
      case 1:
        setTitleInfoBasic(false);
        if (birthDate !== null && birth_place !== '' && place !== '') {
          setIsValidIndex(true);
          removeArrowNext();
          arrowNext();
          // if(flagNext) slide(2);
        }
        else {
          setIsValidIndex(false);
          removeArrowNext();
        }
        break;
      case 2:
        setTitleInfoBasic(false);
        if (height !== '' && weight !== '' && type_blood !== '') {
          setIsValidIndex(true);
          removeArrowNext();
          arrowNext();
          // if(flagNext) slide(3);
        }
        else {
          setIsValidIndex(false);
          removeArrowNext();
        }
        break;
      case 3:
        setTitleInfoBasic(false);
        if (career !== '' && social_number !== '' && ocupation !== '') {
          setIsValidIndex(true);
          removeArrowNext();
          arrowNext();
          // if(flagNext) slide(4);
        }
        else {
          setIsValidIndex(false);
          removeArrowNext();
        }
        break;
      case 4:
        setTitleInfoBasic(false);
        if (religion !== '' && stateMarital !== '' && organDonor !== '') {
          setIsValidIndex(true);
          removeArrowNext();
          arrowNext();
          // if(flagNext) slide(5);
        }
        else {
          setIsValidIndex(false);
          removeArrowNext();
        }
        break;
      case 5:
        setTitleInfoBasic(true);
        if (vacunado !== '') {
          {
            setIsValidIndex(true);
            removeArrowNext();
            arrowNext();
            // if(flagNext) slide(6);
          }
        } else {
          setIsValidIndex(false);
          removeArrowNext();
        }
        break;
      case 6:
        // setTitleInfoBasic(true);
        removeArrowNext();
        removeArrowPrev();
        console.log('toatl vacunas: ', totalVacunas);
        if (vacunado === false) {
          console.log('llega aqui');
          setVacunaText('N');
          // if(flagNext) slide(7);
        } else if (vacunado === true) {
          let vacunasString = 'Sí, ';
          totalVacunas.map((vacuna) => {
            vacunasString += ' ' + vacuna.name;
          });
          setVacunaText(vacunasString);
          // if(flagNext) slide(1);
        }
        break;
      case 7:
        removeArrowNext();
        removeArrowPrev();
        break;
      default:
        setTitleInfoBasic(false);
        removeArrowPrev();
        break;
    }
    return () => {
      flag = false;
    };
  }, [activeIndex, formValues, flagNext]);



  // useEffect(() =>{
  //   console.log('Entro aquí cuando: ' + flagNext);
  // },[flagNext])

  const [titleInfoBasic, setTitleInfoBasic] = useState(false);

  const history = useHistory();
  const saveAndContinue = (e) => {
    e.preventDefault();
    dispatch(updateInfoBasic(formValues, history));
  };

  const handleInputsVacunas = (e) => {
    if (e > 0 && e < 4) {
      let vacunasArray = [];
      for (let index = 0; index < e; index++) {
        let obj = { order: index + 1, name: '' };
        console.log(obj);
        if (totalVacunas[index]) obj = { ...totalVacunas[index] };
        vacunasArray = [...vacunasArray, obj];
      }
      setTotalVacunas(vacunasArray);
    } else {
      setTotalVacunas([]);
    }
  };
  const isVacunado = (bool) => {
    if (bool) {
      setFormValues({ ...formValues, vacunado: true, is_vaccinated: 'YES' });
    } else {
      setFormValues({
        ...formValues,
        vacunado: false,
        is_vaccinated: 'NO',
        vaccine_number: 0,
      });
      setTotalVacunas([]);
    }
  };
  useEffect(() => {
    setFormValues({ ...formValues, vaccine: JSON.stringify(totalVacunas) });
  }, [totalVacunas]);
// aqui hay un errpr cpm eñ eñ swipér
  const slide = (s) => {
    const mySwiper = document.querySelector('.swiper-container')
    if(mySwiper){
      setTimeout(
        () => {
          if(mySwiper) mySwiper.swiper.slideTo(s);
        },500);
    }
    
    // setFlagNext(true);
  };

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

  const arrowPrev = () => {
    const arrowPrev = document.querySelector('.swiper-button-prev');
    arrowPrev.style.color = '#00a199';
    const buttonPrev = document.createElement('button');
    buttonPrev.textContent = 'Atras';
    buttonPrev.classList.add('ui', 'button');
    const divPrev = document.createElement('div');
    divPrev.appendChild(buttonPrev);
    divPrev.classList.add('arrow', 'left');
    arrowPrev.appendChild(divPrev);
  }

  const removeArrowNext = () => {
    const arrowNext = document.querySelector('.swiper-button-next');

    if (arrowNext) {
      arrowNext.style.color = 'transparent';
      while (arrowNext.firstChild) {

        arrowNext.removeChild(arrowNext.firstChild);
      }

    }

  }

  const removeArrowPrev = () => {
    const arrowPrev = document.querySelector('.swiper-button-prev');

    if (arrowPrev) {
      arrowPrev.style.color = 'transparent';
      while (arrowPrev.firstChild) {

        arrowPrev.removeChild(arrowPrev.firstChild);
      }

    }
  }

  useEffect(() => {
    // console.log('Banderaaaa', flagNext)

    if(activeIndex === 6) {
      removeArrowPrev();
    } else {
      removeArrowPrev();
      arrowPrev();
    }

    console.log(':):)'+activeIndex);
  }, [activeIndex]);





  return (
    <Grid centered className="slider">
      <Grid.Row only='computer tablet'>
        <h1 className={`title ${titleInfoBasic ? 'hidden-title' : ''}`}>
          Información Básica
        </h1>
      </Grid.Row>

      <Grid.Row>
        <Swiper
          spaceBetween={55}
          slidesPerView={1}
          navigation
          // direction='vertical'
          allowSlideNext={isValidIndex}
          pagination={{ clickable: false }}
          // scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={(e) => {
            console.log(e.activeIndex);
            setActiveIndex(e.activeIndex)
            if (e.activeIndex > activeIndex) {
              setFlagNext(true);

            } else {
              setFlagNext(false);
            }

            console.log(activeIndex);
          }

          }
          className="slider-content"
          simulateTouch={false}>
          <SwiperSlide data-hash="slide1">
            {({ isActive }) => (
              <div>Current slide is {isActive ? 'active' : 'not active'}</div>
            )}

            <Container>
              <Grid verticalAlign="middle" name="sex">
                <Grid.Row only='mobile' className='mobile-title'>
                  <h3 className='title'>
                    Información Básica
                </h3>
                </Grid.Row>
                <Grid.Row className="inputs-sex" verticalAlign="middle">
                  <Grid.Column floated="left" width={6}>
                    <input
                      id="iconMen"
                      type="radio"
                      name="gender"
                      className="hidden"
                      readOnly=""
                      tabIndex="0"
                    />
                    <label
                      htmlFor="iconMen"
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        setFormValues({ ...formValues, sex: 'M' })
                      }>
                      <IconMen />
                      <br />
                      <span>Hombre</span>
                    </label>
                  </Grid.Column>
                  <Grid.Column floated="right" width={6}>
                    <input
                      id="iconWomen"
                      type="radio"
                      name="gender"
                      className="hidden"
                      readOnly=""
                      tabIndex="0"
                    />
                    <label
                      htmlFor="iconWomen"
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        setFormValues({ ...formValues, sex: 'F' })
                      }>
                      <IconWomen />
                      <br />
                      <span>Mujer</span>
                    </label>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </SwiperSlide>
          <SwiperSlide data-hash="slide2">
            <div className="slider-two">
              <Grid centered columns={3} verticalAlign="middle">
                <Grid.Row only='mobile' className='mobile-title'>
                  <h3 className='title'>
                    Información Básica
                </h3>
                </Grid.Row>
                <Grid.Column computer={4} tablet={6} mobile={12}>
                  <div>
                    <IconFechaNacimiento />
                    <Date
                      className="justify-content"
                      placeholder="Fecha de nacimiento"
                      id="date"
                      setValue={(e) =>
                        setFormValues({ ...formValues, birthDate: e })
                      }
                      value={birthDate}
                    />
                    {/* <Text className="justify-content" labelPlaceholder="Fecha de nacimiento" name="fechaNacimiento" labelName="labelFechaNacimiento" /> */}
                  </div>
                </Grid.Column>
                <Grid.Column computer={4} tablet={6} mobile={12}>
                  <div>
                    <IconMundo />
                    <PlacesComplete
                      labelPlaceholder="Lugar de nacimiento"
                      setValue={(e) =>
                        setFormValues({ ...formValues, birth_place: e })
                      }
                      valuePlace={birth_place}
                    />
                    {/* { console.log('birth_place: ',birth_place)} */}
                  </div>
                </Grid.Column>
                <Grid.Column computer={4} tablet={6} mobile={12}>
                  <div>
                    <IconMapa />
                    <PlacesComplete
                      labelPlaceholder="Lugar de residencia"
                      setValue={(e) =>
                        setFormValues({ ...formValues, place: e })
                      }
                      valuePlace={place}
                    />
                  </div>
                </Grid.Column>
              </Grid>
            </div>
          </SwiperSlide>
          <SwiperSlide data-hash="slide3">
            <div className="slider-two">
              <Grid centered columns={3} verticalAlign="middle">
                <Grid.Row only='mobile' className='mobile-title'>
                  <h3 className='title'>
                    Información Básica
                </h3>
                </Grid.Row>
                <Grid.Column computer={4} tablet={6} mobile={12}>
                  <div>
                    <IconAltura />
                    <CustomInput
                      placeholder="Altura (cm)"
                      type="number"
                      name="height"
                      min= '1'
                      max='999'
                      setValue={(e) =>
                        setFormValues({ ...formValues, height: e })
                      }
                      value={height}
                    />
                  </div>
                </Grid.Column>
                <Grid.Column computer={4} tablet={6} mobile={12}>
                  <div>
                    <IconPeso />
                    <CustomInput
                      placeholder="Peso (kg)"
                      type="number"
                      name="height"
                      min= '1'
                      max='999'

                      setValue={(e) => {
                        console.log(e);
                        setFormValues({ ...formValues, weight: e });
                      }}
                      value={weight}
                    />
                  </div>
                </Grid.Column>
                <Grid.Column computer={4} tablet={6} mobile={12}>
                  <div>
                    <IconGotaSangre />

                    <SelectCustom
                      placeholder="Tipo de sangre"
                      dataOptions={bloodType}
                      setValue={(e) => {
                        console.log('hola');
                        setFormValues({ ...formValues, type_blood: e });
                      }}
                      value={type_blood}
                    />
                  </div>
                </Grid.Column>
              </Grid>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slider-two">
              <Grid centered columns={3} verticalAlign="middle">
                <Grid.Row only='mobile' className='mobile-title'>
                  <h3 className='title'>
                    Información Básica
                </h3>
                </Grid.Row>
                <Grid.Column computer={4} tablet={6} mobile={12}>
                  <div>
                    <IconGradoEstudio />
                    <SelectCustom
                      placeholder="Grado de estudios"
                      labelName="grado"
                      dataOptions={gradesStudy}
                      name="gradoEstudio"
                      setValue={(e) =>
                        setFormValues({ ...formValues, career: e })
                      }
                      value={career}
                    />
                  </div>
                </Grid.Column>
                <Grid.Column computer={4} tablet={6} mobile={12}>
                  <div>
                    <IconSeguro />
                    <SelectCustom
                      placeholder="Institución médica"
                      dataOptions={hospitals}
                      setValue={(e) => {
                        console.log('hola');
                        setFormValues({ ...formValues, social_number: e });
                      }}
                      value={social_number}
                    />
                  </div>
                </Grid.Column>
                <Grid.Column computer={4} tablet={6} mobile={12}>
                  <div>
                    <IconOcupacion />
                    <CustomInput
                      placeholder="Ocupación"
                      setValue={(e) =>
                        setFormValues({ ...formValues, ocupation: e })
                      }
                      value={ocupation}
                    />
                  </div>
                </Grid.Column>
              </Grid>
            </div>
          </SwiperSlide>
          <SwiperSlide data-hash="slide4">
            <div className="slider-two">
              <Grid centered columns={3} verticalAlign="middle">
                <Grid.Row only='mobile' className='mobile-title'>
                  <h3 className='title'>
                    Información Básica
                </h3>
                </Grid.Row>
                <Grid.Column computer={4} tablet={6} mobile={12}>
                  <div>
                    <IconReligion />
                    <SelectCustom
                      placeholder="Religión"
                      dataOptions={religionArray}
                      setValue={(e) =>
                        setFormValues({ ...formValues, religion: e })
                      }
                      value={religion}
                    />
                  </div>
                </Grid.Column>
                <Grid.Column computer={4} tablet={6} mobile={12}>
                  <div>
                    <IconEstadoCivil />
                    <SelectCustom
                      placeholder="Estado civil"
                      dataOptions={maritalStatus}
                      setValue={(e) =>
                        setFormValues({ ...formValues, stateMarital: e })
                      }
                      value={stateMarital}
                    />
                  </div>
                </Grid.Column>
                <Grid.Column computer={4} tablet={6} mobile={12}>
                  <div>
                    <IconDonador />
                    <SelectCustom
                      placeholder="Donador de organos"
                      dataOptions={ifNot}
                      setValue={(e) =>
                        setFormValues({ ...formValues, organDonor: e })
                      }
                      value={organDonor}
                    />
                  </div>
                </Grid.Column>
              </Grid>
            </div>
          </SwiperSlide>
          <SwiperSlide data-hash="slide5">
            <div className="vacunas">
              <Grid centered columns={16}>
                <Grid.Column computer={6} tablet={12} mobile={12}>
                  <h3
                    className={`title ${titleInfoBasic ? '' : 'hidden-title'}`}>
                    Información Básica
                  </h3>
                  <Grid.Row className="vacunas__title" width={50}>
                    <h3>¿Te has vacunado en estos ultimos 6 meses?</h3>
                  </Grid.Row>
                  <Grid.Row className="vacunas__center">
                    <IconVacuna />
                  </Grid.Row>
                  <Grid.Row className="vacunas__center">
                    <div className="optionYesOrNot">
                      <input
                        id="vacunaYes"
                        type="radio"
                        name="vacuna"
                        readOnly=""
                        tabIndex="0"
                        checked={is_vaccinated === 'YES' ? true : false}
                        onClick={() => isVacunado(true)}
                      />
                      <label htmlFor="vacunaYes">Sí</label>
                    </div>
                    <div className="optionYesOrNot">
                      <input
                        id="vacunaNo"
                        type="radio"
                        name="vacuna"
                        readOnly=""
                        checked={is_vaccinated === 'NO' ? true : false}
                        tabIndex="0"
                        onClick={() => isVacunado(false)}
                      />
                      <label htmlFor="vacunaNo">No</label>
                    </div>
                  </Grid.Row>
                  {vacunado && (
                    <>
                      <Grid.Row className="vacunas__title-description">
                        <CustomInput
                          placeholder="¿Cuantas fueron?"
                          type="number"
                          min= '1'
                          max='999'
                          setValue={(e) => {
                            setFormValues({ ...formValues, vaccine_number: e });
                            handleInputsVacunas(e);
                          }}
                          value={vaccine_number}
                        />
                      </Grid.Row>
                    </>
                  )}
                  {totalVacunas.map(({ order, name }, index) => (
                    <Grid.Row
                      className="vacunas__title-description"
                      key={index}>
                      <CustomInput
                        placeholder="Nombre"
                        type="text"
                        setValue={(e) => {
                          setTotalVacunas((numbers) => {
                            let updateValue = numbers.map((number) =>
                              number.order === order
                                ? { ...number, name: e }
                                : number
                            );
                            return updateValue;
                          });
                        }}
                        value={name}
                        onblur={(e) => {
                          let obj = { order: index + 1, name: e };
                          console.log(obj);
                        }}
                      />
                    </Grid.Row>
                  ))}
                </Grid.Column>
              </Grid>
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ position: 'relative' }} data-hash="slide6">
            <div className="info-basic">
              <Grid centered columns={16}>
                {/* <h1 className="title">Información Básica</h1> */}
                <Grid.Column computer={14} tablet={12} mobile={14}>
                  <h3
                    className={`title ${titleInfoBasic ? '' : 'hidden-title'}`}>
                    Información Básica
                  </h3>
                  {infoBasicDescriptionIcons.map((value, index) => (
                    <Grid.Row className="description" key={index}>
                      <div className="description-container">
                        <div className="icon">{value.iconFirst}</div>
                        <div className="data">
                          <label>
                            {value.labelFirst} {/* <a href="#"> */}
                            <Icon
                              name="pencil alternate"
                              size="small"
                              onClick={() => slide(value.slideFirst)}
                            />
                            {/* </a> */}
                          </label>
                          {/* onClick={handleEditarInfo} */}
                          <span>{value.dataFirst}</span>
                        </div>
                      </div>
                      <div className="description-container">
                        <div className="icon">{value.iconSecond}</div>
                        <div className="data">
                          <label>
                            {value.labelSecond}{' '}
                            <Icon
                              name="pencil alternate"
                              size="small"
                              onClick={() => slide(value.slideSecond)}
                            />
                          </label>
                          <span>{value.dataSecond}</span>
                        </div>
                      </div>
                    </Grid.Row>
                  ))}
                  {/* <Grid.Row>
                    <Button
                      className="button-info-basic"
                      onClick={saveAndContinue}>
                      Guardar y Continuar
                    </Button>
                  </Grid.Row> */}
                </Grid.Column>

              </Grid>
            </div>
            {/* <Grid className="button-info-basic">
              <Grid.Row>
                <Button
                  
                  onClick={saveAndContinue}>
                  Guardar y Continuar
                </Button>
              </Grid.Row>
            </Grid> */}
          </SwiperSlide>
        </Swiper>
        {activeIndex === 6 && (
          <Grid.Row className="button-info-basic">
            <Grid.Column width={14}>
              <Button
                onClick={saveAndContinue}>
                Guardar y Continuar
            </Button>

            </Grid.Column>
          </Grid.Row>
        )}
      </Grid.Row>
    </Grid>
  );
}
