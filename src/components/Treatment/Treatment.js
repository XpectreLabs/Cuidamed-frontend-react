import React, { useState, useEffect } from "react";

import { Container, Grid, Button } from "semantic-ui-react";

import { Pastillas } from "../../images/icons/icons";
import { CustomInput } from "../inputsCustom/CustomInput";
import Date from "../inputsCustom/Date/Date";
import TreatmentChild from "./TreatmentChild";
//import {} from '../'

import { useHistory } from 'react-router-dom';
import { createTratamiento } from '../../redux/actions/UserAction';
import { useDispatch,useSelector } from 'react-redux';
import { CONECTION } from '../../conection';
import { types } from "../../redux/types";

export default function Treatment() {
  const state = useSelector( state => state.user.treatment );
  const dispatch = useDispatch();
  const history = useHistory();

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
        if (data.data) {
          let array = [];
          data.data.map((item) => {
            let obj = {
              id:item.id,
              medicamento: item.medicamento,
              dosis: item.dosis,
              frecuencia: item.frecuencia,
              fecha_inicio: item.fecha_inicio,
              fecha_fin: item.fecha_fin,
            };
            array = [...array, obj];
          });
          // setTreatment(array);
          dispatch({type:types.getTreatment,payload:array});

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

  useEffect(() => {
    console.log(treatment);
  }, [treatment])
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
        <Grid.Row columns={3} className='treatment'>
          <Grid.Column computer={5} tablet={4} mobile={15}>
            <CustomInput
              placeholder="Medicamento/Suplemento"
              type="text"
              setValue={(e) => setFormValues({ ...formValues, medicine: e })}
              value={medicine}
            />
          </Grid.Column>
          <Grid.Column computer={5} tablet={4} mobile={15}>
            <CustomInput
              labelPlaceholder="Dosis"
              placeholder="Dosis. Ej. 10 ml"
              type="text"
              setValue={(e) => setFormValues({ ...formValues, dose: e })}
              value={dose}
            />
          </Grid.Column>
          <Grid.Column computer={5} tablet={4} mobile={15}>
            <CustomInput
              labelPlaceholder="Frecuencia"
              placeholder="Frecuencia. Ej. C/24hrs"
              type="text"
              setValue={(e) => setFormValues({ ...formValues, frequency: e })}
              value={frequency}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2} centered className='dates'>
          <Grid.Column computer={5} tablet={4} mobile={15}>
            <Date
              placeholder="Fecha de inicio"
              id="inicio"
              setValue={(e) => setFormValues({ ...formValues, starts: e })}
              value={starts}
            />
          </Grid.Column>
          <Grid.Column computer={5} tablet={4} mobile={15}>
            <Date
              placeholder="Fecha de término"
              id="termino"
              setValue={(e) => setFormValues({ ...formValues, ends: e })}
              value={ends}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={15} tablet={13} mobile={15}>
            <Button onClick={() => handleTreatment()}>
              Agregar tratamiento
            </Button>
          </Grid.Column>
        </Grid.Row>
        {state.map((item, i) => {
          return (
            <TreatmentChild key={i} {...item} />
          )
        })}
      </Grid>
    </Container>
  );
}
