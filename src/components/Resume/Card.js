import React, { useState } from "react";
import { Grid, Button, Label } from "semantic-ui-react";


const Card = ({ title, icon, arrayData = [] }) => {
    const [isShow, setIsShow] = useState(false);


    console.log(arrayData);

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
                            arrayData.map((item, index) => (

                                <h3 key={index}>{item.name}</h3>
                            ))
                        )}
                        {!isShow && arrayData.length > 0 && (
                            <h3>{arrayData[0].name}</h3>
                        )}
                        {arrayData.length === 0 && (
                            <h3>No hay información</h3>
                        )}
                        {/* <h3>Diabetes</h3> */}
                    </Grid.Column>
                    <Grid.Column>
                        {arrayData.length > 0 && !isShow && (
                            <Button
                                onClick={() => setIsShow(true)}
                            >Ver más</Button>
                        )}
                        {arrayData.length > 0 && isShow && (
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
