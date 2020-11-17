import React, { useState, useEffect } from 'react';

import Moment from 'react-moment';
import {
    Grid,
    Container,
    Icon,
    Button,
    GridColumn,
    GridRow,
} from 'semantic-ui-react';

// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import {
    CarpDigestivo,
    CarpEndocrino,
    CarpMuscular,
    CarpNervioso,
    CarpOseo,
    CarpPiel,
    CarpRespiratorio,
    CarpSanguineo,
    CarpSexual,
    CarpUrinario,
    Oseo,
} from '../../../images/icons/icons';

import { commonDiseases } from './data';


//DRAG ANDD DROP
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import Item from "../../DragAndDrop/Item";
import DropWrapper from "../../DragAndDrop/DropWrapper";
import Col from "../../DragAndDrop/Col";
import { data, statuses } from "../../DragAndDrop/data";

// import "./Slider.scss"
// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function MedicalHistory() {
    const [listCommonDiseases, setListCommonDiseases] = useState([]);
    const handleCheckedInput = (e) => {
        console.log(e.currentTarget.checked);
        console.log(listCommonDiseases);
        const value = e.target.value;

        if (e.currentTarget.checked) {
            setListCommonDiseases((listCommonDiseases) => [
                ...listCommonDiseases,
                value,
            ]);
        }
    };

    useEffect(() => {
        console.log(listCommonDiseases);
    }, [listCommonDiseases]);

    //DRAG AND DROP
    const [items, setItems] = useState(data);

    const onDrop = (item, monitor, status = "") => {
        const mapping = statuses.find(si => si.status === status);

        setItems(prevState => {
            const newItems = prevState
                .filter(i => i.id !== item.id)
                .concat({ ...item, status, icon: mapping.icon });
            return [...newItems];
        });
    };

    const moveItem = (dragIndex, hoverIndex) => {
        const item = items[dragIndex];
        setItems(prevState => {
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            return [...newItems];
        });
    };

    return (
        <Grid centered className="slider">
            <Grid.Row>
                <h1 className="title-diseas">Historial Médico</h1>
            </Grid.Row>
            <Grid.Row className="medical-history">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    // allowSlideNext={isValidIndex}
                    // allowSlidePrev={isValidIndex}
                    pagination={{ clickable: false }}
                    // scrollbar={{ draggable: true }}
                    // onSwiper={swiper => console.log(swiper)}
                    // onSlideChange={e => setActiveIndex(e.activeIndex)}
                    className="slider-content"
                    simulateTouch={false}>
                    <SwiperSlide>
                        <Container>
                            <Grid verticalAlign="middle">
                                <Grid.Row>
                                    {/* <h2 className="title-diseas">¿Tienes algunas de estas enfermedades?</h2> */}
                                    <h2>¿Tienes algunas de estas enfermedades?</h2>
                                </Grid.Row>
                                <Grid.Column computer={16} mobile={16} tablet={16}>
                                    <Grid.Row verticalAlign="middle">
                                        <div className="container-enfermedades">
                                            {commonDiseases.map((disease, index) => (
                                                <div
                                                    key={index}
                                                    className="container-enfermedades__btn">
                                                    <input
                                                        type="checkbox"
                                                        id={disease.id}
                                                        value={disease.id}
                                                        onChange={handleCheckedInput}></input>
                                                    <label htmlFor={disease.id} className="ui button">
                                                        {disease.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </Grid.Row>
                                </Grid.Column>
                            </Grid>
                        </Container>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Grid className="capeta-enfermedades" centered>
                            <Grid.Row>
                                <h3>Enfermedades de:</h3>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <div className="carpeta">
                                        <CarpOseo />
                                        <Grid.Row>
                                            <Button>Incompleto</Button>
                                            <Button>Editar</Button>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <p>Sistema óseo</p>
                                        </Grid.Row>
                                    </div>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <div className="carpeta">
                                        <CarpMuscular />
                                        <Grid.Row>
                                            <Button>Incompleto</Button>
                                            <Button>Editar</Button>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <p>Sistema muscular</p>
                                        </Grid.Row>
                                    </div>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <div className="carpeta">
                                        <CarpSanguineo />
                                        <Grid.Row>
                                            <Button>Incompleto</Button>
                                            <Button>Editar</Button>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <p>Sistema circulatorio</p>
                                        </Grid.Row>
                                    </div>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <div className="carpeta">
                                        <CarpDigestivo />
                                        <Grid.Row>
                                            <Button>Incompleto</Button>
                                            <Button>Editar</Button>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <p>Sistema digestivo</p>
                                        </Grid.Row>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <div className="carpeta">
                                        <CarpUrinario />
                                        <Grid.Row>
                                            <Button>Incompleto</Button>
                                            <Button>Editar</Button>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <p>Sistema urinario</p>
                                        </Grid.Row>
                                    </div>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <div className="carpeta">
                                        <CarpNervioso />
                                        <Grid.Row>
                                            <Button>Incompleto</Button>
                                            <Button>Editar</Button>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <p>Sistema nervioso</p>
                                        </Grid.Row>
                                    </div>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <div className="carpeta">
                                        <CarpSexual />
                                        <Grid.Row>
                                            <Button>Incompleto</Button>
                                            <Button>Editar</Button>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <p>Sistema reproductivo</p>
                                        </Grid.Row>
                                    </div>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <div className="carpeta">
                                        <CarpEndocrino />
                                        <Grid.Row>
                                            <Button>Incompleto</Button>
                                            <Button>Editar</Button>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <p>Sistema endocrino</p>
                                        </Grid.Row>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <div className="carpeta">
                                        <CarpRespiratorio />
                                        <Grid.Row>
                                            <Button>Incompleto</Button>
                                            <Button>Editar</Button>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <p>Sistema respiratorio</p>
                                        </Grid.Row>
                                    </div>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <div className="carpeta">
                                        <CarpPiel />
                                        <Grid.Row>
                                            <Button>Incompleto</Button>
                                            <Button>Editar</Button>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <p>Piel</p>
                                        </Grid.Row>
                                    </div>
                                </Grid.Column>
                                {/* <Grid.Column width={3}>
                                    <div className="carpeta">
                                        <IconMen />
                                        <p>Cancer</p>
                                    </div>
                                </Grid.Column> */}
                            </Grid.Row>
                        </Grid>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Grid centered>
                            <Grid.Row className="system" centered>
                                <h3 className="subtitle"><span className="subtitle-icon"><Oseo /></span>Sistema óseo</h3>
                                <h3>Arrastre las enfermedades que tenga a mis enfermedades</h3>
                            </Grid.Row>
                            <Grid.Row columns="2">
                                <Grid.Column className="diseases left">
                                    <GridRow>
                                        <h3>Enfermedades</h3>
                                    </GridRow>
                                    <Grid.Row className="plate">
                                        <DndProvider backend={HTML5Backend}>
                                            <div className={"row"}>
                                                <div className={"col-wrapper"}>
                                                    <DropWrapper onDrop={onDrop} status={"enfermedades"}>
                                                        <Col>
                                                            {items
                                                                .filter(i => i.status === "enfermedades")
                                                                .map((i, idx) => <Item key={i.id} item={i} index={idx} moveItem={moveItem} status={'#EB5A46'} />)
                                                            }
                                                        </Col>
                                                    </DropWrapper>
                                                </div>
                                            </div>
                                        </DndProvider>
                                        {/* <Grid.Row>
                                            <Grid.Row>
                                                <p className="ui button disease">Enfermedad de Perthes</p>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <p className="ui button disease">Osteodistrofia renal</p>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <p className="ui button disease">Osteogénesis imperfecta</p>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <p className="ui button disease">Osteomalacia</p>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <p className="ui button disease">Osteomielitis</p>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <p className="ui button disease">Osteoporosis</p>
                                            </Grid.Row>
                                        </Grid.Row> */}
                                        <Grid.Row className="no-disease">
                                            <Button>No encuentro mi enfermedad</Button>
                                        </Grid.Row>

                                        {/* <Grid.Column className="internal-plate">

                                        </Grid.Column> */}
                                    </Grid.Row>
                                </Grid.Column>
                                <Grid.Column className="diseases right">
                                    <Grid.Row>
                                        <h3>Mis enfermedades</h3>
                                    </Grid.Row>
                                    <Grid.Row className="eyelash">
                                        <Grid.Row className="pacient">
                                            <p>Fabrizio Castellanos</p>
                                        </Grid.Row>
                                    </Grid.Row>
                                    <Grid.Row className="folder">
                                        <Grid.Row className="drag">
                                            <DndProvider backend={HTML5Backend}>
                                                <div className={"row"}>
                                                    <div className={"col-wrapper"}>
                                                        <DropWrapper onDrop={onDrop} status={"misEnfermedades"}>
                                                            <Col>
                                                                {items
                                                                    .filter(i => i.status === "misEnfermedades")
                                                                    .map((i, idx) => <Item key={i.id} item={i} index={idx} moveItem={moveItem} status={'#00C2E0'} />)
                                                                }
                                                            </Col>
                                                        </DropWrapper>
                                                    </div>
                                                </div>
                                            </DndProvider>
                                        </Grid.Row>
                                        <Grid.Row className="no-disease">
                                            <Button>No tengo ninguna de estas enfermedades</Button>
                                        </Grid.Row>
                                    </Grid.Row>

                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                    </SwiperSlide>
                    <SwiperSlide></SwiperSlide>
                    <SwiperSlide></SwiperSlide>
                    <SwiperSlide></SwiperSlide>
                </Swiper>
            </Grid.Row>
        </Grid>
    );
}
