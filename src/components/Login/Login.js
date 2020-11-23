import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Label, Button } from 'semantic-ui-react';
import { Header } from '../Header';
import { CustomInput } from '../inputsCustom/CustomInput';
import { login } from '../../redux/actions/LoginAction';
import ModalComponent from '../ModalComponent';

export default function Login() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form.email, form.password));
  };
  const { email, password } = form;
  return (
    <div className="login">
      <Header openModal={() => setOpen(true)} />
      <div className="background_container"></div>
      <div className="container">
        <Label className="title">Iniciar sesión</Label>
        <form className="form-container" onSubmit={handleSubmit}>
          <CustomInput
            type="email"
            areYouInLogin={true}
            placeholder="Correo electrónico"
            name="email"
            required={true}
            value={email}
            setValue={(e) => {
              setForm({ ...form, email: e });
            }}
          />
          <CustomInput
            type="password"
            areYouInLogin={true}
            placeholder="Contraseña"
            value={password}
            name="password"
            required={true}
            setValue={(e) => {
              setForm({ ...form, password: e });
            }}
          />
          <Button type="submit">Iniciar sesión</Button>
        </form>
      </div>
      <ModalComponent open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
