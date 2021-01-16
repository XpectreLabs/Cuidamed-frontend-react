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
  year = false,
}) => {
  const [fecha, setFecha] = useState(null);
  console.log("Value: ",value)
  useEffect(() => {
    if (value) setFecha(moment(value).toDate());
    else if(value === null) setFecha(null);
    document.getElementById(id).style.opacity = 0;
  }, [value]);

  const handleInputChange = (event) => {
    setValue(event);
    setFecha(event);
    document.getElementById(id).style.opacity = 1;
    if (event == null) {
      document.getElementById(id).style.opacity = 0;
    }
  };

  if(!year) {
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
          // maxDate={new Date()}
          fixedHeight
          placeholderText={placeholder}></DatePicker>
        <label id={id} className="date" placeholder={placeholder}></label>
        {/* <label className="date" placeholder={placeholder}></label> */}
      </div>
    );
  } else {
    return (
      <div className="input-container">
        <DatePicker
          selected={fecha}
          onChange={handleInputChange}
          className="pickers"
          // maxDate={new Date()}
          fixedHeight
          placeholderText={placeholder}
          showYearPicker
          dateFormat="yyyy"
          ></DatePicker>
        <label id={id} className="date" placeholder={placeholder}></label>
        {/* <label className="date" placeholder={placeholder}></label> */}
      </div>
    );
  }
};

export default DateInput;
