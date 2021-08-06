import { min } from 'moment';
import React from 'react';

export const CustomInput = React.memo(
  ({
    placeholder = 'Input Example',
    labelPlaceholder = placeholder,
    type = 'text',
    min,
    value,
    areYouInLogin = false,
    functionPlaces = null,
    smallStyle = false,
    setValue = (e) => { },
    name = '',
    setRef = (e) => { },
    required = false,
    onblur = (e) => { },
    errorComponent,
    disabled=false
  }) => {
    return (
      <div
        className={`input-container ${areYouInLogin ? 'newDesign' : ''} ${smallStyle ? 'smallStyle' : ''
          }`}>
        <input
          ref={(e) => setRef(e)}
          min={min}
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
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
        <label placeholder={labelPlaceholder}></label>
        {errorComponent}
      </div>
    );
  }
);
