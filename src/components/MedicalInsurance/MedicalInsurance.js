import React, { useState, useEffect } from 'react';
import { Container, Grid, Button } from 'semantic-ui-react';
import { SeguroMedico } from '../../images/icons/icons';
import { CustomInput } from '../inputsCustom/CustomInput';
import { SelectCustom } from '../inputsCustom/Select/Select';
import { insuranceList } from './data';

import { useHistory } from 'react-router-dom';
import { createAseguradora } from '../../redux/actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import { CONECTION } from '../../conection';
import { types } from '../../redux/types';
import InsuranceElement from './InsuranceElement';

export default function MedicalInsurance() {
  const seguros = useSelector((state) => state.user.seguro);

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    fetch(`${CONECTION}api/seguros`, {
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
              aseguradora: item.aseguradora,
              poliza: item.poliza,
              phone: item.phone,
              id: item.id,
            };
            array = [...array, obj];
          });
          dispatch({ type: types.getSeguro, payload: array });
        }
      });
  }, []);

  const [insurance, setInsurance] = useState([]);
  const [formValues, setFormValues] = useState({
    insuranceCarrier: '',
    policy: '',
    phone: '',
  });

  const { insuranceCarrier, policy, phone } = formValues;

  const handleInsurance = () => {
    let array = insurance;
    let obj = {
      insuranceCarrier: formValues.insuranceCarrier,
      policy: formValues.policy,
      phone: formValues.phone,
    };
    array = [...array, obj];
    setInsurance(array);

    const sendFormValues = {
      aseguradora: formValues.insuranceCarrier,
      phone: formValues.phone,
      poliza: formValues.policy,
    };

    dispatch(createAseguradora(sendFormValues, history));

    setFormValues({
      ...formValues,
      insuranceCarrier: '',
      policy: '',
      phone: '',
    });
  };

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  return (
    <Container className="medical-contact">
      <Grid centered>
        <Grid.Row>
          <h1 className="title">Historial Médico</h1>
        </Grid.Row>
        <Grid.Row className="subtitle">
          <h2>Seguro de gastos médicos</h2>
        </Grid.Row>
        <Grid.Row className="icon">
          <SeguroMedico />
        </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column computer={5} tablet={5} mobile={15}>
            <SelectCustom
              placeholder="Aseguradora"
              dataOptions={insuranceList}
              setValue={(e) =>
                setFormValues({ ...formValues, insuranceCarrier: e })
              }
              value={insuranceCarrier}
            />
            {/* <CustomInput placeholder="Aseguradora" type="text"/> */}
          </Grid.Column>
          <Grid.Column
            computer={5}
            tablet={5}
            mobile={15}
            className="data-contact">
            <CustomInput
              placeholder="Póliza"
              type="text"
              setValue={(e) => setFormValues({ ...formValues, policy: e })}
              value={policy}
            />
          </Grid.Column>
          <Grid.Column
            computer={5}
            tablet={5}
            mobile={15}
            className="data-contact">
            <CustomInput
              placeholder="No. telefónico"
              type="text"
              setValue={(e) => setFormValues({ ...formValues, phone: e })}
              value={phone}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="btn-add">
          <Grid.Column
            computer={15}
            tablet={15}
            mobile={13}
            className="data-contact">
            <Button onClick={() => handleInsurance()}>
              Agregar aseguradora
            </Button>
          </Grid.Column>
        </Grid.Row>

        {seguros.map((item, i) => (
          <InsuranceElement key={item.id} {...item} />
        ))}
      </Grid>
    </Container>
  );
}
