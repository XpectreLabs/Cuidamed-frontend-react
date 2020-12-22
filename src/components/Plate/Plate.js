import React, { useState } from 'react';
import { Grid, Input, Button } from 'semantic-ui-react';
import Logo from '../../images/CuidaMEDLogo.png';
import Placa from '../../images/placa.jpg';
import { CustomInput } from '../inputsCustom/CustomInput';
import { SelectCustom } from '../inputsCustom/Select/Select';
import bloodType from './data';

export default function Plate() {

    const [formValues, setFormValues] = useState({
        name: "",
        emergencyContact: "",
        typeBlood: "",
        disease: "",
      });
      const { name, emergencyContact, typeBlood, disease } = formValues;

    return (
        <Grid className="plate">
            <Grid.Column width={9} verticalAlign="middle">
                <Grid.Row className="bg-plate">
                    <Grid.Column verticalAlign="middle">
                        <Grid.Row >
                            <p>{name}</p>
                        </Grid.Row>
                        <Grid.Row >
                            <p>{emergencyContact}</p>
                        </Grid.Row>
                        <Grid.Row>
                            <p>{typeBlood}</p>
                        </Grid.Row>
                        <Grid.Row>
                            <p>{disease}</p>
                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>
            </Grid.Column>
            <Grid.Column width={7} verticalAlign="middle">
                <Grid.Row className="logo">
                        <img src={Logo} />
                </Grid.Row>
                <Grid.Row className="description">
                    <p>
                        Información que tendrá la placa.
                    </p>
                </Grid.Row>
                <Grid.Row className="information">
                    <label>¿Quién usuará la pulsera?</label>
                    <br/>
                    <Input type="text" name='name' 
                    placeholder='Raúl Núñez / Raúl Núñez 1991'
                    // setValue={(e) => setFormValues({ ...formValues, email: e })}
                    //     value={email}
                    onChange={(e) => {
                        setFormValues({...formValues,name: e.currentTarget.value});

                    }}
                    value={name}
                     />
                    <span className={name.length > 25 ? 'warning' : ''}>{name.length}/25</span>
                </Grid.Row>
                <Grid.Row className="information">
                    <label>¿Quién será tu contacto de emergencia?</label>
                    <br/>
                    <Input type="text" name="emergency-contact" placeholder='Eduardo +529932000000'
                        onChange={(e) => {
                        setFormValues({...formValues,emergencyContact: e.currentTarget.value});

                    }}
                    value={emergencyContact}
                    />
                    <span className={emergencyContact.length > 25 ? 'warning' : ''}>{emergencyContact.length}/25</span>
                </Grid.Row>
                <Grid.Row className="information">
                    <label>Tipo de sangre</label>
                    <br/>
                    <SelectCustom
                        placeholder=""
                        dataOptions={bloodType}
                        name="type-blood"
                        setValue={(e) => {
                            setFormValues({ ...formValues, typeBlood: e });
                        }}
                        value={typeBlood}
                    />
                </Grid.Row>
                <Grid.Row className="information">
                    <label>Padecimiento principal</label>
                    <br/>
                    <Input type="text" placeholder='Hipertensión / Diabético / Alzheimer' name="disease" 
                        onChange={(e) => {
                        setFormValues({...formValues,disease: e.currentTarget.value});

                    }}
                    value={disease}
                    />
                    <span className={disease.length > 25 ? 'warning' : ''}>{disease.length}/25</span>
                </Grid.Row>
                <Grid.Row>
                    <Button className="btn-main">Proceder al pago</Button>
                </Grid.Row>
            </Grid.Column>
        </Grid>
    )
}
