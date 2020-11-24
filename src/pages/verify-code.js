import React from 'react';
import { Header } from '../components/Header';
import { Label, Button } from 'semantic-ui-react';
import { CustomInput } from '../components/inputsCustom/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { verifyCode } from '../redux/actions/UserAction';
import { Redirect } from 'react-router-dom';

const VerifyCode = () => {
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    dispatch(verifyCode(e));
  };
  const { createdUser } = useSelector((state) => state.user);
  const { register, handleSubmit, errors } = useForm();

  if (!createdUser) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="verify-code">
      <Header hideElements={true} />
      <div className="background_container"></div>
      <div className="container">
        <Label className="title">
          Ingrese el codigo de verificación del correo
        </Label>
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            type="number"
            areYouInLogin={true}
            placeholder="Codigo"
            name={'code'}
            setRef={register({ required: true, maxLength: 4 })}
            errorComponent={
              <div>
                {errors.code && errors.code.type === 'required' && (
                  <p className="error_form">Este campo es requerido</p>
                )}
                {errors.code && errors.code.type === 'maxLength' && (
                  <p className="error_form">
                    Solo debe tener un maximo de 4 caracteres
                  </p>
                )}
              </div>
            }
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
