import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Label, Button } from 'semantic-ui-react';
import { Header } from '../Header';
import { CustomInput } from '../inputsCustom/CustomInput';
import { login } from '../../redux/actions/LoginAction';
import validator from 'validator';
import { useForm } from 'react-hook-form';
import ModalComponent from '../ModalComponent';

export default function Login() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const onSubmit = (e) => {
    console.log(e);
    dispatch(login(e.email, e.password));
  };

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
      <ModalComponent open={open} onClose={() => setOpen(false)}  title = 'Emergencia' textModal = 'Ingrese el código que tiene la pulsera del paciente' buttonText = 'Entrar' placeholder = 'Código'/>
    </div>
  );
}
