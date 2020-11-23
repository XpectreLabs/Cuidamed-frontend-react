import React from 'react';

export const CustomInput = ({
  placeholder = 'Input Example',
  type = 'text',
  value = '',
  areYouInLogin = true,
  functionPlaces = null,
  smallStyle = false,
  setValue,
  name = '',
  required = false,
  onblur = (e) => {},
}) => {
  return (
    <div
      className={`input-container ${areYouInLogin ? 'newDesign' : ''} ${
        smallStyle ? 'smallStyle' : ''
      }`}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
        onBlur={(e) => {
          onblur(e.currentTarget.value);
        }}
        name={name}
        required={required}
        {...functionPlaces}
      />
      <label placeholder={placeholder}></label>
    </div>
  );
};
