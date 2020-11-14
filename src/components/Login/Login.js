import React, { useState } from 'react';
import { Label, Button } from 'semantic-ui-react';
import { Header } from '../Header';
import { CustomInput } from '../inputsCustom/CustomInput';
import ModalComponent from '../ModalComponent';

export default function Login() {
  const [open, setOpen] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
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
            setValue={() => {
              console.log('hola');
            }}
          />
          <CustomInput
            type="password"
            areYouInLogin={true}
            placeholder="Contraseña"
            setValue={() => {
              console.log('hola');
            }}
          />
          <Button type="submit">Iniciar sesión</Button>
        </form>
      </div>
      <ModalComponent open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
