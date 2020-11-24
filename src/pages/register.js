import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Label, Button } from 'semantic-ui-react';
import { Header } from '../components/Header';
import { CustomInput } from '../components/inputsCustom/CustomInput';
import SpinnerComponent from '../components/spinner';
import { createUser } from '../redux/actions/UserAction';
import { types } from '../redux/types';
import { useForm } from 'react-hook-form';
import validator from 'validator';

const Register = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state.user;
  });

  const { register, handleSubmit, errors } = useForm();

  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    dispatch(createUser(e));
  };

  if (state.createdUser) {
    return <Redirect to="/verify-code" />;
  }
  console.log(errors);
  return (
    <div className="register ">
      {state.loading && <SpinnerComponent />}
      <Header hideElements={true} />
      <div className="background_container"></div>
      <div className="container animate__animated animate__bounceInLeft">
        <Label className="title">Crear Perfil</Label>
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            type="text"
            setRef={register({ required: true })}
            areYouInLogin={true}
            placeholder="Identificador"
            name="identifier"
            errorComponent={
              <div>
                {errors.identifier && errors.identifier.type === 'required' && (
                  <p className="error_form">Este campo es requerido</p>
                )}
              </div>
            }
          />
          <CustomInput
            type="text"
            areYouInLogin={true}
            setRef={register({ required: true })}
            placeholder="Nombre completo"
            name={'name'}
            errorComponent={
              errors.name &&
              errors.name.type === 'required' && (
                <p className="error_form">Este campo es requerido</p>
              )
            }
          />
          <CustomInput
            type="email"
            areYouInLogin={true}
            placeholder="Correo electrónico"
            setRef={register({
              required: true,
              validate: (input) => {
                return validator.isEmail(input);
              },
            })}
            name={'email'}
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
            name={'password'}
            setValue={(e) => {
              setPassword(e);
            }}
            placeholder="Password"
            setRef={register({ required: true })}
            errorComponent={
              errors.password &&
              errors.password.type === 'required' && (
                <p className="error_form">Este campo es requerido</p>
              )
            }
          />
          <CustomInput
            type="password"
            areYouInLogin={true}
            name={'repeat_password'}
            placeholder="Confirmar contraseña"
            setRef={register({
              required: true,
              validate: (input) => {
                return input === password;
              },
            })}
            errorComponent={
              <div>
                {errors.repeat_password &&
                  errors.repeat_password.type === 'required' && (
                    <p className="error_form">Este campo es requerido</p>
                  )}
                {errors.repeat_password &&
                  errors.repeat_password.type === 'validate' && (
                    <p className="error_form">Las contraseñas no coinciden</p>
                  )}
              </div>
            }
          />
          <Button type="submit">Seguir</Button>
        </form>
      </div>
    </div>
  );
};
export default Register;
