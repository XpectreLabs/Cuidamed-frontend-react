import React, { useState, useEffect} from 'react'
import { Grid } from 'semantic-ui-react';
import { CustomInput } from '../inputsCustom/CustomInput';
import Date from '../inputsCustom/Date';
// import { records } from '../SliderHistorialMedico/data';


export default function Question(props) {

  const [records, setRecords] = useState([]);
  const [number, setNumber] = useState(0);
  const { placeholderAnswer, placeholderDate, placeholderNumber, hasRecord } = props;

    return (
        <>
          <NumberVaccinations hasRecord={hasRecord} placeholderNumber={placeholderNumber} />
          {records}
            {/* <Grid.Row className="vacunas__title-description">
                <Grid.Column width={5}>
                  <CustomInput
                    placeholder={placeholderAnswer}
                    type="text"
                    // setValue={(e) => {}}
                    // onblur={(e) =>
                    //   setTotalVacunas((totalVacunas) => [...totalVacunas, e])
                    // }
                  />
                </Grid.Column>
                <Grid.Column width={5}>
                  <Date placeholder={placeholderDate}/> 
                </Grid.Column>
            </Grid.Row> */}
        </>
    )
}

function NumberVaccinations(props) {
  const [number, setNumber] = useState(0);
  if(props.hasRecord) {
    return (
      <Grid.Row className="record">
        <div className="quantity">
          <CustomInput
            placeholder={props.placeholderNumber}
            type="number"
            setValue={(e) => {}}
            onChange={(e) => {
            setNumber(e.currentTarget.value);
          }}
          />
          {number}
        </div>
      </Grid.Row>
    );
  } 
  return null;
}

function handleInputsRecords (e, placeholderAnswer, placeholderDate) {
  if (e > 0 && e < 4) {
    const records = [];
    for (let index = 0; index < e; index++) {
      records.push(
        <Grid.Row className="vacunas__title-description">
          <Grid.Column width={5}>
            <CustomInput
              placeholder={placeholderAnswer}
              type="text"
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <Date placeholder={placeholderDate}/> 
          </Grid.Column>
        </Grid.Row>
      );
    }
    return records;
  }
  return null;
};
