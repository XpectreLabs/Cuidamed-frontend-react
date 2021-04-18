import React, { useState } from 'react';

import { Grid } from 'semantic-ui-react';
import { CustomInput } from '../inputsCustom/CustomInput';
import { SelectCustom } from '../inputsCustom/Select/Select';
import { insuranceList } from './data';
import {
  updateAseguradora,
  deleteAseguradora,
} from '../../redux/actions/UserAction';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const InsuranceElement = ({
  aseguradora = '',
  poliza = '',
  phone = '',
  id = '',
}) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    aseguradora,
    poliza,
    phone,
    id,
  });
  const updateInsurance = () => {
    dispatch(updateAseguradora(state));
  };
  return (
    <>
      <Grid.Row columns={1} className="data-name">
        <Grid.Column computer={8} tablet={8} mobile={15} className="disabled">
          <SelectCustom
            placeholder="Aseguradora"
            dataOptions={insuranceList}
            type="text"
            value={state.aseguradora}
            setValue={(e) => {
              setState({ ...state, aseguradora: e });
            }}
            disabled
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={3}>
        <Grid.Column computer={5} tablet={5} mobile={15} className="disabled">
          <CustomInput
            placeholder="Póliza"
            type="text"
            value={state.poliza}
            setValue={(e) => {
              setState({ ...state, poliza: e });
            }}
            disabled
          />
        </Grid.Column>
        <Grid.Column computer={5} tablet={5} mobile={15} className="disabled">
          <CustomInput
            placeholder="No. telefónico"
            type="text"
            value={state.phone}
            setValue={(e) => {
              setState({ ...state, phone: e });
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
              updateInsurance();
            }}>
            Actualizar
          </button>
          <button
            className="buttons delete"
            onClick={() => {
              Swal.fire({
                title: '¿Estas seguro de eliminar este seguro?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí',
                cancelButtonText: 'Cancelar',
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(deleteAseguradora(id));
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
export default InsuranceElement;
