import React, { useState, useEffect } from "react";
import { Container, Grid, Button } from "semantic-ui-react";

import { Medico } from "../../images/icons/icons";
import { CustomInput } from "../inputsCustom/CustomInput";

import { useHistory } from 'react-router-dom';
import { createContactoMedico } from '../../redux/actions/UserAction';
import { useDispatch } from 'react-redux';
import { CONECTION } from '../../conection';

export default function MedicalContact() {

  useEffect(() => {
    fetch(`${CONECTION}api/medics`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'x-auth-token': localStorage.getItem('refreshToken'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
          let array = [];
          data.data.map((item) => {
            //console.log(item);
            let obj = {
              fullName: item.name,
              email: item.city,
              phone: item.phone,
              specialty: item.specialty,
            };
            array = [...array, obj];

          });
          setContacts(array);

        }
      });
  }, [])
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    specialty: "",
  });

  const [contacts, setContacts] = useState([]);
  const { fullName, email, phone, specialty } = formValues;

  const dispatch = useDispatch();
  const history = useHistory();

  const handleContact = () => {
    let array = contacts;
    let obj = {
      fullName: formValues.fullName,
      email: formValues.email,
      phone: formValues.phone,
      specialty: formValues.specialty,
    };
    array = [...array, obj];
    setContacts(array);

    const sendFormValues = {
      name: formValues.fullName,
      specialty: formValues.specialty,
      phone: formValues.phone,
      city: formValues.email,
    }

    dispatch(createContactoMedico(sendFormValues, history));

    setFormValues({ ...formValues, fullName: '', email: '', phone: '', specialty: '' })


  };

  useEffect(() => {
    console.log(formValues);
  }, [formValues])

  return (
    <Container className="medical-contact">
      <Grid centered>
        <Grid.Row>
          <h1 className="title">Historial Médico</h1>
        </Grid.Row>
        <Grid.Row className="subtitle">
          <h2>Contactos de médicos</h2>
        </Grid.Row>
        <Grid.Row className="icon">
          <Medico />
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={15} tablet={15} mobile={12} className='data-contact'>
            <CustomInput
              placeholder="Nombre completo"
              type="text"
              setValue={(e) => setFormValues({ ...formValues, fullName: e })}
              value={fullName}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column computer={5} tablet={5} mobile={12} className='data-contact'>
            <CustomInput
              placeholder="E-mail"
              type="email"
              setValue={(e) => setFormValues({ ...formValues, email: e })}
              value={email}
            />
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={12} className='data-contact'>
            <CustomInput
              placeholder="Teléfono"
              type="text"
              setValue={(e) => setFormValues({ ...formValues, phone: e })}
              value={phone}
            />
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={12} className='data-contact'>
            <CustomInput
              placeholder="Especialidad"
              type="text"
              setValue={(e) => setFormValues({ ...formValues, specialty: e })}
              value={specialty}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className='btn-add'>
          <Grid.Column width={15} tablet={15} mobile={12}>
            <Button onClick={() => handleContact()}>Agregar contacto</Button>
          </Grid.Column>
        </Grid.Row>

        {contacts.map(({ fullName, email, phone, specialty }, i) => (
          <>
            <Grid.Row columns={1} className='data-name'> 
              <Grid.Column computer={8} tablet={8} mobile={12} className="disabled">
                <CustomInput placeholder="Nombre completo" type="text" value={fullName} disabled />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column computer={5} tablet={5} mobile={12} className="disabled">
                <CustomInput placeholder="E-mail" type="email" value={email} disabled />
              </Grid.Column>
              <Grid.Column computer={5} tablet={5} mobile={12} className="disabled">
                <CustomInput placeholder="Teléfono" type="text" value={phone} disabled />
              </Grid.Column>
              <Grid.Column computer={5} tablet={5} mobile={12} className="disabled">
                <CustomInput placeholder="Especialidad" type="text" value={specialty} disabled />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row >
              <Grid.Column computer={15} tablet={15} mobile={12} className="line"></Grid.Column>
            </Grid.Row>
          </>
        ))}
      </Grid>
    </Container>
  );
}
