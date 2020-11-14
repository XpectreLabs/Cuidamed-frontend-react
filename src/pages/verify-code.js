import React from 'react';
import { Header } from '../components/Header';
import { Label, Button } from 'semantic-ui-react';
import { CustomInput } from '../components/inputsCustom/CustomInput';

const VerifyCode = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="verify-code">
      <Header hideElements={true} />
      <div className="background_container"></div>
      <div className="container">
        <Label className="title">
          Ingrese el codigo de verificación del correo
        </Label>
        <form className="form-container" onSubmit={handleSubmit}>
          <CustomInput
            type="text"
            areYouInLogin={true}
            placeholder="Codigo"
            setValue={() => {}}
          />
          <Button type="submit">Seguir</Button>
        </form>
        <div className="verify-code__container">
          <p className="verify-code__container-paragraph">
            Si no le llego el correo, presione <br /> el siguiente boton para
            reenviar
          </p>
          <div className="verify-code__container-button">
            <Button type="button">Reenviar</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VerifyCode;
