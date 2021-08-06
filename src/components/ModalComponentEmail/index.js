import React, { useState } from 'react';
import { Modal, } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import customFetch from '../../utils/customFetch';
import { CustomInput } from '../inputsCustom/CustomInput';

const ModalComponentEmail = ({
  open = false,
  onOpen,
  onClose,
  title = 'Modal',
  textModal = '',
  buttonText = '',
  placeholder = '',
  Icon = false,
  setInputData = (e) => { }
}) => {
  const [email, setEmail] = useState('');
  const [emailLoad, setEmailLoad] = useState(false);
  return (
    <Modal open={open} onClose={onClose} onOpen={onOpen}>
      <Modal.Content className={`${Icon ? 'modal-enfermedades' : ''}`}>
        <h1 style={{ textAlign: 'center' }} className="modal__title">
          {title}
        </h1>
        <div>
          <form className="modal-form">

            <p className="modal-form__paragraph">
              {textModal}
            </p>
              {Icon && (
                <div className={`icon-carpeta`}>
                  <Icon />
                </div>
              )}
            <div className="modal-form__input-container">
              <CustomInput
                type="email"
                value={email}
                placeholder={placeholder}
                smallStyle={true}
                setValue={(e) => {
                  setEmail(e);
                  setInputData(e);
                }}
              />
            </div>
            <div className="modal-form__button-submit-container ">
              <button disabled={emailLoad} type="button" onClick={async () => {
                  try {
                    if (email === '') {
                      Swal.fire({
                        icon: "error",
                        title: "Rellenar campo"
                      })
                      return;
                    }
                    setEmailLoad(true)
                    const resp = await customFetch('api/forgot','POST', {email}, false)
                    
                    Swal.fire({
                      icon: 'success',
                      title: 'Correo enviado correctamente'
                    })
                    setEmail('')
                    setEmailLoad(false)
                  } catch (e) {
                    Swal.fire({
                      icon: 'error',
                      title: 'Error al mandar correo, intente mas tarde'
                    })
                  }
              }} className="modal-form__button-submit disabled">
                {emailLoad ? 'Enviando...' : buttonText}
              </button>
            </div>
          </form>
        </div>
      </Modal.Content>
    </Modal>
  );
};
export default React.memo(ModalComponentEmail);
