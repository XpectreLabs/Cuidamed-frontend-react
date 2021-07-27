import React from 'react';
import { HeaderLogin } from '../components/Header';
import { Button, Grid } from 'semantic-ui-react';
import { CustomInput } from '../components/inputsCustom/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { verifyCode, resendEmail } from '../redux/actions/UserAction';
import { Redirect } from 'react-router-dom';
import SpinnerComponent from '../components/spinner';

const VerifyCode = () => {
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    dispatch(verifyCode(e));
  };
  const { createdUser } = useSelector((state) => state.user);
  const { register, handleSubmit, errors } = useForm();
  const state = useSelector((state) => {
    return state.loading;
  });

  if (!createdUser) {
    return <Redirect to="/login" />;
  }
  return (
    <Grid className="verify-code" centered>
      <HeaderLogin hideElements={true} />
      <div className="background_container"></div>
      <Grid.Row>
        <h1 className="title">Ingrese el código de verificación del correo</h1>
      </Grid.Row>
      <Grid.Row>
        {state.load && <SpinnerComponent />}
        <Grid.Column computer={6} tablet={10} mobile={14}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            type="text"
            areYouInLogin={true}
            placeholder="Código"
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
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column computer={6} tablet={10} mobile={14} className="information">
        <p>
            Si no le llegó el correo, presione el siguiente botón para
            reenviar
        </p>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column computer={6} tablet={10} mobile={14}>
            <Button type="button" onClick={() => {
              dispatch(resendEmail(localStorage.getItem('email')))
            }}>Reenviar</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
export default VerifyCode;
