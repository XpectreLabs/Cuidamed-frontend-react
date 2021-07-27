import Swal from 'sweetalert2';
import { CONECTION } from '../../conection';
import { types } from '../types';

export const createUser = (pInfo, history) => {
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
        dispatch({ type: types.loaded });
      } else {
        localStorage.setItem('email', pInfo.email);
        Swal.fire({
          title: 'Informacion guardada correctamente',
          icon: 'success',
          onClose: ()  => {
            history.push("/verify-code")
          }
        });
        dispatch({
          type: types.createUser,
          payload: { created: true, email: pInfo.email },
        });
        
        dispatch({ type: types.loaded });
      }
    } catch (e) {
      Swal.fire('Error', 'No se pudo crear el usuario', 'error');
      dispatch({
        type: types.createUser,
        payload: { created: false, email: null },
      });
      dispatch({ type: types.loaded });
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
        dispatch({ type: types.loaded });
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
        
        dispatch({ type: types.loaded });
        const response = await request.json();
        if (response.message) {
          let obj = response.data[0];
          localStorage.setItem('user', JSON.stringify(obj));
          Swal.fire({
            title: 'Usuario Actualizado',
            icon: 'success',
          });
          dispatch({ type: types.updateUser, payload: obj });
          dispatch({ type: types.saveAndContinue });
          history.push('/dashboard/sistemas');
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
    } catch (e) {

    }
  };
};

export const updateHistoryMedical = (pInfo, history) => {
  return async (dispatch) => {
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
        dispatch({type: types.loaded});
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
    } catch (e) {
      
      dispatch({type: types.loaded});
    }
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
        if (request.status === 200) {
          Swal.fire({
            title: '!Sus datos fueron guardados exitosamente!',
            icon: 'success',
          });
          //dispatch({ type: types.saveAndContinue });
          history.push('/dashboard/tratamiento');
        }else {
          Swal.fire({
            title: 'Hubo un error al guardar los datos, intentelo mas tarde',
            icon: 'error',
          });
        }
        dispatch({ type: types.loaded });
      }
    } catch (e) {
      Swal.fire({
        title: 'Hubo un error al guardar los datos, intentelo mas tarde',
        icon: 'error',
      });
      dispatch({ type: types.loaded });
    }
  };
};

export const createTratamiento = (pInfo, history) => {
  return async (dispatch, getState) => {
    dispatch({ type: types.loading });
    try {
      const {user: { treatment }} = getState();
      if(treatment.length >= 3) {
        Swal.fire({
          icon:"error",
          text:"No se pueden agregar mas de 3 datos"
        })
        dispatch({ type: types.loaded });
      }else if (localStorage.getItem('user') || localStorage.getItem('user') != '') {
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
          dispatch({ type: types.setTreatment,payload:response.data});
          //history.push('/dashboard/enfermedades-comunes');
        }
      }
      
      dispatch({type: types.loaded});
    } catch (e) {}
  };
};
export const updateTratamiento = (pInfo) => {
  return async (dispatch) => {
    dispatch({ type: types.loading });
    try {
      if (localStorage.getItem('user') || localStorage.getItem('user') != '') {
        const { id } = JSON.parse(localStorage.getItem('user'));
        const request = await fetch(`${CONECTION}api/tratamiento/${pInfo.id}`, {
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
            title: 'Tratamiento creado',
            icon: 'success',
          });
          dispatch({ type: types.updateTreatment,payload:pInfo });
        }
      }
      
      dispatch({type: types.loaded});
    } catch (e) {}
  };
};
export const deleteTratamiento = (pInfo) => {
  return async (dispatch) => {
    dispatch({ type: types.loading });
    try {
      if (localStorage.getItem('user') || localStorage.getItem('user') != '') {
        console.log(pInfo);
        const request = await fetch(`${CONECTION}api/tratamiento/${pInfo}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'x-auth-token': localStorage.getItem('refreshToken'),
          },
        });
        const response = await request.json();
        console.log(response);
        if (response.message) {
          Swal.fire({
            title: 'Tratamiento creado',
            icon: 'success',
          });
          dispatch({ type: types.deleteTreatment,payload:pInfo });
          //history.push('/dashboard/enfermedades-comunes');
        }
      }
      
      dispatch({type: types.loaded});
    } catch (e) {
      console.log(e);
    }
  };
};


export const createContactoUrgente = (pInfo, history) => {
  return async (dispatch, getState) => {
    dispatch({ type: types.loading });
    try {
      const {user: { emergencyContacts }} = getState();
      if(emergencyContacts.length >= 3) {
        Swal.fire({
          icon:"error",
          text:"No se pueden agregar mas de 3 datos"
        })
        
        dispatch({ type: types.loaded });
      }else if (localStorage.getItem('user') || localStorage.getItem('user') != '') {
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
        if (response.message) {
          Swal.fire({
            title: 'Contacto creado',
            icon: 'success',
          });

          let { name, email, phone, kin, id } = response.data;
          let obj = { fullName: name, email, phone, relative: kin, id };
          dispatch({ type: types.setEmergencyContacts, payload: obj });
          //dispatch({ type: types.setEmergencyContacts,payload: });
          //history.push('/dashboard/enfermedades-comunes');
        }
        dispatch({ type: types.loaded });
      }
    } catch (e) {
      dispatch({ type: types.loaded });
    }
  };
};

export const deleteContactUrgente = (id) => {
  return async (dispatch) => {
    dispatch({ type: types.loading });
    try {
      if (localStorage.getItem('user') || localStorage.getItem('user') != '') {
        const request = await fetch(`${CONECTION}api/emergency/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'x-auth-token': localStorage.getItem('refreshToken'),
          },
        });
        if (request.status === 201) {
          Swal.fire({
            title: 'Contacto eliminado',
            icon: 'success',
          });
          dispatch({ type: types.deleteEmergencyContacts, payload: id });
        } else
          Swal.fire({ title: 'Error al eliminar contacto', icon: 'error' });
          
        dispatch({ type: types.loaded });
      }
    } catch (e) {
      
      dispatch({ type: types.loaded });
    }
  };
};
export const updateUrgente = (pInfo) => {
  return async (dispatch) => {
    dispatch({ type: types.loading });
    let { id, name, email, relative } = pInfo;
    let obj = {
      id,
      name,
      email,
      kin: relative,
    };
    try {
      if (localStorage.getItem('user') || localStorage.getItem('user') != '') {
        const { id } = JSON.parse(localStorage.getItem('user'));
        const request = await fetch(`${CONECTION}api/emergency/${pInfo.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'x-auth-token': localStorage.getItem('refreshToken'),
          },
          body: JSON.stringify(obj),
        });

        const response = await request.json();
        if (response.message) {
          Swal.fire({
            title: 'Contacto creado',
            icon: 'success',
          });
          dispatch({ type: types.updateEmergencyContacts, payload: pInfo });
        }  
      }
      dispatch({ type: types.loaded });
    } catch (e) {
      dispatch({ type: types.loaded });
   
    }
  };
};

export const createContactoMedico = (pInfo, history) => {
  return async (dispatch, getState) => {
    dispatch({ type: types.loading });
    
    try {
      const {user: { medicalContacts }} = getState();
      if(medicalContacts.length >= 3) {
        Swal.fire({
          icon:"error",
          text:"No se pueden agregar mas de 3 datos"
        })
        dispatch({ type: types.loaded });
      }else if (localStorage.getItem('user') || localStorage.getItem('user') != '') {
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
        if (request.status === 200) {
          Swal.fire({
            title: 'Contacto medico creado',
            icon: 'success',
          });
          dispatch({ type: types.setMedical, payload: response.data });
        }  
      }
      dispatch({ type: types.loaded });
    } catch (e) {

      dispatch({ type: types.loaded });
    }
  };
};
export const updateContactoMedico = (pInfo) => {
  return async (dispatch) => {
    dispatch({ type: types.loading });
    try {
      if (localStorage.getItem('user') || localStorage.getItem('user') != '') {

        const request = await fetch(`${CONECTION}api/medic/${pInfo.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'x-auth-token': localStorage.getItem('refreshToken'),
          },
          body: JSON.stringify({...pInfo, city: pInfo.email}),
        });
        const response = await request.json();
        if (request.status === 200) {
          Swal.fire({
            title: 'Contacto medico actualizado',
            icon: 'success',
          });
          dispatch({ type: types.updateMedical, payload: pInfo });
          //history.push('/dashboard/enfermedades-comunes');
        }
      }
      dispatch({ type: types.loaded });
    } catch (e) {
      dispatch({ type: types.loaded });
    }
  };
};
export const deleteContactoMedico = (pInfo, history) => {
  return async (dispatch) => {
    dispatch({ type: types.loading });
    try {
      if (localStorage.getItem('user') || localStorage.getItem('user') != '') {
        const request = await fetch(`${CONECTION}api/medic/${pInfo}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'x-auth-token': localStorage.getItem('refreshToken'),
          },
        });
        const response = await request.json();
        if (request.status === 201) {
          Swal.fire({
            title: 'Contacto medico eliminado',
            icon: 'success',
          });
          dispatch({ type: types.deleteMedical, payload: pInfo });
        }
      }
      
      dispatch({ type: types.loaded });
    } catch (e) {
      
      dispatch({ type: types.loaded });
    }
  };
};

export const createAseguradora = (pInfo, history) => {
  return async (dispatch, getState) => {
    dispatch({ type: types.loading });
    try {
      const {user: { seguro }} = getState();
      if(seguro.length >= 3) {
        Swal.fire({
          icon:"error",
          text:"No se pueden agregar mas de 3 datos"
        })
        dispatch({ type: types.loaded });
      }else if (localStorage.getItem('user') || localStorage.getItem('user') != '') {
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
        if (response.message) {
          Swal.fire({
            title: '¡Aseguradora creada!',
            icon: 'success',
          });
          dispatch({ type: types.setSeguro, payload: response.data });
          //history.push('/dashboard/enfermedades-comunes');
        }
        dispatch({ type: types.loaded });
      }
    } catch (e) {
      dispatch({ type: types.loaded });
    }
  };
};
export const deleteAseguradora = (pInfo, history) => {
  return async (dispatch) => {
    dispatch({ type: types.loading });
    try {
      if (localStorage.getItem('user') || localStorage.getItem('user') != '') {
        const { id } = JSON.parse(localStorage.getItem('user'));
        const request = await fetch(`${CONECTION}api/seguro/${pInfo}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'x-auth-token': localStorage.getItem('refreshToken'),
          },
        });
        const response = await request.json();
        if (request.status === 201) {
          Swal.fire({
            title: '¡Aseguradora eliminada!',
            icon: 'success',
          });
          dispatch({ type: types.deleteSeguro, payload: pInfo });
        }
      }
      
      dispatch({ type: types.loaded });
    } catch (e) {
      
      dispatch({ type: types.loaded });
    }
  };
};
export const updateAseguradora = (pInfo, history) => {
  return async (dispatch) => {
    dispatch({ type: types.loading });
    try {
      if (localStorage.getItem('user') || localStorage.getItem('user') != '') {
        const request = await fetch(`${CONECTION}api/seguro/${pInfo.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'x-auth-token': localStorage.getItem('refreshToken'),
          },
          body: JSON.stringify(pInfo),
        });
        const response = await request.json();
        if (request.status === 200) {
          Swal.fire({
            title: '¡Aseguradora Actualizada!',
            icon: 'success',
          });
          dispatch({ type: types.updateSeguro, payload: pInfo });
        }
      }
      dispatch({ type: types.loaded });
    } catch (e) {
      dispatch({ type: types.loaded });
    }
  };
};

export const uploadImage = (img) => {
  return async (dispatch) => {
    try {
      dispatch({type:types.loading});
      if (localStorage.getItem('user') || localStorage.getItem('user') !== '') {
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
        
        dispatch({type:types.loaded});
      }
    } catch (e) {
      
      dispatch({type:types.loaded});
    }
  };
};

export const resendEmail = (email) => {
  return async (dispatch) => {
    try {
      dispatch({type:types.loading});
      const request = await fetch(`${CONECTION}api/resendMesage`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email})
      });
      if(request.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Enviado',
          message: 'su correo ha sido enviado'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          message: 'Error al enviar mensaje, intentelo mas tarde'
        })
      }  
      dispatch({type:types.loaded});
    }catch(e) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        message: 'Error al enviar mensaje, intentelo mas tarde'
      })
      dispatch({type:types.loaded});
    }
  }
}
export const setImage = (img) => ({
  type: types.uploadImgUser,
  payload: img,
});


