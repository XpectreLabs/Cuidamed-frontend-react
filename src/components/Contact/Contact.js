import React, { useState } from "react";
import { Container, Grid, Button } from "semantic-ui-react";

import { Contacto } from "../../images/icons/icons";
import { CustomInput } from "../inputsCustom/CustomInput";
import { SelectCustom } from "../inputsCustom/Select/Select";
import { relatives } from "./data";

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    relative: "",
  });
  const { fullName, email, phone, relative } = formValues;

  const handleContact = () => {
    let array = contacts;
    let obj = {
      fullName: formValues.fullName,
      email: formValues.email,
      phone: formValues.phone,
      relative: formValues.relative,
    };
    array = [...array, obj];
    setContacts(array);
    setFormValues({
      ...formValues,
      fullName: "",
      email: "",
      phone: "",
      relative: "",
    });
  };

  return (
    <Container className="medical-contact">
      <Grid centered>
        <Grid.Row>
          <h1 className="title">Historial Médico</h1>
        </Grid.Row>
        <Grid.Row className="subtitle">
          <h2>Contactos de emergencia</h2>
        </Grid.Row>
        <Grid.Row className="icon">
          <Contacto />
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={15}>
            <CustomInput
              placeholder="Nombre completo"
              type="text"
              setValue={(e) => setFormValues({ ...formValues, fullName: e })}
              value={fullName}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column width={5}>
            <CustomInput
              placeholder="E-mail"
              type="text"
              setValue={(e) => setFormValues({ ...formValues, email: e })}
              value={email}
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <CustomInput
              placeholder="Teléfono"
              type="text"
              setValue={(e) => setFormValues({ ...formValues, phone: e })}
              value={phone}
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <SelectCustom
              placeholder="Parentesco"
              dataOptions={relatives}
              setValue={(e) => setFormValues({ ...formValues, relative: e })}
              value={relative}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={15}>
            <Button onClick={() => handleContact()}>Agregar contacto</Button>
          </Grid.Column>
        </Grid.Row>

        {contacts.map(({ fullName, email, phone, relative }, i) => (
          <>
            <Grid.Row columns={1}>
              <Grid.Column width={8} className="disabled">
                <CustomInput
                  placeholder="Nombre completo"
                  type="text"
                  value={fullName}
                  disabled
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column width={5} className="disabled">
                <CustomInput
                  placeholder="E-mail"
                  type="email"
                  value={email}
                  disabled
                />
              </Grid.Column>
              <Grid.Column width={5} className="disabled">
                <CustomInput
                  placeholder="Teléfono"
                  type="text"
                  value={phone}
                  disabled
                />
              </Grid.Column>
              <Grid.Column width={5} className="disabled">
                <CustomInput
                  placeholder="Parentesco"
                  type="text"
                  value={relative}
                  disabled
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={15} className="line"></Grid.Column>
            </Grid.Row>
          </>
        ))}
      </Grid>
    </Container>
  );
}
