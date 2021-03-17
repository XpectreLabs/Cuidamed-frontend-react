import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Button } from "semantic-ui-react";
import Logo from "../../images/CuidaMEDLogo.png";
import BandaA from "../../images/pulcera.jpg";
import BandaV from "../../images/pulcera2.jpg";

import {findImageByType} from './images';

export default function Band() {
  const [mainPhoto, setMainPhoto] = useState(BandaA);
  const [ type, setType ] = useState('blue');
  const [images,setImages] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const bands = findImageByType(type); 
    setImages(bands);
    setMainPhoto(bands[0].image);
  }, [type]);

  return (
    <Grid className="band" centered>
      <Grid.Row>
        <Grid.Column computer={3} tablet={5} mobile={10} className="logo">
          <a href='/landing' className="obo">
            <img src={Logo} className="obo2" alt='Logo' />
          </a>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row verticalAlign='middle custom-strt'>
        <Grid.Column verticalAlign="middle" computer={2} tablet={2} mobile={3} className="thumbnail">
          {images.map((val) => (
            <div className="square" onClick={() => setMainPhoto(val.image)}>
              <img className="imgBand" src={val.image} alt='Img Band'/>
            </div>
          ))}
        </Grid.Column>
        <Grid.Column computer={8} tablet={8} mobile={12}>
          <img src={mainPhoto} alt='Img Band' className="opacity_effect"/>
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
                onClick={() => setType('blue')}
              ></div>
              <div
                className="circle black"
                onClick={() => setType('black')}
              ></div>
            </Grid.Row>
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
