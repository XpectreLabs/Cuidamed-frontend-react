import React, { useState } from 'react'
import {
    Grid,
    Container
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { commonDiseases } from './data';

export default function EnfermedadesComunes() {

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

    return (
        <div>
            <Container>
                <Grid verticalAlign="middle">
                    <Grid.Row>
                        <h1 className="title-diseas">Historial Médico</h1>
                    </Grid.Row>
                    <Grid.Row className="subtitle">
                        <h2 className="subtitle-diseas">¿Tienes algunas de estas enfermedades?</h2>
                    </Grid.Row>
                    <Grid.Row verticalAlign="middle" className="list-enfermedades-comunes">
                        <Grid.Column width={15} verticalAlign="middle">
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
                        </Grid.Column>
                        <Grid.Column width={1}>
                            {/* to={icon.link} */}
                            <Link to={"/sistemas"}>
                                <div className="swiper-button-next" tabIndex="0" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-5ee101923810c92463" aria-disabled="false"></div>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    )
}

