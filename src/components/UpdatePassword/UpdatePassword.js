import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { HeaderLogin } from '../Header';
import { CustomInput } from '../inputsCustom/CustomInput';
import { login } from '../../redux/actions/LoginAction';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { CONECTION } from '../../conection';
import { Grid } from 'semantic-ui-react';
import SpinnerComponent from '../../components/spinner';
import { types } from '../../redux/types';


export default function UpdatePassword() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [token, setToken] = useState(''); 
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const state = useSelector((state) => {
    return state.loading;
  });

  useEffect(() => {
    verifyCode()
  }, [])

  const verifyCode = async () => {
    try {
      const query = new URLSearchParams(window.location.search);
      dispatch({type: types.loading})
      const request = await fetch(`${CONECTION}api/verify-forgot-token`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({token: query.get('token')})
      });
      if (request.status === 403) setIsValid(false)
      else {
        const {token} = await request.json();
        setToken(token)
      }
      dispatch({type: types.loaded})
    } catch(e) {
      dispatch({type: types.loaded})
      setIsValid(false)
    }
  }
  const passwordUpdate = async (e) => {
    const {password} = e;
    try {
      dispatch({type: types.loading})
      const request = await fetch(`${CONECTION}api/update-password`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({token, password})
      });
      if (request.status !== 200) {
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar los datos',
          text: "Intente mas tarde"
        })
      } else if(request.status === 403){
        setIsValid(false)
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Datos guardados correctamente',
          onClose:() => history.push('/login')
        })
      }
      dispatch({type: types.loaded})
    } catch(e) {
      dispatch({type: types.loaded})
      setIsValid(false)
    }
  }
  const onSubmit = (e) => {
    passwordUpdate(e);
  };

  const { register, handleSubmit, errors } = useForm();
  if (!isValid)
    return <Redirect to="login" />
  
  return (
    <Grid className="login" centered>
      {state.load && <SpinnerComponent />}
      <HeaderLogin hideElements />
      <Grid.Row>
        <h1 className="title">Recuperación de contraseña</h1>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column computer={6} tablet={10} mobile={14}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            type="password"
            placeholder="Contraseña"
            name={'password'}
            areYouInLogin = {true}
            setRef={register({
              required: true,
            })}
            setValue={(e) => {
              setPassword(e)
            }}
            errorComponent={
              <div>
                {errors.password && errors.password.type === 'required' && (
                  <p className="error_form">Este campo es requerido</p>
                )}
              </div>
            }
          />
          <CustomInput
            type="password"
            placeholder="Repetir Contraseña"
            name={'repeat_password'}
            areYouInLogin = {true}
            setRef={register({
              required: true,
              validate: (input) => {
                return input === password;
              },
            })}
            errorComponent={
              <>
                {errors.repeat_password &&
                errors.repeat_password.type === 'required' && (
                  <p className="error_form">Este campo es requerido</p>
                )}
                {errors.repeat_password &&
                  errors.repeat_password.type === 'validate' && (
                    <p className="error_form">Las contraseñas no coinciden</p>
                )}
              </>
            }
          />
          <Button type="submit">Actualizar contraseña</Button>
        </form>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className='button-emergency' only='tablet mobile'>
      </Grid.Row>
      <Grid.Row only='tablet mobile'>
      <Grid.Column mobile={14} className="register">
        
      </Grid.Column>
      </Grid.Row>
      <div className="background_container"></div>
      
    </Grid>
  );
}
