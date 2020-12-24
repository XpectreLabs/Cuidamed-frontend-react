import React from "react";
import { Container, Grid, Icon, Card, Image, Button } from "semantic-ui-react";
import Logo from "../../images/CuidaMEDLogo.png";
import Profile from "../../images/profile.jpg";
import {
  IconMapa,
  IconDiseases,
  IconContact,
  AlergiasWhite,
  IconAltura,
  IconPeso,
  IconOcupacion,
} from "../../images/icons/icons";
import FlagMexico from "../../images/Flag-Mexico.png";

export default function Resume() {
  return (
    <Container>
      <Grid className="resume" centered>
        <Grid.Row className="logo">
          <Grid.Column computer={4} tablet={8} mobile={12}>
            <img src={Logo} alt="Logo cuidamed" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="profile" centered>
          <Grid.Column
            computer={4}
            tablet={8}
            mobile={8}
            textAlign="center"
            className="figcaption"
          >
            <img src={Profile} alt="Foto de perfil" />
            <div className="flag">
              <img src={FlagMexico} alt="flag-mexico" />
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="information">
          <p>Fabiola Castellanos Hernández</p>
        </Grid.Row>
        <Grid.Row className="information">
          <p>
            21 años <Icon fitted name="woman" />
          </p>
        </Grid.Row>
        <Grid.Row className="information font-gray">
          <p>
            <IconMapa /> Villahermosa, Tabasco.
          </p>
        </Grid.Row>
        <Grid.Row className="information font-gray">
          <p>Tipo de sangre A+</p>
        </Grid.Row>
        <Grid.Row className="diseases">
          <Grid.Column mobile={15}>
            <Grid.Row className="title" verticalAlign="middle">
              <Grid.Column verticalAlign="middle">
                <IconDiseases />
                <span>Enfermedades</span>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="box">
              <Grid.Column>
                <h3>Diabetes</h3>
              </Grid.Column>
              <Grid.Column>
                <Button>Ver más</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="diseases">
          <Grid.Column mobile={15}>
            <Grid.Row className="title" verticalAlign="middle">
              <Grid.Column verticalAlign="middle">
                <AlergiasWhite />
                <span>Alergias</span>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="box">
              <Grid.Column mobile={4}>
                <h3>Polen</h3>
              </Grid.Column>
              <Grid.Column mobile={8}>
                <Button>Ver más</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="diseases">
          <Grid.Column mobile={15}>
            <Grid.Row className="title" verticalAlign="middle">
              <Grid.Column verticalAlign="middle">
                <IconContact />
                <span className="sm-text">Contactos de emergencia</span>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="box">
              <Grid.Column>
                <h3>
                  Mario <a href="tel:+521234567890">+52 123 4567 890</a>
                </h3>
              </Grid.Column>
              <Grid.Column mobile={8}>
                <Button>Ver más</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="diseases">
          <Grid.Column mobile={15}>
            <Grid.Row className="title" verticalAlign="middle">
              <Grid.Column verticalAlign="middle">
                <span>Otros datos</span>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="box">
              <div className="other-information">
                <Grid.Column mobile={6}>
                  <IconAltura />
                </Grid.Column>
                <Grid.Column mobile={10}>
                  <h5>Estatura</h5>
                  <p>1.68m / 66in</p>
                </Grid.Column>
              </div>
              <div className="other-information">
                <Grid.Column mobile={6}>
                  <IconPeso />
                </Grid.Column>
                <Grid.Column mobile={10}>
                  <h5>Peso</h5>
                  <p>72kg / 158lb</p>
                </Grid.Column>
              </div>
              <div className="other-information">
                <Grid.Column mobile={6}>
                  <IconOcupacion />
                </Grid.Column>
                <Grid.Column mobile={10}>
                  <h5>Ocupación</h5>
                  <p>Luchadora peso medio</p>
                </Grid.Column>
              </div>
            </Grid.Row>
          </Grid.Column>
          {/* <Grid.Column mobile={4}>
            <IconAltura />
          </Grid.Column> */}
          {/* <Grid.Column mobile={4}>
            <Grid.Row>
            asdasdasd
            </Grid.Row>
            <Grid.Row>
            asdasdasd
            </Grid.Row>
            <Grid.Row>
            asdasdasd
            </Grid.Row>
          </Grid.Column> */}
        </Grid.Row>
      </Grid>
    </Container>
  );
}
