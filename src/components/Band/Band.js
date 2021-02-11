import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Button } from "semantic-ui-react";
import Logo from "../../images/CuidaMEDLogo.png";
import BandaA from "../../images/pulcera.jpg";
import BandaV from "../../images/pulcera2.jpg";
export default function Band() {
  const [mainPhoto, setMainPhoto] = useState(BandaA);
  const history = useHistory();
  return (
    <Grid className="band" centered>
      <Grid.Row>
        <Grid.Column computer={3} tablet={5} mobile={10} className="logo">
          <a href='/landing' className="obo">
            <img src={Logo} className="obo2" />
          </a>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row verticalAlign='middle'>
        <Grid.Column verticalAlign="middle" computer={2} tablet={2} mobile={3} className="thumbnail">
          <div className="square" onClick={() => setMainPhoto(BandaA)}>
            <img src={BandaA} />
          </div>
          <div className="square" onClick={() => setMainPhoto(BandaA)}>
            <img src={BandaA} />
          </div>
          <div className="square" onClick={() => setMainPhoto(BandaA)}>
            <img src={BandaA} />
          </div>
          <div className="square" onClick={() => setMainPhoto(BandaA)}>
            <img src={BandaA} />
          </div>
        </Grid.Column>
        <Grid.Column computer={8} tablet={8} mobile={12}>
          <img src={mainPhoto} />
        </Grid.Column>
        <Grid.Column computer={5} tablet={5} mobile={15} verticalAlign="middle">
          <Grid.Row>
            <h1 className='title'>Banda CuidaMed</h1>
          </Grid.Row>
          <Grid.Row className="price">
            <Grid.Column>
              <span>$750.00</span>
            </Grid.Column>
            <Grid.Column>
              <Button onClick={() => history.push("/personalizar-placa")}>
                Comprar
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="included">
            <p>Incluye 6 meses de servicio cuidamed.</p>
          </Grid.Row>
          <Grid.Row className="colors">
            <Grid.Row>
              <span>Colores</span>
            </Grid.Row>
            <Grid.Row>
              <div
                className="circle blue"
                onClick={() => setMainPhoto(BandaA)}
              ></div>
              <div
                className="circle green"
                onClick={() => setMainPhoto(BandaV)}
              ></div>
            </Grid.Row>
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
