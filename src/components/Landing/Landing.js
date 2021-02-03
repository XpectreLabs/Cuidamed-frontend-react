import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Grid, Button } from "semantic-ui-react";
import Logo from "../../images/CuidaMEDLogo.png";
import BandaA from "../../images/pulcera.jpg";
import BandaV from "../../images/pulcera2.jpg";

export default function Landing() {
  const history = useHistory();
  return (
    // <Container>
    <Grid className="landing" verticalAlign='top'>
      <Grid.Row centered className='logo'>
        <Grid.Column computer={5} tablet={7} mobile={10}>
          <img src={Logo} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row verticalAlign="middle" centered className='bands'>
        <Grid.Column computer={5} tablet={5} mobile={9} className="band">
          <img src={BandaA} />
        </Grid.Column>
        <Grid.Column computer={6} tablet={6} mobile={9}>
          <Grid.Row>
            <h1>Banda CuidaMed</h1>
          </Grid.Row>
          <Grid.Row>
            <Button
              onClick={() => history.push("/pulsera")}
              className="btn-secondary"
            >
              Conocer más
            </Button>
          </Grid.Row>
          <Grid.Row>
            <Button onClick={() => history.push("/login")} className="btn-main">
              Ya tengo cuidaband
            </Button>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column computer={5} tablet={5} mobile={9} className="band">
          <img src={BandaV} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    // </Container>
  );
}
