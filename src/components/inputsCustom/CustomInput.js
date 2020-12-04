import React from 'react';

export const CustomInput = React.memo(
  ({
    placeholder = 'Input Example',
    type = 'text',
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
  }) => {
    return (
      <div
        className={`input-container ${areYouInLogin ? 'newDesign' : ''} ${smallStyle ? 'smallStyle' : ''
          }`}>
        <input
          ref={(e) => setRef(e)}
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
        {errorComponent}
      </div>
    );
  }
);
