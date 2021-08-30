import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { CustomInput } from '../inputsCustom/CustomInput';
import {
  deleteContactoMedico,
  updateContactoMedico,
} from '../../redux/actions/UserAction';
import Swal from 'sweetalert2';
const MedicalElement = ({
  name = '',
  email = '',
  phone = '',
  specialty = '',
  city,
  id = '',
}) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name,
    email,
    phone,
    specialty,
    id,
  });
  const updateMedical = () => {
    dispatch(updateContactoMedico(state));
  };
  return (
    <>
      <Grid.Row columns={1} className="data-name">
        <Grid.Column computer={8} tablet={8} mobile={15} className="disabled">
          <CustomInput
            placeholder="Nombre completo"
            type="text"
            value={state.name}
            setValue={(e) => {
              setState({ ...state, name: e });
            }}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={3}>
        <Grid.Column computer={5} tablet={5} mobile={15} className="disabled">
          <CustomInput
            placeholder="E-mail"
            type="email"
            value={city ? city : state.email}
            setValue={(e) => {
              setState({ ...state, email: e });
            }}
            disabled
          />
        </Grid.Column>
        <Grid.Column computer={5} tablet={5} mobile={15} className="disabled">
          <CustomInput
            placeholder="Teléfono"
            type="text"
            value={state.phone}
            setValue={(e) => {
              setState({ ...state, phone: e });
            }}
            disabled
          />
        </Grid.Column>
        <Grid.Column computer={5} tablet={5} mobile={15} className="disabled">
          <CustomInput
            placeholder="Especialidad"
            type="text"
            value={state.specialty}
            setValue={(e) => {
              setState({ ...state, specialty: e });
            }}
            disabled
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column
          computer={15}
          tablet={15}
          mobile={15}
          className="line"></Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1} className="data-name">
        <Grid.Column computer={15} tablet={15} mobile={15}>
          <button
            className="buttons update"
            onClick={() => {
              updateMedical();
            }}>
            Actualizar
          </button>
          <button
            className="buttons delete"
            onClick={() => {
              Swal.fire({
                title: '¿Estas seguro de eliminar este contacto?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí',
                cancelButtonText: 'Cancelar',
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(deleteContactoMedico(id));
                }
              });
            }}>
            Eliminar
          </button>
        </Grid.Column>
      </Grid.Row>
    </>
  );
};
export default MedicalElement;
