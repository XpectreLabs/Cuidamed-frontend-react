import React,{useState} from 'react';
import { Grid } from "semantic-ui-react";
import { CustomInput } from "../inputsCustom/CustomInput";
import Swal from 'sweetalert2';
import Date from "../inputsCustom/Date/Date";
import { useDispatch } from 'react-redux';
import { deleteTratamiento, updateTratamiento } from '../../redux/actions/UserAction';

const TreatmentChild = ({medicamento,dosis,frecuencia,fecha_inicio,fecha_fin,id}) => {
  const [stateForm, setStateForm] = useState({
    medicamento,
    dosis,
    frecuencia,
    fecha_inicio,
    fecha_fin,
    id
  })
  const dispatch = useDispatch();

  const update = () => {
    dispatch(updateTratamiento(stateForm));
  }

    return (
        <>
            <Grid.Row columns={3} className='record-treatment'>
              <Grid.Column computer={5} tablet={5} mobile={15} className="disabled">
                <CustomInput
                  placeholder="Medicamento/Suplemento"
                  type="text"
                  value={stateForm.medicamento}
                  setValue={(e) => {
                      setStateForm({...stateForm,medicamento:e});
                  }}
                />
              </Grid.Column>
              <Grid.Column computer={5} tablet={5} mobile={15} className="disabled">
                <CustomInput
                  placeholder="Dosis"
                  type="text"
                  value={stateForm.dosis}
                  setValue={(e) => {
                    setStateForm({...stateForm,dosis:e});
                  }}
                />
              </Grid.Column>
              <Grid.Column computer={5} tablet={5} mobile={15} className="disabled">
                <CustomInput
                  placeholder="Frecuencia"
                  type="text"
                  value={stateForm.frecuencia}
                  setValue={(e) => {
                    setStateForm({...stateForm,frecuencia:e});
                  }}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2} centered>
              <Grid.Column computer={5} tablet={5} mobile={15} className="disabled">
              <Date
                  className="justify-content"
                  placeholder="Fecha de inicio"
                  value={stateForm.fecha_inicio}
                  setValue={(e) => {
                    setStateForm({...stateForm,fecha_inicio:e});
                  }}
              />
              </Grid.Column>
              <Grid.Column computer={5} tablet={5} mobile={15} className="disabled">
                <Date
                    className="justify-content"
                    placeholder="Fecha final"
                    value={stateForm.fecha_fin}
                    setValue={(e) => {
                      setStateForm({...stateForm,fecha_fin:e});
                    }}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column computer={15} tablet={13} mobile={15} className="line"></Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1} className="data-name">
        <Grid.Column computer={15} tablet={15} mobile={15}>
          <button
            className="buttons update"
            onClick={() => {
              update();
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
                 dispatch(deleteTratamiento(id));
                }
              });
            }}>
            Eliminar
          </button>
        </Grid.Column>
      </Grid.Row>
          </>
    )
}
export default TreatmentChild;