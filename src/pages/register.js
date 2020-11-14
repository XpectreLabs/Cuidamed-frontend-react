import React from 'react';
import { Label, Button } from 'semantic-ui-react';
import { Header } from '../components/Header';
import { CustomInput } from '../components/inputsCustom/CustomInput';
const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('works');
  };
  return (
    <div className="register">
      <Header hideElements={true} />
      <div className="background_container"></div>
      <div className="container">
        <Label className="title">Crear Perfil</Label>
        <form className="form-container" onSubmit={handleSubmit}>
          <CustomInput
            type="text"
            setValue={() => {}}
            areYouInLogin={true}
            placeholder="Identificador"
          />
          <CustomInput
            type="email"
            areYouInLogin={true}
            placeholder="Correo electrónico"
            setValue={() => {}}
          />
          <CustomInput
            type="password"
            areYouInLogin={true}
            placeholder="Password"
            setValue={() => {}}
          />

          <CustomInput
            type="password"
            areYouInLogin={true}
            placeholder="Confirmar contraseña"
            setValue={() => {}}
          />
          <Button type="submit">Seguir</Button>
        </form>
      </div>
    </div>
  );
};
export default Register;
