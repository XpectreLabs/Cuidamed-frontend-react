import React, { useState } from "react";
import { Container, Grid, Button } from "semantic-ui-react";

import { Pastillas } from "../../images/icons/icons";
import { CustomInput } from "../inputsCustom/CustomInput";
import Date from "../inputsCustom/Date/Date";

export default function Treatment() {
  const [treatment, setTreatment] = useState([]);
  const [formValues, setFormValues] = useState({
    medicine: "",
    dose: "",
    frequency: "",
    starts: "",
    ends: "",
  });
  const { medicine, dose, frequency, starts, ends } = formValues;

  const handleTreatment = () => {
    let array = treatment;
    let obj = {
      medicine: formValues.medicine,
      dose: formValues.dose,
      frequency: formValues.frequency,
      starts: formValues.starts,
      ends: formValues.ends,
    };
    array = [...array, obj];
    setTreatment(array);
    setFormValues({
      ...formValues,
      medicine: "",
      dose: "",
      frequency: "",
      starts: "",
      ends: "",
    });
  };

  return (
    <Container className="medical-contact">
      <Grid centered>
        <Grid.Row>
          <h1 className="title">Historial Médico</h1>
        </Grid.Row>
        <Grid.Row className="subtitle">
          <h2>Tratamiento actual</h2>
        </Grid.Row>
        <Grid.Row className="icon">
          <Pastillas />
        </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column width={5}>
            <CustomInput
              placeholder="Medicamento/Suplemento"
              type="text"
              setValue={(e) => setFormValues({ ...formValues, medicine: e })}
              value={medicine}
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <CustomInput
              placeholder="Dosis"
              type="text"
              setValue={(e) => setFormValues({ ...formValues, dose: e })}
              value={dose}
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <CustomInput
              placeholder="Frecuencia"
              type="text"
              setValue={(e) => setFormValues({ ...formValues, frequency: e })}
              value={frequency}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2} centered>
          <Grid.Column width={5}>
            <Date
              placeholder="Fecha de inicio"
              id="inicio"
              setValue={(e) => setFormValues({ ...formValues, starts: e })}
              value={starts}
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <Date
              placeholder="Fecha de término"
              id="termino"
              setValue={(e) => setFormValues({ ...formValues, ends: e })}
              value={ends}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={15}>
            <Button onClick={() => handleTreatment()}>
              Agregar tratamiento
            </Button>
          </Grid.Column>
        </Grid.Row>
        {treatment.map(({ medicine, dose, frequency, starts, ends }, i) => (
          <>
            <Grid.Row columns={3}>
              <Grid.Column width={5} className="disabled">
                <CustomInput
                  placeholder="Medicamento/Suplemento"
                  type="text"
                  value={medicine}
                  disabled
                />
              </Grid.Column>
              <Grid.Column width={5} className="disabled">
                <CustomInput
                  placeholder="Dosis"
                  type="text"
                  value={dose}
                  disabled
                />
              </Grid.Column>
              <Grid.Column width={5} className="disabled">
                <CustomInput
                  placeholder="Frecuencia"
                  type="text"
                  value={frequency}
                  disabled
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2} centered>
              <Grid.Column width={5} className="disabled">
                <CustomInput
                  placeholder="Fecha de inicio"
                  type="text"
                  value={starts}
                  disabled
                />
              </Grid.Column>
              <Grid.Column width={5} className="disabled">
                <CustomInput
                  placeholder="Fecha de término"
                  type="text"
                  value={ends}
                  disabled
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={6} className="line"></Grid.Column>
            </Grid.Row>
          </>
        ))}
      </Grid>
    </Container>
  );
}
