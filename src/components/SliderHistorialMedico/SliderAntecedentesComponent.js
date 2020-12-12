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
  getValue = () => {}
}) => {
  const [hasRecord, setHasRecord] = useState(false);
  const [totalElements, setTotalElements] = useState([]);
  
  useEffect(() => {
    if(totalElements.length > 0){
      let obj = {};
      obj[objectKey] = totalElements;
      getValue(obj)
    }
  },[totalElements])
    
  const handleCounter = (e) => {
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
    <Container>
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
          <Grid.Column width={3}>
            <Button
              id="vacunaNo"
              type="radio"
              name="vacuna"
              readOnly=""
              tabIndex="0"
              onClick={() => setHasRecord(true)}>
              Si
            </Button>
          </Grid.Column>
          <Grid.Column width={3}>
            <Button
              id="vacunaNo"
              type="radio"
              name="vacuna"
              readOnly=""
              tabIndex="0"
              onClick={() => {
                setHasRecord(false);
                setTotalElements([]);
              }}>
              No
            </Button>
          </Grid.Column>
        </Grid.Row>
        {hasRecord && (
          <>
            <Grid.Row className="vacunas__record">
              <div className="quantity">
                <CustomInput
                  placeholder={placeholderNumber}
                  type="number"
                  setValue={(e) => handleCounter(e)}
                />
              </div>
            </Grid.Row>
          </>
        )}
        {totalElements.map(({ name, order, year }, i) => (
          <Grid.Row className="vacunas__title-description" key={i}>
            <Grid.Column width={5}>
                <CustomInput
                  placeholder={placeholderAnswer}
                  type="text"
                  setValue={(e) => {
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
            <Grid.Column width={5}>
                <Date
                  placeholder={placeholderDate}
                  id={'date_column'+i}
                  setValue={(e) => {
                    setTotalElements((numbers) => {
                      let updateValue = numbers.map((number) =>
                        number.order === order ? { ...number, year: e } : number
                      );
                      return updateValue;
                    });
                  }}
                  // value={year}
                />
            </Grid.Column>
          </Grid.Row>
        ))}
      </Grid>
    </Container>
  );
};
export default SliderAntecedentesComponent;
