import React, { useState } from 'react';
import { Modal, } from 'semantic-ui-react';
import { CustomInput } from '../inputsCustom/CustomInput';
import { Carpeta } from '../../images/icons/icons'

const ModalComponent = ({
  open = false,
  onOpen,
  onClose,
  title = 'Modal',
  textModal = '',
  buttonText = '',
  placeholder = '',
  icon = false,
  setInputData = (e) => { },
  onClick,
}) => {
  const [code, setCode] = useState('');
  return (
    <Modal open={open} onClose={onClose} onOpen={onOpen}>
      <Modal.Content className={`${icon ? 'modal-enfermedades' : ''}`}>
        <h1 style={{ textAlign: 'center' }} className="modal__title">
          {title}
        </h1>
        <div>
          <form className="modal-form">

            <p className="modal-form__paragraph">
              {textModal}
            </p>
            <div className={`icon-carpeta ${icon ? '' : 'hidden-icon'} `}>
              <Carpeta />
            </div>
            <div className="modal-form__input-container">
              <CustomInput
                type="text"
                value={code}
                placeholder={placeholder}
                smallStyle={true}
                setValue={(e) => {
                  setCode(e);
                  setInputData(e);
                }}
              />
            </div>
            <div className="modal-form__button-submit-container">
              <button type="button" onClick={onClick} className="modal-form__button-submit">
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </Modal.Content>
    </Modal>
  );
};
export default ModalComponent;
