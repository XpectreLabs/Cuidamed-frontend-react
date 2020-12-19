import React, { useState, useEffect } from "react";
import { Container, Grid, Button } from "semantic-ui-react";
import { SeguroMedico } from "../../images/icons/icons";
import { CustomInput } from "../inputsCustom/CustomInput";
import { SelectCustom } from "../inputsCustom/Select/Select";
import { insuranceList } from "./data";

import { useHistory } from 'react-router-dom';
import { createAseguradora } from '../../redux/actions/UserAction';
import { useDispatch } from 'react-redux';
import { CONECTION } from '../../conection';

export default function MedicalInsurance() {

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
        console.log(data);
        if (data.data) {
          data.data.map((item) => {
            console.log(item);
            let array = insurance;
            let obj = {
              insuranceCarrier: item.aseguradora,
              policy: item.poliza,
              phone: item.phone,
            };
            array = [...array, obj];
            setInsurance(array);
          });


        }
      });
  }, [])

  const [insurance, setInsurance] = useState([]);
  const [formValues, setFormValues] = useState({
    insuranceCarrier: "",
    policy: "",
    phone: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();

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
      poliza: formValues.policy
    }

    dispatch(createAseguradora(sendFormValues, history));

    setFormValues({
      ...formValues,
      insuranceCarrier: "",
      policy: "",
      phone: "",
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
          <h2>Seguro de gastos médicos</h2>
        </Grid.Row>
        <Grid.Row className="icon">
          <SeguroMedico />
        </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column width={5}>
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
          <Grid.Column width={5}>
            <CustomInput
              placeholder="Póliza"
              type="text"
              setValue={(e) => setFormValues({ ...formValues, policy: e })}
              value={policy}
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <CustomInput
              placeholder="No. telefónico"
              type="text"
              setValue={(e) => setFormValues({ ...formValues, phone: e })}
              value={phone}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={15}>
            <Button onClick={() => handleInsurance()}>
              Agregar aseguradora
            </Button>
          </Grid.Column>
        </Grid.Row>

        {insurance.map(({ insuranceCarrier, policy, phone }, i) => (
          <>
            <Grid.Row columns={1}>
              <Grid.Column width={8} className="disabled">
                <CustomInput
                  placeholder="Aseguradora"
                  type="text"
                  value={insuranceCarrier}
                  disabled
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column width={5} className="disabled">
                <CustomInput
                  placeholder="Póliza"
                  type="text"
                  value={policy}
                  disabled
                />
              </Grid.Column>
              <Grid.Column width={5} className="disabled">
                <CustomInput
                  placeholder="No. telefónico"
                  type="text"
                  value={phone}
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
