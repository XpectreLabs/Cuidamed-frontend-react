import React, {useEffect, useState} from 'react'
import BasicLayout from "../layouts/BasicLayout";
import { Container, Grid, Icon, Button } from "semantic-ui-react";

import Card from '../components/Resume/Card';
import CardPhone from '../components/Resume/CardPhone';

import {
    IconMapa,
    IconDiseases,
    IconContact,
    AlergiasWhite,
    IconAltura,
    IconPeso,
    IconOcupacion,
    IconDonadorWhite,
    IconVacunaWhite,
    BisturiWhite,
    FracturaWhite,
    UnidadSangreWhite,
    SillaWhite,
    ProtesisWhite,
    MujerWhite,
    MedicoWhite,
    SeguroMedicoWhite,
  } from "../images/icons/icons";

//moment
import Moment from 'react-moment';
import 'moment/locale/es';
import { useSumary } from '../hooks/useSumary';

const ResumenDashboard = () => {
    const { name, birth_date, sex, place, type_blood, ocupation, weight, height, organ_donor: organDonor } = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')):{};
    const { data } = useSumary();
    const [formValues, setFormValues] = useState({
        covid: [],
        diseases: [],
        allergies: [],
        emergencyContact: [],
        vacunas: [],
        cirujias: [],
        transfunciones: [],
        discapacidad: [],
        medicalContact: [],
        seguros: [],
        ginecologia: [],
        fracturas: [],
        others: [],
    });

    useEffect(() => {
        if(Object.keys(data).length > 0) setFormValues({...formValues,...data});
        console.log(Object.keys(data));
    }, [data])
    

    function calcularEdad(fecha) {
        let hoy = new Date();
        let cumpleanos = new Date(fecha);
        let edad = hoy.getFullYear() - cumpleanos.getFullYear();
        let m = hoy.getMonth() - cumpleanos.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }

        return edad;
    }
    return (
        <BasicLayout>
            <Container>
             <Grid className="resume" centered>
                <Grid.Row className="profile" centered>
                    <Grid.Column
                        computer={4}
                        tablet={8}
                        mobile={8}
                        textAlign="center"
                        className="figcaption"
                    >
                    </Grid.Column>
                    
                    <h1>Resumen General</h1>
                </Grid.Row>
                <Grid.Row className="information">
                    <p>{name}</p>
                </Grid.Row>
                <Grid.Row className="information">
                    <p>
                        {calcularEdad(birth_date)} años <Icon fitted name={sex === 'F' ? 'woman' : 'men'} />
                    </p>
                </Grid.Row>
                <Grid.Row className="information font-gray">
                    <p>
                        <IconMapa /> {place}
                    </p>
                </Grid.Row>
                <Grid.Row className="information font-gray">
                    <p>Tipo de sangre {type_blood}</p>
                </Grid.Row>
                <Grid.Row className="covid">
                    <Grid.Column>
                    <Grid.Row>
                        <h3>Covid 19:</h3>
                    </Grid.Row>
                    {formValues.covid.length > 0 && (
                        <Grid.Row>
                        <Grid.Row>
                            <p>Ha tenido, {formValues.covid.length} {formValues.covid.length === 1 ? 'vez' : 'veces'}
                            {formValues.covid.map((item, index) =>
                                <span key={index} ><Moment date={item.year} locale="es" format="LL" /></span>
                            )}
                            {/* <span>02/09/2020</span>
                            <span>12/10/2020</span> */}
                            </p>
                        </Grid.Row>

                        </Grid.Row>
                    )}
                    {formValues.covid.length === 0 && (
                        <Grid.Row>
                        <Grid.Row>
                            <p>No ha tenido Covid</p>
                        </Grid.Row>
                        </Grid.Row>
                    )}
                    </Grid.Column>
                </Grid.Row>
                <Card
                    icon={<IconDiseases />}
                    title={'Enfermedades'}
                    arrayData={formValues.diseases}
                />
                <Card
                icon={<AlergiasWhite />}
                title={'Alergias'}
                arrayData={formValues.allergies}
                />
                <CardPhone
                    icon={<IconContact />}
                    title={'Contactos de emergencia'}
                    arrayData={formValues.emergencyContact}
                />
                    <Grid.Row className="diseases">
                    <Grid.Column mobile={15}>
                        <Grid.Row className="title" verticalAlign="middle">
                        <Grid.Column verticalAlign="middle">
                            <IconDonadorWhite />
                            <span>Donador de órganos</span>
                        </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className="box">
                        <Grid.Column mobile={4}>
                            <h3>{ organDonor }</h3>
                        </Grid.Column>
                        </Grid.Row>
                    </Grid.Column>
                    </Grid.Row>
                    <Card
                    icon={<IconVacunaWhite />}
                    title={'Vacunas'}
                    arrayData={formValues.vacunas}
                    />
                    <Card
                    icon={<BisturiWhite />}
                    title={'Cirugías'}
                    arrayData={formValues.cirujias}
                    />
                    <Card
                    icon={<FracturaWhite />}
                    title={'Fracturas'}
                    arrayData={formValues.fracturas}
                    />
                    <Grid.Row className="diseases">
                    <Grid.Column mobile={15}>
                        <Grid.Row className="title" verticalAlign="middle">
                        <Grid.Column verticalAlign="middle">
                            <UnidadSangreWhite />
                            <span>Transfusiones</span>
                        </Grid.Column>
                        {/* <Label floating>2</Label> */}
                        </Grid.Row>
                        <Grid.Row className="box">
                        <Grid.Column mobile={4}>
                            {formValues.transfunciones.length > 0 && (
                            <h3>Sí, { formValues.transfunciones.length} {formValues.transfunciones.length === 1 ? 'vez' : 'veces'} </h3>
                            )}
                            {formValues.transfunciones.length === 0 && (
                            <h3>No</h3>
                            )}
                        </Grid.Column>
                        <Grid.Column mobile={8}>
                            {/* <Button>Ver más</Button> */}
                        </Grid.Column>
                        </Grid.Row>
                    </Grid.Column>
                    </Grid.Row>
                    <Card
                    icon={<SillaWhite />}
                    title={'Discapacidad'}
                    arrayData={formValues.discapacidad}
                    />
                    <Card
                        icon={<ProtesisWhite />}
                        title={'Dispositivos'}
                        arrayData={formValues.others}
                    />
                    {sex === 'F' && (
                    <Grid.Row className="diseases">
                        <Grid.Column mobile={15}>
                        <Grid.Row className="title" verticalAlign="middle">
                            <Grid.Column verticalAlign="middle">
                            <MujerWhite />
                            <span>Ginecología</span>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className="box">
                            <Grid.Column mobile={4}>
                                <h3>Menstruación: {formValues.ginecologia.has_menstruation === 'NOT_HAD' ? 'Ya no la tiene' : 'La tiene'}</h3>
                                <>
                                    <h3>Menstruación: {formValues.ginecologia.has_menstruation === 'NOT_HAD' ? 'Ya no la tiene' : 'La tiene'}</h3>
                                    <h3>embarazos: {formValues.ginecologia.embarazos}</h3>
                                    <h3>partos: {formValues.ginecologia.partos}</h3>
                                    <h3>abortos: {formValues.ginecologia.abortos}</h3>
                                </>
                            
                            </Grid.Column>
                            <Grid.Column mobile={8}>
                                <Button
                                onClick={() => {/* setIsShow(true) */}}
                                >Ver más</Button>
                                <Button
                                onClick={() => {/* setIsShow(true) */}}
                                >Ver menos</Button>
                            </Grid.Column>
                        </Grid.Row>
                        </Grid.Column>
                    </Grid.Row>
                    )}
                    <CardPhone
                    icon={<MedicoWhite />}
                    title={'Contactos médicos'}
                    arrayData={formValues.medicalContact}
                    />
                    <CardPhone
                    icon={<SeguroMedicoWhite />}
                    title={'Seguros'}
                    arrayData={formValues.seguros}
                    />
                <Grid.Row className="diseases">
                <Grid.Column mobile={15}>
                    <Grid.Row className="title" verticalAlign="middle">
                    <Grid.Column verticalAlign="middle">
                        <span>Otros datos</span>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row className="box">
                    <div className="other-information">
                        <Grid.Column mobile={6}>
                        <IconAltura />
                        </Grid.Column>
                        <Grid.Column mobile={10}>
                        <h5>Estatura</h5>
                        <p>{height}</p>
                        </Grid.Column>
                    </div>
                    <div className="other-information">
                        <Grid.Column mobile={6}>
                        <IconPeso />
                        </Grid.Column>
                        <Grid.Column mobile={10}>
                        <h5>Peso</h5>
                        <p>{weight}</p>
                        </Grid.Column>
                    </div>
                    <div className="other-information">
                        <Grid.Column mobile={6}>
                        <IconOcupacion />
                        </Grid.Column>
                        <Grid.Column mobile={10}>
                        <h5>Ocupación</h5>
                        <p>{ocupation}</p>
                        </Grid.Column>
                    </div>
                    </Grid.Row>
                </Grid.Column>
                </Grid.Row>
            </Grid>
            </Container>            
        </BasicLayout>
    )
}
export default ResumenDashboard;