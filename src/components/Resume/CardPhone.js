import React, { useState } from "react";
import { Grid, Button, Label } from "semantic-ui-react";

const CardPhone = ({ title, icon, arrayData = [] }) => {

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
                </Grid.Row>
                <Grid.Row className="box">
                    <Grid.Column>
                        {isShow && (
                            arrayData.map((item, index) => (
                                <h3>
                                    {item.name} <br /><a href={`+52${item.phone}`}>{`+52${item.phone}`}</a>
                                </h3>
                            ))
                        )}
                        {!isShow && arrayData.length > 0 && (
                            <h3>
                                {arrayData[0].name} <br /><a href={`+52${arrayData[0].phone}`}>{`+52${arrayData[0].phone}`}</a>
                            </h3>
                        )}
                    </Grid.Column>
                    <Grid.Column mobile={8}>
                        {!isShow && (
                            <Button
                                onClick={() => setIsShow(true)}
                            >Ver más</Button>
                        )}
                        {isShow && (
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

export default CardPhone;
