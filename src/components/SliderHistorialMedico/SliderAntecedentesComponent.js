import React, { useState, useEffect } from 'react';
import { SwiperSlide } from 'swiper/react';
import { Grid, Container, Button } from 'semantic-ui-react';
import { CustomInput } from '../inputsCustom/CustomInput';
import Date from '../inputsCustom/Date'
const SliderAntecedentesComponent = ({
  subtitle,
  icon,
  question,
  placeholderNumber,
  placeholderAnswer,
  placeholderDate,
  objectKey,
  typeInput = 'text',
  getValue = () => { },
  objResponse = {}
}) => {
  const [hasRecord, setHasRecord] = useState();
  const [totalElements, setTotalElements] = useState([]);
  const [numberInput, setNumberInput] = useState();

  useEffect(() => {
    //objResponse
    const responseData = objResponse[objectKey];
    if (responseData) {
      if (responseData.length > 0) {
        setHasRecord(true);
        setNumberInput(responseData.length);
        setTotalElements(responseData);
      } else {
        setHasRecord(false);
      }
    }
  }, [objResponse])


  useEffect(() => {
    //console.log(totalElements);
    if (hasRecord) {
      const newData = totalElements.filter((elements) => !elements.name );

      if (newData.length === 0) {
        let obj = {};
        obj[objectKey] = totalElements;
        getValue(obj);
      }
    }

  }, [totalElements])

  const handleNoSelected = () => {
    let obj = {};
    obj[objectKey] = 'N/A';

    getValue(obj);
  }


  const handleCounter = (e) => {
    setNumberInput(e);
    let array = [];
    if (e > 0 && e <= 3) {
      for (let i = 0; i < e; i++) {
        let obj = { order: i + 1, name: '', year: '' };
        array = [...array, obj];
      }
      setTotalElements(array);
    } else setTotalElements([]);
  };
  return (
    <div className='main-container'>
      <h1 className="title">Historial Médico</h1>
      <h3 className="subtitle-record">{subtitle}</h3>
      <Grid centered className="records">
        <Grid.Row className={`${hasRecord ? 'small-svg' : ''}`}>
          {icon}
        </Grid.Row>
        <Grid.Row>
          <h3 className="question">{question}</h3>
        </Grid.Row>
        <Grid.Row className="answers">
          <Grid.Column computer={3} tablet={5} mobile={5}>
            <Button
              className={hasRecord ? 'isChecked' : ''}
              id="vacunaNo"
              type="radio"
              name="vacuna"
              readOnly=""
              tabIndex="0"
              onClick={() => setHasRecord(true)}>
              Sí
            </Button>
          </Grid.Column>
          <Grid.Column computer={3} tablet={5} mobile={5}>
            <Button
              className={hasRecord === false ? 'isChecked' : ''}
              id="vacunaNo"
              type="radio"
              name="vacuna"
              readOnly=""
              tabIndex="0"
              onClick={() => {
                setHasRecord(false);
                handleNoSelected();
                setTotalElements([]);
              }}>
              No
            </Button>
          </Grid.Column>
        </Grid.Row>
        {hasRecord && (
          <>
            <Grid.Row className="vacunas__record">
            <Grid.Column computer={12} tablet={12} mobile={15}>
              <div className="quantity">
                <CustomInput
                  placeholder={placeholderNumber}
                  type="number"
                  min= '1'
                  max='999'
                  setValue={(e) => handleCounter(e)}
                  value={numberInput}
                />
              </div>
            </Grid.Column>
            </Grid.Row>
          </>
        )}
        {totalElements.map(({ name, order, year }, i) => (
          <Grid.Row className="vacunas__title-description" key={i}>
            <Grid.Column computer={objectKey !== 'alergias' ? 6: 12} tablet={objectKey !== 'alergias' ? 6: 12} mobile={15}>
              <CustomInput
                placeholder={placeholderAnswer}
                type={typeInput}
                setValue={(e) => {
                  console.log("hola alergias", e)
                  setTotalElements((numbers) => {
                    let updateValue = numbers.map((number) =>
                      number.order === order ? { ...number, name: e } : number
                    );
                    return updateValue;
                  });
                }}
                value={name}
              />
            </Grid.Column>
            {objectKey !== 'alergias' &&(
            <Grid.Column computer={6} tablet={6} mobile={15}>
              <Date
                placeholder={placeholderDate}
                year={objectKey === 'sangre' || objectKey === 'alergias' || objectKey === 'fracturas' || objectKey === 'cirujias' || objectKey === 'discapacidad' || objectKey === 'other' || objectKey === 'transplantes' ? true: false}
                id={'date_column' + i}
                setValue={(e) => {
                  setTotalElements((numbers) => {
                    let updateValue = numbers.map((number) =>
                      number.order === order ? { ...number, year: e } : number
                    );
                    return updateValue;
                  });
                }}
                value={year}
              />

              </Grid.Column>
            )}
          </Grid.Row>
        ))}
      </Grid>
    </div>
  );
};
export default SliderAntecedentesComponent;
