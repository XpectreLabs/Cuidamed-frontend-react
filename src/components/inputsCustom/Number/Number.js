import React from 'react'
import { Input} from "semantic-ui-react"
import "./Number.scss"

export default class NumberInput extends React.Component {

    handleInputChange  = (event) => {
        document.getElementById('labeName').classList.add('move-label');
        console.log(event.target.value);
    }

    render() {

        const { labelPlaceholder}  = this.props
        return (
            <div className="input-custom">
                <label htmlFor="name" className="ui label" id="labeName">
                   {labelPlaceholder}
                </label>
                <div className="ui input">
                    <input type="number" id="name" onChange={this.handleInputChange} autoComplete="off"/>
                </div>
            </div>
        )
    }
}
