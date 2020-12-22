import React from 'react';
import { Container, Grid, Button } from 'semantic-ui-react';
import Logo from '../../images/CuidaMEDLogo.png';
import BandaA from '../../images/pulcera.jpg';
import BandaV from '../../images/pulcera2.jpg';

export default function Landing() {
    return (
        // <Container>
            <Grid className="landing">
                <Grid.Row centered>
                    <Grid.Column width={5}>
                        <img src={Logo} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row verticalAlign="middle">
                    <Grid.Column width={5} className="band">
                        <img src={BandaA} />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Grid.Row><h1>Banda CuidaMed</h1></Grid.Row>
                        <Grid.Row><Button className="btn-secondary">Conocer más</Button></Grid.Row>
                        <Grid.Row><Button className="btn-main">Ya tengo cuidaband</Button></Grid.Row>
                    </Grid.Column>
                        <Grid.Column width={5} className="band">
                            <img src={BandaV} />
                        </Grid.Column>
                </Grid.Row>
            </Grid>
        // </Container>
    )
}
