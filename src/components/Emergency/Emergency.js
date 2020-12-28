import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import Logo from "../../images/CuidaMEDLogo.png";
import { Medico } from "../../images/icons/icons";
import { CustomInput } from "../inputsCustom/CustomInput";
import { Link } from 'react-router-dom';

export default function Emergency() {
  const [isMedic, setIsMedic] = useState(null);

  function Medic(props) {
    let isMedic = props.ismedic;
    if (isMedic) {
      return (
        <>
          <Grid.Row className="contact-information">
            <Grid.Column mobile={14} computer={6} tablet={10}>
              <CustomInput placeholder="Cédula profesional" type="text" />
            </Grid.Column>
            <Grid.Column mobile={14} computer={6} tablet={10}>
              <CustomInput placeholder="Número telefónico" type="number" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="next">
            <Grid.Column mobile={14} computer={6} tablet={10}>
              <Link to={'/resumen'}>
                <Button>Seguir</Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </>
      );
    } else if (isMedic === false) {
      return (
        <>
          <Grid.Row className="contact-information">
            <Grid.Column mobile={14} computer={6} tablet={10}>
              <CustomInput placeholder="Nombre" type="text" />
            </Grid.Column>
            <Grid.Column mobile={14} computer={6} tablet={10}>
              <CustomInput placeholder="Número telefónico" type="number" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="next">
            <Grid.Column mobile={14} computer={6} tablet={10}>
            <Link to={'/resumen'}>
              <Button>Seguir</Button>
            </Link>
            </Grid.Column>
          </Grid.Row>
        </>
      );
    }

    return null;
  }

  return (
    <Grid className="emergency" centered>
      <Grid.Row className="logo">
        <Grid.Column computer={4} tablet={8} mobile={12}>
          <img src={Logo} alt="Logo cuidamed" />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="title">
        <h1>Emergencia</h1>
      </Grid.Row>
      <Grid.Row className="icon">
        <Medico />
      </Grid.Row>
      <Grid.Row className="question">
        <h3>¿Eres médico o paramédico?</h3>
      </Grid.Row>
      <Grid.Row className="answers">
        <Grid.Column mobile={5} computer="2" tablet="6">
          <Button onClick={() => setIsMedic(true)}>Si</Button>
        </Grid.Column>
        <Grid.Column mobile={5} computer="2" tablet="6">
          <Button onClick={() => setIsMedic(false)}>No</Button>
        </Grid.Column>
      </Grid.Row>
      <Medic ismedic={isMedic} />
    </Grid>
  );
}
