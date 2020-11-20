import React, { useState } from 'react';
import { Select } from 'semantic-ui-react';

export const SelectCustom = React.memo(
  ({
    dataOptions,
    placeholder = 'Input Example',
    type = 'text',
    setValue = (e) => console.log(e),
    id,
  }) => {
    const [addClass, setAddClass] = useState(false);
    console.log('hpl select');
    const handleSetValue = async (event) => {
      if (event.currentTarget.children.length > 0)
        setValue(event.currentTarget.children[0].innerHTML);
      else setValue(event.currentTarget.innerHTML);
    };
    const handleOpen = async (event) => {
      setAddClass(true);
    };

    return (
      <div className="input-container newDesign">
        <Select
          placeholder={placeholder}
          options={dataOptions}
          className={`custom-select ${addClass ? 'show-label' : ''}`}
          onChange={handleSetValue}
          onOpen={handleOpen}
        />
        <label placeholder={placeholder}></label>
        {/* <input
        type={type}
        placeholder={placeholder}
        list="example-list"
      />
      
      <datalist className="places-complete" id="example-list" >
        {dataOptions.map((option, index) => (<option key={index}>{option.text}</option>))}
      </datalist> */}
      </div>
    );
  }
);

// export default function SelectCustom({
//   dataOptions,
//   placeholder,
//   labelName,
//   name,
//   placeSelect = "",
//   setValue,
// }) {
//   const moveLabel = () => {
//     document.getElementById(labelName).classList.add("move-select")
//     document.getElementById(name).placeholder = "Seleccione un tipo"
//   }

//   return (
//     <div className="select-custom">
//       <div className="select-custom__label" id={labelName}>
//         <label className="label">{placeholder}</label>
//       </div>

//       <Select
//         id={name}
//         placeholder={placeSelect}
//         options={dataOptions}
//         className="select-custom__item"
//         onChange={e => {
//           if (e.target.children.length > 0)
//             setValue(e.target.children[0].innerHTML)
//           else setValue(e.target.innerHTML)
//         }}
//         onOpen={moveLabel}
//       />
//     </div>
//   )
// }
