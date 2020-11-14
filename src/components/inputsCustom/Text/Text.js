import React from "react"

const InputCustom = ({ labelPlaceholder, name, labelName, type = "text", functionPlaces = null }) => {

  const handleInputChange = event => {
    if (type === 'number') {
      document.getElementById(name).style.textAlign = 'center'
    } else {
      document.getElementById(name).style.textAlign = 'left'
    }
    document.getElementById(labelName).classList.add("move-label")
    if (event.target.value === "") {
      document.getElementById(labelName).classList.remove("move-label")
      document.getElementById(name).style.textAlign = 'center'

    }
  }

  return (
    <div className="input-container">
      <div className="labelText" id={labelName}>
        <label htmlFor={name} className="ui label" >
          {labelPlaceholder}
        </label>
      </div>
      <div className="ui input">
        <input
          type={type}
          id={name}

          autoComplete="off"
          {...functionPlaces}
          onKeyUp={handleInputChange}
        />
      </div>
    </div>
  )
}
export default InputCustom
