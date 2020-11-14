import React from 'react';
import { Modal, Button, Header, Image } from 'semantic-ui-react';
import { CustomInput } from '../inputsCustom/CustomInput';
const ModalComponent = ({ open = false, onOpen, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} onOpen={onOpen}>
      <Modal.Content>
        <h1 style={{ textAlign: 'center' }} className="modal__title">
          Emergencia
        </h1>
        <div>
          <form className="modal-form">
            <p className="modal-form__paragraph">
              Ingrese el código que tiene la pulsera del paciente
            </p>
            <div className="modal-form__input-container">
              <CustomInput
                type="text"
                placeholder="Código"
                smallStyle={true}
                setValue={() => {
                  console.log('hola');
                }}
              />
            </div>
            <div className="modal-form__button-submit-container">
              <button type="submit" className="modal-form__button-submit">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </Modal.Content>
    </Modal>
  );
};
export default ModalComponent;
