import React, { useState, useEffect } from 'react'
import { Grid, Button, Icon } from 'semantic-ui-react'

import { arrayIconHumanSys } from './data'

//DRAG ANDD DROP
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import Item from "../DragAndDrop/Item";
import DropWrapper from "../DragAndDrop/DropWrapper";
import Col from "../DragAndDrop/Col";
import { data, statuses } from "../DragAndDrop/data";
import ModalComponent from '../ModalComponent';

const ListaEnfermedades = () => {
    const { humanSystem, arrayData, color } = window.history.state.state

    //DRAG AND DROP
    const [items, setItems] = useState(arrayData);

    const [btnAddExp, setBtnAddExp] = useState(null);

    useEffect(() => {
        if (items.some(si => si.status === "misEnfermedades")) {
            setBtnAddExp(<Button>Ingresar a expediente</Button>);
        } else {
            setBtnAddExp(<Button >No tengo ninguna de estas enfermedades</Button>);
        }
    }, [items])

    const onDrop = (item, monitor, status = "") => {
        const mapping = statuses.find(si => si.status === status);
        setItems(prevState => {
            const newItems = prevState
                .filter(i => i.id !== item.id)
                .concat({ ...item, status });
            console.log(newItems);
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

    const [open, setOpen] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
    };


    return (
        <div >
            <Grid centered className="lista-enfermedades">
                <Grid.Row>
                    {arrayIconHumanSys
                        .filter(icon => icon.name === humanSystem)
                        .map((icon, index) => (
                            <h1 key={index} className="title-list">
                                <span className="title-list-icon">
                                    {icon.component}
                                </span> <span style={{ color: color }}>{icon.system}</span>
                            </h1>
                        ))}

                </Grid.Row>
                <Grid.Row className="instructions" centered>
                    <h3>Arrastre las enfermedades que tenga a mis enfermedades</h3>
                </Grid.Row>
                <Grid.Row columns="2" className="container-diseases">
                    <Grid.Column className="diseases left">
                        <Grid.Row>
                            <h3>Enfermedades</h3>
                        </Grid.Row>
                        <Grid.Row className="plate">
                            <Icon name="search" />
                            <input type="text" id="search" placeholder="Buscar"/>
                            <DndProvider backend={HTML5Backend}>
                                <div className={"row"}>
                                    <div className={"col-wrapper"}>
                                        <DropWrapper onDrop={onDrop} status={"enfermedades"}>
                                            <Col>
                                                {items
                                                    .filter(i => i.status === "enfermedades")
                                                    .map((i, idx) => <Item key={i.id} item={i} index={idx} moveItem={moveItem}  />)
                                                }
                                            </Col>
                                        </DropWrapper>
                                    </div>
                                </div>
                            </DndProvider>
                            <Grid.Row className="no-disease">
                                <Button onClick={() => setOpen(true)}>No encuentro mi enfermedad</Button>
                            </Grid.Row>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column className="diseases right">
                        <Grid.Row>
                            <h3>Mis enfermedades</h3>
                        </Grid.Row>
                        <Grid.Row className="eyelash" style={{ backgroundColor: color }}>
                            <Grid.Row className="pacient">
                                <p>Fabrizio Castellanos</p>
                            </Grid.Row>
                        </Grid.Row>
                        <Grid.Row className="folder" style={{ border: `3px solid ${color}` }}>
                            <Grid.Row className="drag">
                                <DndProvider backend={HTML5Backend}>
                                    <div className={"row"}>
                                        <div className={"col-wrapper"}>
                                            <DropWrapper onDrop={onDrop} status={"misEnfermedades"}>
                                                <Col>
                                                    {items
                                                        .filter(i => i.status === "misEnfermedades")
                                                        .map((i, idx) => <Item key={i.id} item={i} index={idx} moveItem={moveItem} status={color} />)
                                                    }
                                                </Col>
                                            </DropWrapper>
                                        </div>
                                    </div>
                                </DndProvider>
                            </Grid.Row>
                            <Grid.Row className="no-disease">
                                {btnAddExp}
                            </Grid.Row>
                        </Grid.Row>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <div className="modal-enfermedades">
                <ModalComponent open={open} onClose={() => setOpen(false)}  title = '¿Qué enfermedad tienes?' textModal = 'Ingrese la enfermedad que tenga en el sistema.' buttonText = 'Ingresar al expediente' placeholder = 'Enfermedad' icon={true}/>
            </div>
        </div >
    )
}

export default ListaEnfermedades