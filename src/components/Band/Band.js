import React, { useState } from 'react'
import { Grid, Button } from 'semantic-ui-react';
import Logo from '../../images/CuidaMEDLogo.png';
import BandaA from '../../images/pulcera.jpg';
import BandaV from '../../images/pulcera2.jpg';
export default function Band() {

    const [mainPhoto, setMainPhoto] = useState(BandaA);
    return (
        <Grid className="band">
            <Grid.Row>
                <Grid.Column width={3} className="logo">
                    <img src={Logo} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column verticalAlign="middle" width={2} className="thumbnail">
                    <div className="square" onClick={ () => setMainPhoto(BandaA)}>
                        <img src={BandaA}/>
                    </div>
                    <div className="square" onClick={ () => setMainPhoto(BandaA)}>
                        <img src={BandaA}/>
                    </div>
                    <div className="square" onClick={ () => setMainPhoto(BandaA)}>
                        <img src={BandaA}/>
                    </div>
                    <div className="square" onClick={ () => setMainPhoto(BandaA)}>
                        <img src={BandaA}/>
                    </div>
                </Grid.Column>
                <Grid.Column width={8}>
                    <img src={mainPhoto} />
                </Grid.Column>
                <Grid.Column width={5} verticalAlign="middle">
                    <Grid.Row>
                        <h1>Banda CuidaMed</h1>
                    </Grid.Row>
                    <Grid.Row className="price">
                        <Grid.Column><span>$750.00</span></Grid.Column>
                        <Grid.Column><Button>Comprar</Button></Grid.Column>
                    </Grid.Row>
                    <Grid.Row className="included">
                        <p>Incluye 6 meses de servicio cuidamed.</p>
                    </Grid.Row>
                    <Grid.Row className="colors">
                        <Grid.Row>
                            <span>Colores</span>
                        </Grid.Row>
                        <Grid.Row>
                            <div className="circle blue" onClick={ () => setMainPhoto(BandaA)}></div>
                            <div className="circle green" onClick={ () => setMainPhoto(BandaV)}></div>
                        </Grid.Row>
                    </Grid.Row>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
