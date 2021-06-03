import React, { useState } from "react";
import { Grid, Button, Label } from "semantic-ui-react";
import moment from 'moment';


const Card = ({ title, icon, arrayData = [], treatement=false }) => {
    const [isShow, setIsShow] = useState(false);

    return (
        <Grid.Row className="diseases">
            <Grid.Column mobile={15}>
                <Grid.Row className="title" verticalAlign="middle">
                    <Grid.Column verticalAlign="middle">
                        {icon}
                        <span>{title}</span>
                    </Grid.Column>
                    {arrayData.length > 0 && (
                        <Label floating>{arrayData.length}</Label>
                    )}
                    {/* <Label floating>2</Label> */}
                </Grid.Row>
                <Grid.Row className="box">
                    <Grid.Column>
                        {isShow && (
                            arrayData.map((item, index) => {
                                if (!treatement) return (<h3 key={index}>{item.name}</h3>)
                                else return (
                                    <div style={{margin:"0 auto", width: '70%', paddingTop:'10px'}}>
                                        <h5>Medicamento: {item.medicamento}</h5>
                                        <h5>Dosis: {item.dosis}</h5>
                                        <h5>Frecuencia: {item.frecuencia}</h5>
                                        <h5>Día inicio: {moment.utc(item.fecha_inicio).format('YYYY-MM-DD')}</h5>
                                        <h5>Día Fin: {moment.utc(item.fecha_fin).format('YYYY-MM-DD')}</h5>
                                        <hr />
                                    </div>
                                )
                            })
                        )}
                        {!isShow && arrayData.length > 0 && !treatement && (
                            <h3>{arrayData[0].name}</h3>
                        )}
                        {!isShow && arrayData.length > 0 && treatement && (
                            <div style={{margin:"0 auto", width: '70%'}}>
                                <h5>Medicamento: {arrayData[0].medicamento}</h5>
                                <h5>Dosis: {arrayData[0].dosis}</h5>
                                <h5>Frecuencia: {arrayData[0].frecuencia}</h5>
                                <h5>Día inicio: {moment.utc(arrayData[0].fecha_inicio).format('YYYY-MM-DD')}</h5>
                                <h5>Día Fin: {moment.utc(arrayData[0].fecha_fin).format('YYYY-MM-DD')}</h5>
                                <hr />
                            </div>
                        )}
                        {arrayData.length === 0 && (
                            <h3>No hay información</h3>
                        )}
                        {/* <h3>Diabetes</h3> */}
                    </Grid.Column>
                    <Grid.Column>
                        {arrayData.length > 1 && !isShow && (
                            <Button
                                onClick={() => setIsShow(true)}
                            >Ver más</Button>
                        )}
                        {arrayData.length > 1 && isShow && (
                            <Button
                                onClick={() => setIsShow(false)}
                            >Ver menos</Button>
                        )}
                    </Grid.Column>
                </Grid.Row>
            </Grid.Column>
        </Grid.Row>
    )
}

export default Card;
