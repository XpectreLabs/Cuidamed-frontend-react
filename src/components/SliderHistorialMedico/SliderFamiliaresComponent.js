import React, { useState, useEffect } from "react";
import { Grid, Container, Button, Icon } from "semantic-ui-react";
import { CustomInput } from "../inputsCustom/CustomInput";
const SliderAntecedentesComponent = ({
  subtitle,
  iconFirst,
  iconSecond,
}) => {
  useEffect(() => {
    console.log("hola mundo");
  }, []);

  const [hasAcconutWoman, setHasAccountWoman] = useState(false);
  const [hasAcconutMan, setHasAccountMan] = useState(false);
  const [noAccountWoman, setNoAccountWoman] = useState(false);
  const [noAccountMan, setNoAccountMan] = useState(false);
  const [informationWoman, setInformationWoman] = useState(false);
  const [informationMan, setInformationMan] = useState(false);

  function Questions(props) {
    let ind = props.ind
    let account = props.account;
    let noaccount = props.noaccount;
    let information = props.information;
    // let prueba = props.prueba;

    if (account) {
      console.log('con cuenta');
      return (
        <>
          <Grid.Row className="relatives__answers">
            <Grid.Column>
              <CustomInput
                placeholder="ID"
                type="number"
                onblur={e => {
                  console.log(e);
                }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Icon link name='close' color='red' size='big' onClick={() => {
              if (ind === 0) {
                setHasAccountWoman(false);
                setNoAccountWoman(false);
                setInformationWoman(false);
              } else if (ind === 1) {
                setHasAccountMan(false);
                setNoAccountMan(false);
                setInformationMan(false);
              }
            }} />
          </Grid.Row>
        </>

      );
    }
    else if (noaccount) {
      console.log('sin cuenta');
      return (
        <>
          <Grid.Row className="relatives__answers">
            <Grid.Column>
              <div className="disease">
                <CustomInput
                  placeholder="Enfermedad"
                  type="text"
                  onblur={e => {
                    console.log(e);
                  }}
                />
              </div>
              <Icon name='info circle' size='big' alt="Mensaje de cuidamed" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Icon link name='close' color='red' size='big' onClick={() => {
              if (ind === 0) {
                setHasAccountWoman(false);
                setNoAccountWoman(false);
                setInformationWoman(false);
              } else if (ind === 1) {
                setHasAccountMan(false);
                setNoAccountMan(false);
                setInformationMan(false);
              }
            }} />
          </Grid.Row>
        </>

      );
    }
    else if (information) {
      console.log('no tengo la info');
      return (
        <>
          <Grid.Row className="relatives__answers">
            <Button className="button__secondary">
              No tengo información
              </Button>
          </Grid.Row>
          <Grid.Row>
            <Icon link name='close' color='red' size='big' onClick={() => {
              if (ind === 0) {
                setHasAccountWoman(false);
                setNoAccountWoman(false);
                setInformationWoman(false);
              } else if (ind === 1) {
                setHasAccountMan(false);
                setNoAccountMan(false);
                setInformationMan(false);
              }
            }} />
          </Grid.Row>
        </>

      );
    }
    return (
      <>
        <Grid.Row className="relatives__answers">
          <Button className="button__main" onClick={() => {
            if (ind === 0) {
              setHasAccountWoman(true);
              setNoAccountWoman(false);
              setInformationWoman(false);
            } else if (ind === 1) {
              setHasAccountMan(true);
              setNoAccountMan(false);
              setInformationMan(false);
            }
          }}>Con cuenta Cuidamed</Button>
        </Grid.Row>
        <Grid.Row className="relatives__answers" onClick={() => {
          if (ind === 0) {
            setHasAccountWoman(false);
            setNoAccountWoman(true);
            setInformationWoman(false);
          } else if (ind === 1) {
            setHasAccountMan(false);
            setNoAccountMan(true);
            setInformationMan(false);
          }
        }}>
          <Button className="button__main">Sin cuenta cuidamed</Button>
        </Grid.Row>
        <Grid.Row className="relatives__answers" onClick={() => {
          if (ind === 0) {
            setHasAccountWoman(false);
            setNoAccountWoman(false);
            setInformationWoman(true);
          } else if (ind === 1) {
            setHasAccountMan(false);
            setNoAccountMan(false);
            setInformationMan(true);
          }
        }}>
          <Button className="button__secondary" onClick={() => {
            if (ind === 0) {
              setHasAccountWoman(false);
              setNoAccountWoman(false);
              setInformationWoman(true);
            } else if (ind === 1) {
              setHasAccountMan(false);
              setNoAccountMan(false);
              setInformationMan(true);
            }
          }}>
            No tengo información
                </Button>
        </Grid.Row>
      </>
    );
  }



  return (
    <Container>
      <h1 className="title">Historial Médico</h1>
      <h3 className="subtitle-record">Antecedentes familiares</h3>
      <Grid centered className="records">
        <Grid.Row>
          <h3 className="question">{subtitle}</h3>
        </Grid.Row>
        <Grid.Row className="relatives">
          <Grid.Column width={8}>
            {iconFirst}
            <Grid.Row className="relatives__answers">
            <Grid.Column>
              <div className="disease">
                <CustomInput
                  placeholder="Enfermedad"
                  type="text"
                  onblur={e => {
                    console.log(e);
                  }}
                />
              </div>
            </Grid.Column>
          </Grid.Row>
            <Grid.Row className="relatives__answers">
            <Grid.Column>
              <div className="disease">
                <CustomInput
                  placeholder="Enfermedad"
                  type="text"
                  onblur={e => {
                    console.log(e);
                  }}
                />
              </div>
            </Grid.Column>
          </Grid.Row>
            {/* <Questions account={hasAcconutWoman} noaccount={noAccountWoman} information={informationWoman} ind={0} /> */}
          </Grid.Column>
          <Grid.Column width={8}>
            {iconSecond}
            <Grid.Row className="relatives__answers">
              <Grid.Column>
                <div className="disease">
                  <CustomInput
                    placeholder="Enfermedad"
                    type="text"
                    onblur={e => {
                      console.log(e);
                    }}
                  />
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="relatives__answers">
              <Grid.Column>
                <div className="disease">
                  <CustomInput
                    placeholder="Enfermedad"
                    type="text"
                    onblur={e => {
                      console.log(e);
                    }}
                  />
                </div>
              </Grid.Column>
            </Grid.Row>
            {/* <Questions account={hasAcconutMan} noaccount={noAccountMan} information={informationMan} ind={1} /> */}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};
export default SliderAntecedentesComponent;
