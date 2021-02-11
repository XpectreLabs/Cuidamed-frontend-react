import Swal from 'sweetalert2';
import { CONECTION } from '../../conection';
import { types } from '../types';

export const createUser = (pInfo) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.loading });
      let request = await fetch(`${CONECTION}api/register`, {
        method: 'POST',
        body: JSON.stringify(pInfo),
        headers: {
          'Content-type': 'application/json',
        },
      });
      let resp = await request.json();
      if (resp.err) {
        Swal.fire('Error', resp.err.message, 'error');
        dispatch({
          type: types.createUser,
          payload: { created: false, email: null },
        });
      } else {
        localStorage.setItem('email', pInfo.email);
        Swal.fire({
          title: 'Informacion guardada correctamente',
          icon: 'success',
        });
        dispatch({
          type: types.createUser,
          payload: { created: true, email: pInfo.email },
        });
      }
    } catch (e) {
      Swal.fire('Error', 'No se pudo crear el usuario', 'error');
      dispatch({
        type: types.createUser,
        payload: { created: false, email: null },
      });
    }
  };
};

export const verifyCode = (pInfo) => {
  return async (dispatch, getState) => {
    const { emailRegistered } = getState().user;

    try {
      dispatch({ type: types.loading });
      let request = await fetch(`${CONECTION}api/verify`, {
        method: 'POST',
        body: JSON.stringify({ ...pInfo, email: emailRegistered }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      let resp = await request.json();
      if (request.status === 200) {
        localStorage.removeItem('email');
        Swal.fire({
          title: 'Usuario verificado',
          icon: 'success',
        });
        dispatch({
          type: types.verifyUser,
        });
      } else {
        throw 'No se pudo verificar el usuario';
      }
    } catch (e) {
      Swal.fire('Error', 'No se pudo verificar el usuario', 'error');
    }
  };
};

export const updateInfoBasic = (pInfo, history) => {
  return async (dispatch) => {
    dispatch({ type: types.loading });
    try {
      if (localStorage.getItem('user') || localStorage.getItem('user') != '') {
        const { id } = JSON.parse(localStorage.getItem('user'));
        const request = await fetch(`${CONECTION}api/update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'x-auth-token': localStorage.getItem('refreshToken'),
          },
          body: JSON.stringify(pInfo),
        });
        const response = await request.json();

        if (response.message) {
          Swal.fire({
            title: 'Usuario Actualizado',
            icon: 'success',
          });
          dispatch({ type: types.saveAndContinue });
          history.push('/dashboard/enfermedades-comunes');
        }
      }
    } catch (e) {}
  };
};

export const saveIllnessSystem = (pInfo, history) => {
  return async (dispatch) => {
    dispatch({ type: types.loading });
    try {
      if (localStorage.getItem('user') || localStorage.getItem('user') != '') {
        const { id } = JSON.parse(localStorage.getItem('user'));
        const request = await fetch(`${CONECTION}api/relations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'x-auth-token': localStorage.getItem('refreshToken'),
          },
          body: JSON.stringify(pInfo),
        });
        const response = await request.json();

        if (response.message) {
          Swal.fire({
            title: 'Se agrego al historial',
            icon: 'success',
          });
          history.push('/dashboard/sistemas');
        }
      }
    } catch (e) {}
  };
};

export const updateHistoryMedical = (pInfo, history) => {
  return async (dispatch) => {
    dispatch({ type: types.loading });
    try {
      if (localStorage.getItem('user') || localStorage.getItem('user') != '') {
        const { id } = JSON.parse(localStorage.getItem('user'));
        const request = await fetch(`${CONECTION}api/objFracture`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'x-auth-token': localStorage.getItem('refreshToken'),
          },
          body: JSON.stringify(pInfo),
        });
        const response = await request.json();
        console.log(response);
        if (response.message) {
          Swal.fire({
            title: '¡Antecedentes actualizados!',
            icon: 'success',
          });
          //dispatch({ type: types.saveAndContinue });
          const { sex } = JSON.parse(localStorage.getItem('user'));
          if (sex === 'F') history.push('/dashboard/ginecologia');
          else history.push('/dashboard/tratamiento');
        }
      }
    } catch (e) {}
  };
};

export const updateGinecologia = (pInfo, history) => {
  return async (dispatch) => {
    dispatch({ type: types.loading });
    try {
      if (localStorage.getItem('user') || localStorage.getItem('user') != '') {
        const { id } = JSON.parse(localStorage.getItem('user'));
        const request = await fetch(`${CONECTION}api/ginecologia`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'x-auth-token': localStorage.getItem('refreshToken'),
          },
          body: JSON.stringify(pInfo),
        });
        const response = await request.json();
        console.log(response);
        if (response.message) {
          Swal.fire({
            title: '!Sus datos fueron guardados exitosamente!',
            icon: 'success',
          });
          //dispatch({ type: types.saveAndContinue });
          history.push('/dashboard/tratamiento');
        }
      }
    } catch (e) {}
  };
};

export const createTratamiento = (pInfo, history) => {
  return async (dispatch) => {
    dispatch({ type: types.loading });
    try {
      if (localStorage.getItem('user') || localStorage.getItem('user') != '') {
        const { id } = JSON.parse(localStorage.getItem('user'));
        const request = await fetch(`${CONECTION}api/tratamiento`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'x-auth-token': localStorage.getItem('refreshToken'),
          },
          body: JSON.stringify(pInfo),
        });
        const response = await request.json();
        console.log(response);
        if (response.message) {
          Swal.fire({
            title: 'Tratamiento creado',
            icon: 'success',
          });
          //dispatch({ type: types.saveAndContinue });
          //history.push('/dashboard/enfermedades-comunes');
        }
      }
    } catch (e) {}
  };
};

export const createContactoUrgente = (pInfo, history) => {
  return async (dispatch) => {
    dispatch({ type: types.loading });
    try {
      if (localStorage.getItem('user') || localStorage.getItem('user') != '') {
        const { id } = JSON.parse(localStorage.getItem('user'));
        const request = await fetch(`${CONECTION}api/emergency`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'x-auth-token': localStorage.getItem('refreshToken'),
          },
          body: JSON.stringify(pInfo),
        });
        const response = await request.json();
        console.log(response);
        if (response.message) {
          Swal.fire({
            title: 'Contacto creado',
            icon: 'success',
          });
          //dispatch({ type: types.saveAndContinue });
          //history.push('/dashboard/enfermedades-comunes');
        }
      }
    } catch (e) {}
  };
};

export const createContactoMedico = (pInfo, history) => {
  return async (dispatch) => {
    dispatch({ type: types.loading });
    try {
      if (localStorage.getItem('user') || localStorage.getItem('user') != '') {
        const { id } = JSON.parse(localStorage.getItem('user'));
        const request = await fetch(`${CONECTION}api/medic`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'x-auth-token': localStorage.getItem('refreshToken'),
          },
          body: JSON.stringify(pInfo),
        });
        const response = await request.json();
        console.log(response);
        if (response.message) {
          Swal.fire({
            title: 'Contacto medico creado',
            icon: 'success',
          });
          //dispatch({ type: types.saveAndContinue });
          //history.push('/dashboard/enfermedades-comunes');
        }
      }
    } catch (e) {}
  };
};

export const createAseguradora = (pInfo, history) => {
  return async (dispatch) => {
    dispatch({ type: types.loading });
    try {
      if (localStorage.getItem('user') || localStorage.getItem('user') != '') {
        const { id } = JSON.parse(localStorage.getItem('user'));
        const request = await fetch(`${CONECTION}api/seguro`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'x-auth-token': localStorage.getItem('refreshToken'),
          },
          body: JSON.stringify(pInfo),
        });
        const response = await request.json();
        console.log(response);
        if (response.message) {
          Swal.fire({
            title: 'Aseguradora creada!',
            icon: 'success',
          });
          //dispatch({ type: types.saveAndContinue });
          //history.push('/dashboard/enfermedades-comunes');
        }
      }
    } catch (e) {}
  };
};

export const uploadImage = (img) => {
  return async (dispatch) => {
    try {
      if (localStorage.getItem('user') || localStorage.getItem('user') != '') {
        const formData = new FormData();
        formData.append('perfil', img);
        const request = await fetch(`${CONECTION}api/file`, {
          method: 'POST',
          headers: {
            //"Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'x-auth-token': localStorage.getItem('refreshToken'),
          },
          body: formData,
        });
        const response = await request.json();
        localStorage.setItem('user', JSON.stringify(response.user[0]));
        dispatch(setImage(URL.createObjectURL(img)));
      }
    } catch (e) {}
  };
};
export const setImage = (img) => ({
  type: types.uploadImgUser,
  payload: img,
});
