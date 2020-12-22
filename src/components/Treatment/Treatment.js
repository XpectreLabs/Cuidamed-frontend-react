import React, { useState, useEffect } from "react";

import { Container, Grid, Button } from "semantic-ui-react";

import { Pastillas } from "../../images/icons/icons";
import { CustomInput } from "../inputsCustom/CustomInput";
import Date from "../inputsCustom/Date/Date";
import TreatmentChild from "./TreatmentChild";

import { useHistory } from 'react-router-dom';
import { createTratamiento } from '../../redux/actions/UserAction';
import { useDispatch } from 'react-redux';
import { CONECTION } from '../../conection';

export default function Treatment() {

  useEffect(() => {
    fetch(`${CONECTION}api/tratamientos`, {
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
          data.data.map((item) => {
            console.log(item);
            let array = treatment;
            let obj = {
              medicine: item.medicamento,
              dose: item.dosis,
              frequency: item.frecuencia,
              starts: item.fecha_inicio,
              ends: item.fecha_fin,
            };
            //array = [...array, obj];
            setTreatment([...treatment, obj]);
          });


        }
      });
  }, [])
  const [treatment, setTreatment] = useState([]);
  const [formValues, setFormValues] = useState({
    medicine: "",
    dose: "",
    frequency: "",
    starts: "",
    ends: "",
  });
  const { medicine, dose, frequency, starts, ends } = formValues;

  const dispatch = useDispatch();
  const history = useHistory();

  const handleTreatment = () => {
    let array = treatment;
    let obj = {
      medicine: formValues.medicine,
      dose: formValues.dose,
      frequency: formValues.frequency,
      starts: formValues.starts,
      ends: formValues.ends,
    };
    //array = [...array, obj];
    setTreatment([...treatment, obj]);

    const sendFormValues = {
      medicamento: formValues.medicine,
      dosis: formValues.dose,
      frecuencia: formValues.frequency,
      fecha_inicio: formValues.starts,
      fecha_fin: formValues.ends,
    }
    dispatch(createTratamiento(sendFormValues, history));
    setFormValues({
      ...formValues,
      medicine: "",
      dose: "",
      frequency: "",
      starts: null,
      ends: null,
    });
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
        {treatment.map((item, i) => {
          return (
            <TreatmentChild key={i} {...item} />
          )
        })}
      </Grid>
    </Container>
  );
}
