import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
registerLocale('es', es);

const DateInput = ({
  placeholder = 'Input Example',
  id = 'date',
  setValue = (e) => {
    // console.log(e)
  },
}) => {
  const [fecha, setFecha] = useState(null);

  const handleInputChange = (event) => {
    setValue(event);
    setFecha(event);
    document.getElementById(id).style.opacity = 1;
    console.log(event);
    if (event == null) {
      document.getElementById(id).style.opacity = 0;
    }
  };

  return (
    <div className="input-container">
      <DatePicker
        selected={fecha}
        onChange={handleInputChange}
        locale="es"
        className="pickers"
        dateFormat="dd 'de' MMMM 'de' yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        maxDate={new Date()}
        fixedHeight
        placeholderText={placeholder}></DatePicker>
      <label id={id} className="date" placeholder={placeholder}></label>
      {/* <label className="date" placeholder={placeholder}></label> */}
    </div>
  );
};

export default DateInput;
