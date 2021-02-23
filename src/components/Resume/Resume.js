import React, { useEffect, useState } from "react";
import { Container, Grid, Icon, Button } from "semantic-ui-react";
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
import { CONECTION } from '../../conection';
import { Modal } from 'semantic-ui-react';

import Card from './Card';
import CardPhone from './CardPhone';

//moment
import Moment from 'react-moment';
import 'moment/locale/es';

export default function Resume() {

  const history = useHistory();
  const { typePerson } = history.location.state;
  const { name, birth_date, sex, place, type_blood, ocupation, weight, height, id } = JSON.parse(localStorage.getItem('emergency'));
  const [isMedic, setIsMedic] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isVisible,setIsVisible] = useState(false);

  const [formValues, setFormValues] = useState({
    covid: [],
    diseases: [],
    allergies: [],
    emergencyContact: [],
    organDonor: '',
    vacunas: [],
    cirujias: [],
    transfunciones: [],
    discapacidad: [],
    medicalContact: [],
    seguros: [],
    ginecologia: [],
    fracturas: [],
    others: [],
  });

  useEffect(() => {
    if (typePerson === 'medico') {
      setIsMedic(true);
    }
  }, [typePerson])

  useEffect(() => {
    fetch(`${CONECTION}api/historial/folder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${localStorage.getItem('token')}`,
        // 'x-auth-token': localStorage.getItem('refreshToken'),
      },
      body: JSON.stringify({ id })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          const values = data.data;
          console.log(data.data);
          const newDesases = values[13].map((item, index) => {
            return item.illnessId;
          });
          const newSeguros = values[3].map((item, index) => {
            item.name = item.aseguradora
            return item;
          });
          const newOrganDonor = data.data[6][0].haveYouTransferredBlood;
          setFormValues({
            ...formValues,
            covid: values[11],
            diseases: newDesases,
            allergies: values[10],
            emergencyContact: values[4],
            organDonor: newOrganDonor === 'YES' ? true : false,
            vacunas: values[1],
            cirujias: values[8],
            transfunciones: values[12],
            discapacidad: values[9],
            medicalContact: values[5],
            seguros: newSeguros,
            ginecologia: values[2][0],
            fracturas: values[14],
            others: values[15]

          });
        }
      })
  }, [])


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
              {formValues.covid.length > 0 && (
                <Grid.Row>
                  <Grid.Row>
                    <p>Ha tenido, {formValues.covid.length} {formValues.covid.length === 1 ? 'vez' : 'veces'}
                      {formValues.covid.map((item, index) =>
                        <span key={index} ><Moment date={item.year} locale="es" format="LL" /></span>
                      )}
                      {/* <span>02/09/2020</span>
                    <span>12/10/2020</span> */}
                    </p>
                    <p class="btn_tratamientos" onClick={() => setIsVisible(true)}><u>Tratamiento</u></p>
                  </Grid.Row>

                </Grid.Row>
              )}
              {formValues.covid.length === 0 && (
                <Grid.Row>
                  <Grid.Row>
                    <p>No ha tenido Covid</p>
                  </Grid.Row>
                </Grid.Row>
              )}
            </Grid.Column>
          </Grid.Row>

        )}
        <Card
          icon={<IconDiseases />}
          title={'Enfermedades'}
          arrayData={formValues.diseases}

        />
        <Card
          icon={<AlergiasWhite />}
          title={'Alergias'}
          arrayData={formValues.allergies}
        />
        <CardPhone
          icon={<IconContact />}
          title={'Contactos de emergencia'}
          arrayData={formValues.emergencyContact}
        />
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
                    <h3>{formValues.organDonor ? 'SÍ' : 'NO'}</h3>
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
            <Card
              icon={<IconVacunaWhite />}
              title={'Vacunas'}
              arrayData={formValues.vacunas}
            />
            <Card
              icon={<BisturiWhite />}
              title={'Cirugías'}
              arrayData={formValues.cirujias}
            />
            <Card
              icon={<FracturaWhite />}
              title={'Fracturas'}
              arrayData={formValues.fracturas}
            />
            <Grid.Row className="diseases">
              <Grid.Column mobile={15}>
                <Grid.Row className="title" verticalAlign="middle">
                  <Grid.Column verticalAlign="middle">
                    <UnidadSangreWhite />
                    <span>Transfusiones</span>
                  </Grid.Column>
                  {/* <Label floating>2</Label> */}
                </Grid.Row>
                <Grid.Row className="box">
                  <Grid.Column mobile={4}>
                    {formValues.transfunciones.length > 0 && (
                      <h3>Sí, { formValues.transfunciones.length} {formValues.transfunciones.length === 1 ? 'vez' : 'veces'} </h3>
                    )}
                    {formValues.transfunciones.length === 0 && (
                      <h3>No</h3>
                    )}
                  </Grid.Column>
                  <Grid.Column mobile={8}>
                    {/* <Button>Ver más</Button> */}
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
            <Card
              icon={<SillaWhite />}
              title={'Discapacidad'}
              arrayData={formValues.discapacidad}
            />
            <Card
              icon={<ProtesisWhite />}
              title={'Dispositivos'}
              arrayData={formValues.others}

            />
            {sex === 'F' && (
              <Grid.Row className="diseases">
                <Grid.Column mobile={15}>
                  <Grid.Row className="title" verticalAlign="middle">
                    <Grid.Column verticalAlign="middle">
                      <MujerWhite />
                      <span>Ginecología</span>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className="box">
                    <Grid.Column mobile={4}>
                      {!isShow && (
                        <h3>Menstruación: {formValues.ginecologia.has_menstruation === 'NOT_HAD' ? 'Ya no la tiene' : 'La tiene'}</h3>
                      )}
                      {isShow && (
                        <>
                          <h3>Menstruación: {formValues.ginecologia.has_menstruation === 'NOT_HAD' ? 'Ya no la tiene' : 'La tiene'}</h3>
                          <h3>embarazos: {formValues.ginecologia.embarazos}</h3>
                          <h3>partos: {formValues.ginecologia.partos}</h3>
                          <h3>abortos: {formValues.ginecologia.abortos}</h3>
                        </>
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
            )}
            <CardPhone
              icon={<MedicoWhite />}
              title={'Contactos médicos'}
              arrayData={formValues.medicalContact}
            />
            <CardPhone
              icon={<SeguroMedicoWhite />}
              title={'Seguros'}
              arrayData={formValues.seguros}
            />
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
      <Modal open={isVisible} onClose={() => setIsVisible(false)}>
        <Modal.Content>
            <div className="treatment_covid">
                <h1>Tratamientos</h1>
                <ul className="treatment__ul"> 
                    {formValues.covid.map((item, index) =>
                      <li key={index} >{item.name}</li>
                    )}
                </ul>        
            </div>           
        </Modal.Content>
      </Modal>
    </Container>
  );
}
