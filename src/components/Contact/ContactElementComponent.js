import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { CustomInput } from '../inputsCustom/CustomInput';
import { SelectCustom } from '../inputsCustom/Select/Select';
import { relatives } from './data';
import {
  deleteContactUrgente,
  updateUrgente,
} from '../../redux/actions/UserAction';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
const ContactElementComponent = ({
  fullName = '',
  email = '',
  phone = '',
  relative = '',
  id = '',
}) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: fullName,
    email,
    phone,
    relative,
    id,
  });

  const updateContact = () => {
    dispatch(updateUrgente(state));
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
            value={state.email}
            setValue={(e) => {
              setState({ ...state, email: e });
            }}
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
          />
        </Grid.Column>
        <Grid.Column computer={5} tablet={5} mobile={15} className="disabled">
          <SelectCustom
            placeholder="Parentesco"
            value={state.relative}
            dataOptions={relatives}
            setValue={(e) => {
              setState({ ...state, relative: e });
            }}
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
              updateContact();
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
                  dispatch(deleteContactUrgente(id));
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
export default ContactElementComponent;
