import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';

import moment from 'moment';
import 'moment/locale/es';

import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
registerLocale('es', es);

const DateInput = ({
  placeholder = 'Input Example',
  id = 'date',
  setValue = (e) => {
    // console.log(e)
  },
  value,
}) => {
  const [fecha, setFecha] = useState(
    value ? moment(value, 'DD-MM-YYYY') : null
  );
  useEffect(() => {
    if (value) setFecha(moment(value).toDate());
  }, [value]);
  const handleInputChange = (event) => {
    console.log(event);
    setValue(event);
    setFecha(event);
    document.getElementById(id).style.opacity = 1;
    console.log(event);
    if (event == null) {
      document.getElementById(id).style.opacity = 0;
    }
  };
  console.log(value);
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
        fixedHeight
        placeholderText={placeholder}></DatePicker>
      <label id={id} className="date" placeholder={placeholder}></label>
      {/* <label className="date" placeholder={placeholder}></label> */}
    </div>
  );
};

export default DateInput;
