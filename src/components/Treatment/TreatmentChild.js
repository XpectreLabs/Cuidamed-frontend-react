import React from 'react';
import { Container, Grid, Button } from "semantic-ui-react";
import { CustomInput } from "../inputsCustom/CustomInput";
import Date from "../inputsCustom/Date/Date";
const TreatmentChild = ({medicine,dose,frequency,starts,ends}) => {
    return (
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
              <Date
                  className="justify-content"
                  placeholder="Fecha de inicio"
                  value={starts}
              />
              </Grid.Column>
              <Grid.Column width={5} className="disabled">
                <Date
                    className="justify-content"
                    placeholder="Fecha final"
                    value={ends}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={6} className="line"></Grid.Column>
            </Grid.Row>
          </>
    )
}
export default TreatmentChild;