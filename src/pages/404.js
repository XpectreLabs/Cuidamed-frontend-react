import React from 'react';

import { CustomInput } from '../components/inputsCustom/CustomInput';

export default function Error404() {
  return (
    <div>
      <h1>Error 404</h1>
      <CustomInput
        type="email"
        placeholder="Correo electrónico"
        setValue={() => {
          console.log('hola');
        }}
      />
    </div>
  );
}
