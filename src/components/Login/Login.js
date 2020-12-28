import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Label, Button } from 'semantic-ui-react';
import { Header } from '../Header';
import { CustomInput } from '../inputsCustom/CustomInput';
import { login } from '../../redux/actions/LoginAction';
import validator from 'validator';
import { useForm } from 'react-hook-form';
import ModalComponent from '../ModalComponent';
import Swal from 'sweetalert2';
import { CONECTION } from '../../conection';

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
    <div className="login">
      <Header openModal={() => setOpen(true)} />
      <div className="background_container"></div>
      <div className="container">
        <Label className="title">Iniciar sesión</Label>
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            type="email"
            areYouInLogin={true}
            placeholder="Correo electrónico"
            name={'email'}
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
            areYouInLogin={true}
            placeholder="Contraseña"
            name={'password'}
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
      </div>
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
    </div>
  );
}
