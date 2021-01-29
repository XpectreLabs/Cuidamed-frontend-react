import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Label, Button, Form } from 'semantic-ui-react';
import { HeaderLogin } from '../Header';
import { CustomInput } from '../inputsCustom/CustomInput';
import { login } from '../../redux/actions/LoginAction';
import validator from 'validator';
import { useForm } from 'react-hook-form';
import ModalComponent from '../ModalComponent';
import Swal from 'sweetalert2';
import { CONECTION } from '../../conection';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


export default function Login() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  //btn emergency data
  const [inputEmergency, setInputEmergency] = useState();

  const onSubmit = (e) => {
    console.log(e);
    dispatch(login(e.email, e.password));
  };

  const history = useHistory();
  const handleEmergency = (e) => {
    console.log(e);
    if (inputEmergency) {
      fetch(`${CONECTION}api/codeMedband`, {
        method: 'POST',
        body: JSON.stringify({ code: inputEmergency }),
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${localStorage.getItem('token')}`,
          // 'x-auth-token': localStorage.getItem('refreshToken'),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.err) {
            Swal.fire({
              title: 'Código de pulsera incorrecto',
              icon: 'warning',
            })
          } else {
            const user = data.data.user[0] ? data.data.user[0] : "";
            if (user) {
              localStorage.setItem('emergency', JSON.stringify(user));
              //console.log(user);
              history.push('/emergencia');
            }
          }
        });
    } else {
      Swal.fire({
        title: 'El campo es requerido',
        icon: 'error',
      })
    }

  }

  const { register, handleSubmit, errors } = useForm();
  return (
    <Grid className="login" centered>
      <HeaderLogin openModal={() => setOpen(true)} />
      <Grid.Row>
        <h1 className="title">Iniciar sesión</h1>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column computer={6} tablet={10} mobile={14}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            type="email"
            placeholder="Correo electrónico"
            name={'email'}
            areYouInLogin = {true}
            setRef={register({
              required: true,
              validate: (input) => validator.isEmail(input),
            })}
            errorComponent={
              <div>
                {errors.email && errors.email.type === 'required' && (
                  <p className="error_form">Este campo es requerido</p>
                )}
                {errors.email && errors.email.type === 'validate' && (
                  <p className="error_form">Este campo no es un email</p>
                )}
              </div>
            }
          />
          <CustomInput
            type="password"
            placeholder="Contraseña"
            name={'password'}
            areYouInLogin = {true}
            setRef={register({ required: true })}
            errorComponent={
              errors.password &&
              errors.password.type === 'required' && (
                <p className="error_form">Este campo es requerido</p>
              )
            }
          />
          <Button type="submit">Iniciar sesión</Button>
        </form>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className='button-emergency' only='tablet mobile'>
      <Grid.Column mobile={14} tablet={10}>
        <Button className="emergency-mobile" onClick={() => setOpen(true)}>
              Emergencia
            </Button>
      </Grid.Column>
      </Grid.Row>
      <Grid.Row only='tablet mobile'>
      <Grid.Column mobile={14} className="register">
        <p>
          ¿No tienes cuenta?
          <br/>
          <Link to="/register">
            <span>Crear una cuenta</span>
          </Link>
        </p>
      </Grid.Column>
      </Grid.Row>
      <div className="background_container"></div>
      <ModalComponent
        open={open}
        onClose={() => setOpen(false)}
        title='Emergencia'
        textModal='Ingrese el código que tiene la pulsera del paciente'
        buttonText='Entrar'
        placeholder='Código'
        setInputData={(e) => {
          setInputEmergency(e)
        }
        }
        onClick={(e) => { handleEmergency(e) }}
      />
    </Grid>
  );
}
