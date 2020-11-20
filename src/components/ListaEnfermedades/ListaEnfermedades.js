import React, { useState, useEffect } from 'react'
import { Grid, Button } from 'semantic-ui-react'

import { arrayIconHumanSys } from './data'

//DRAG ANDD DROP
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import Item from "../DragAndDrop/Item";
import DropWrapper from "../DragAndDrop/DropWrapper";
import Col from "../DragAndDrop/Col";
import { data, statuses } from "../DragAndDrop/data";

const ListaEnfermedades = () => {
    const { humanSystem } = window.history.state.state

    //DRAG AND DROP
    const [items, setItems] = useState(data);



    useEffect(() => {
        console.log(items.includes(si => si.status === 'misEnfermedades'));
    }, [items])
    // (
    //     items
    //         .filter(i => i.status === "misEnfermedades")
    //         .map((i, idx) => <Button key={idx}>Ingresar a expediente</Button>)
    //     {items
    //         .filter(i => i.status === "enfermedades")
    //         .map((i, idx) => <Button key={idx}>No tengo ninguna de estas enfermedades</Button>)
    //     }
    // )

    const onDrop = (item, monitor, status = "") => {
        const mapping = statuses.find(si => si.status === status);
        console.log(mapping);
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
        <div >
            <Grid centered>
                <Grid.Row>
                    {arrayIconHumanSys
                        .filter(icon => icon.name === humanSystem)
                        .map((icon, index) => (
                            <h1 key={index} className="title-list">
                                <span className="title-list-icon">
                                    {icon.component}
                                </span> {icon.system}
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
                            <Grid.Row className="no-disease">
                                <Button>No encuentro mi enfermedad</Button>
                            </Grid.Row>
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
                            </Grid.Row>
                        </Grid.Row>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div >
    )
}

export default ListaEnfermedades