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

  const ButtonExampleCircular = () => <Button circular icon='settings' />

  function Questions(props) {
    let ind = props.ind
    let account = props.account;
    let noaccount = props.noaccount;
    let information = props.information;
    let prueba = props.prueba;

    if (account) {
      return (
        <Grid.Row className="relatives__answers">
            <Grid.Column>
            <CustomInput
                placeholder="ID"
                type="number"
            />
            </Grid.Column>
        </Grid.Row>
        
      );
    }
    else if(noaccount) {
        return (
            <Grid.Row className="relatives__answers">
                <Grid.Column>
                    <div className="disease">
                        <CustomInput
                            placeholder="Enfermedad"
                            type="text"
                        />
                    </div>
                    <Icon  name='info circle' size='big' alt="Mensaje de cuidamed"/>
                </Grid.Column>
                {/* <Grid.Column>
                <CustomInput
                    placeholder="Enfermedad"
                    type="text"
                />
                </Grid.Column>
                <Grid.Column>
                <CustomInput
                    placeholder="Enfermedad"
                    type="text"
                />
                </Grid.Column> */}
            </Grid.Row>

        );
    }
        return(
            <>
            <Grid.Row className="relatives__answers">
                <Button className="button__main" onClick={() => { 
                    if(ind === 0) {
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
                 if(ind === 0) {
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
                 if(ind === 0) {
                        setHasAccountWoman(false); 
                        setNoAccountWoman(false); 
                        setInformationWoman(true);
                    } else if (ind === 1) {
                        setHasAccountMan(false); 
                        setNoAccountMan(false); 
                        setInformationMan(true);
                    }
            }}>
                <Button className="button__secondary">
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
          <Grid.Column width={6}>
            {iconFirst}
            <Questions account={hasAcconutWoman} noaccount={noAccountWoman} information={informationWoman} ind={0}/>
            
            {/* <Grid.Row className="relatives__answers">
                <Button className="button__main">Con cuenta Cuidamed</Button>
            </Grid.Row>
            <Grid.Row className="relatives__answers">
                <Button className="button__main">Sin cuenta cuidamed</Button>
            </Grid.Row>
            <Grid.Row className="relatives__answers">
                <Button className="button__secondary">
                  No tengo información
                </Button>
            </Grid.Row> */}
          </Grid.Column>
          <Grid.Column width={6}>
            {iconSecond}
            <Questions account={hasAcconutMan} noaccount={noAccountMan} information={informationMan} ind={1} />
            {/* <Grid.Row className="relatives__answers">
                <Button className="button__main">Con cuenta Cuidamed</Button>
            </Grid.Row>
            <Grid.Row className="relatives__answers">
                <Button className="button__main">Sin cuenta cuidamed</Button>
            </Grid.Row>
            <Grid.Row className="relatives__answers">
                <Button className="button__secondary">
                  No tengo información
                </Button>
            </Grid.Row> */}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};
export default SliderAntecedentesComponent;
