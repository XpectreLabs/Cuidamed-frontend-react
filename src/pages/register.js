import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Label, Button } from 'semantic-ui-react';
import { Header } from '../components/Header';
import { CustomInput } from '../components/inputsCustom/CustomInput';
import SpinnerComponent from '../components/spinner';
import { createUser } from '../redux/actions/UserAction';
import { types } from '../redux/types';
const Register = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state.user;
  });
  const [form, setForm] = useState({
    identifier: '',
    email: '',
    password: '',
    name: '',
    repeat_password: '',
  });

  useEffect(() => {
    return () => {
      dispatch({ type: types.setUserCreated });
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(form));
  };
  const { identifier, name, email, password, repeat_password } = form;

  if (state.createdUser) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="register ">
      {state.loading && <SpinnerComponent />}
      <Header hideElements={true} />
      <div className="background_container"></div>
      <div className="container animate__animated animate__bounceInLeft">
        <Label className="title">Crear Perfil</Label>
        <form className="form-container" onSubmit={handleSubmit}>
          <CustomInput
            type="text"
            setValue={(e) => {
              setForm({ ...form, identifier: e });
            }}
            value={identifier}
            areYouInLogin={true}
            placeholder="Identificador"
            name="identifier"
            required={true}
          />
          <CustomInput
            type="text"
            areYouInLogin={true}
            value={name}
            required={true}
            placeholder="Nombre completo"
            setValue={(e) => {
              setForm({ ...form, name: e });
            }}
          />
          <CustomInput
            type="email"
            areYouInLogin={true}
            value={email}
            required={true}
            placeholder="Correo electrónico"
            setValue={(e) => {
              setForm({ ...form, email: e });
            }}
          />
          <CustomInput
            type="password"
            areYouInLogin={true}
            value={password}
            required={true}
            name={'password'}
            placeholder="Password"
            setValue={(e) => {
              setForm({ ...form, password: e });
            }}
          />

          <CustomInput
            type="password"
            areYouInLogin={true}
            value={repeat_password}
            required={true}
            name={'repeat_password'}
            placeholder="Confirmar contraseña"
            setValue={(e) => {
              setForm({ ...form, repeat_password: e });
            }}
          />
          <Button type="submit">Seguir</Button>
        </form>
      </div>
    </div>
  );
};
export default Register;
