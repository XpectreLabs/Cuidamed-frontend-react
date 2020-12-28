import React, { useEffect, useState } from "react";
import { Container, Grid, Icon, Button, Label } from "semantic-ui-react";
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
  IconDonadorWhite,
  IconVacunaWhite,
  BisturiWhite,
  FracturaWhite,
  UnidadSangreWhite,
  SillaWhite,
  ProtesisWhite,
  MujerWhite,
  MedicoWhite,
  SeguroMedicoWhite,
} from "../../images/icons/icons";
import FlagMexico from "../../images/Flag-Mexico.png";
import { useHistory } from 'react-router-dom';

export default function Resume() {

  const history = useHistory();
  const { typePerson } = history.location.state;
  const { name, birth_date, sex, place, type_blood, ocupation, weight, height } = JSON.parse(localStorage.getItem('emergency'));
  const [isMedic, setIsMedic] = useState(false);

  useEffect(() => {
    if (typePerson === 'medico') {
      setIsMedic(true);
    }
  }, [typePerson])




  function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return edad;
  }

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
          <p>{name}</p>
        </Grid.Row>
        <Grid.Row className="information">
          <p>
            {calcularEdad(birth_date)} años <Icon fitted name={sex === 'F' ? 'woman' : 'men'} />
          </p>
        </Grid.Row>
        <Grid.Row className="information font-gray">
          <p>
            <IconMapa /> {place}
          </p>
        </Grid.Row>
        <Grid.Row className="information font-gray">
          <p>Tipo de sangre {type_blood}</p>
        </Grid.Row>
        {isMedic && (
          <Grid.Row className="covid">
            <Grid.Column>
              <Grid.Row>
                <h3>Covid 19:</h3>
              </Grid.Row>
              <Grid.Row>
                <Grid.Row>
                  <p>Ha tenido, 2 veces
              <span>02/09/2020</span>
                    <span>12/10/2020</span>
                  </p>
                  <p><u>Tratamiento</u></p>
                </Grid.Row>

              </Grid.Row>

            </Grid.Column>
          </Grid.Row>

        )}
        <Grid.Row className="diseases">
          <Grid.Column mobile={15}>
            <Grid.Row className="title" verticalAlign="middle">
              <Grid.Column verticalAlign="middle">
                <IconDiseases />
                <span>Enfermedades</span>
              </Grid.Column>
              <Label floating>2</Label>
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
              <Label floating>2</Label>
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
              <Label floating>2</Label>
            </Grid.Row>
            <Grid.Row className="box">
              <Grid.Column>
                <h3>
                  Mario <br /><a href="tel:+521234567890">+52 123 4567 890</a>
                </h3>
              </Grid.Column>
              <Grid.Column mobile={8}>
                <Button>Ver más</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
        {isMedic && (
          <>
            <Grid.Row className="diseases">
              <Grid.Column mobile={15}>
                <Grid.Row className="title" verticalAlign="middle">
                  <Grid.Column verticalAlign="middle">
                    <IconDonadorWhite />
                    <span>Donador de órganos</span>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="box">
                  <Grid.Column mobile={4}>
                    <h3>Si</h3>
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="diseases">
              <Grid.Column mobile={15}>
                <Grid.Row className="title" verticalAlign="middle">
                  <Grid.Column verticalAlign="middle">
                    <IconVacunaWhite />
                    <span>Vacunas</span>
                  </Grid.Column>
                  <Label floating>2</Label>
                </Grid.Row>
                <Grid.Row className="box">
                  <Grid.Column mobile={4}>
                    <h3>Influenza</h3>
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
                    <BisturiWhite />
                    <span>Cirugías</span>
                  </Grid.Column>
                  <Label floating>2</Label>
                </Grid.Row>
                <Grid.Row className="box">
                  <Grid.Column mobile={4}>
                    <h3>Húmero brazo izquierdo</h3>
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
                    <FracturaWhite />
                    <span>Fracturas</span>
                  </Grid.Column>
                  <Label floating>2</Label>
                </Grid.Row>
                <Grid.Row className="box">
                  <Grid.Column mobile={4}>
                    <h3>Cúbito</h3>
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
                    <UnidadSangreWhite />
                    <span>Transfusiones</span>
                  </Grid.Column>
                  <Label floating>2</Label>
                </Grid.Row>
                <Grid.Row className="box">
                  <Grid.Column mobile={4}>
                    <h3>Si, 2 veces</h3>
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
                    <SillaWhite />
                    <span>Discapacidad</span>
                  </Grid.Column>
                  <Label floating>2</Label>
                </Grid.Row>
                <Grid.Row className="box">
                  <Grid.Column mobile={4}>
                    <h3>Visual</h3>
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
                    <ProtesisWhite />
                    <span>Dispositivos</span>
                  </Grid.Column>
                  <Label floating>2</Label>
                </Grid.Row>
                <Grid.Row className="box">
                  <Grid.Column mobile={4}>
                    <h3>Clavo en el brazo izquierdo</h3>
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
                    <MujerWhite />
                    <span>Ginecología</span>
                  </Grid.Column>
                  <Label floating>2</Label>
                </Grid.Row>
                <Grid.Row className="box">
                  <Grid.Column mobile={4}>
                    {/* <h3>Polen</h3> */}
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
                    <MedicoWhite />
                    <span>Contactos médicos</span>
                  </Grid.Column>
                  <Label floating>2</Label>
                </Grid.Row>
                <Grid.Row className="box">
                  <Grid.Column mobile={4}>
                    {/* <h3>Polen</h3> */}
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
                    <SeguroMedicoWhite />
                    <span>Seguros</span>
                  </Grid.Column>
                  <Label floating>2</Label>
                </Grid.Row>
                <Grid.Row className="box">
                  <Grid.Column mobile={4}>
                    {/* <h3>Polen</h3> */}
                  </Grid.Column>
                  <Grid.Column mobile={8}>
                    <Button>Ver más</Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </>
        )}
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
                  <p>{height}</p>
                </Grid.Column>
              </div>
              <div className="other-information">
                <Grid.Column mobile={6}>
                  <IconPeso />
                </Grid.Column>
                <Grid.Column mobile={10}>
                  <h5>Peso</h5>
                  <p>{weight}</p>
                </Grid.Column>
              </div>
              <div className="other-information">
                <Grid.Column mobile={6}>
                  <IconOcupacion />
                </Grid.Column>
                <Grid.Column mobile={10}>
                  <h5>Ocupación</h5>
                  <p>{ocupation}</p>
                </Grid.Column>
              </div>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
