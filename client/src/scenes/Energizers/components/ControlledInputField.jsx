import "./ControlledInputField.css";
import React, { useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import { validateField } from '../../../services/utils.js'


const ControlledInputField = (props) => {
    const {
        id,
        label,
        initialErrorText,
        toValidate,
        initialValue,
        saveField,
        isTextArea,
        ...otherProps
    } = props;

    const [value, setValue] = useState(initialValue || "");
    const [errorText, setErrorText] = useState(initialErrorText || "");


    const handleChange = e => {
           setValue(e.target.value)
    };
    
    const handleBlur = e => {
        let validateResults = validateField(toValidate,value)
        console.log("CORRECTED TEXT =",validateResults.text)
        setErrorText(validateResults.errors)
        //this is a placeholder, should update context and validate form
        if (validateResults.text) setValue(validateResults.text)
        saveField(id,validateResults.text)
    };

    return ( 


    (isTextArea) ?
        <div className = "textareaContainer">
            <div className = "labelDiv">
                {label}
            </div>
            <div className = "textareaDiv">
                <textarea
                    type="text" 
                    className="textareaField"
                    rows={10}
                    name={ id }
                    value={ value }
                    onChange={handleChange}
                    onBlur={handleBlur}         
                />
            </div>
            <div className = "errorDiv">
                {errorText}
            </div>
        </div>
        :
        <div className = "inputContainer">
            <div className = "labelDiv">
                {label}
            </div>
            <div className = "inputDiv">
                <input
                    type="text" 
                    className="inputField"
                    name={ id }
                    value={ value }
                    onChange={handleChange}
                    onBlur={handleBlur}         
                />
            </div>
            <div className = "errorDiv">
                {errorText}
            </div>
        </div>

    )

}

ControlledInputField.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    errorText: PropTypes.string,
    toValidate: PropTypes.array,
    initialValue: PropTypes.string,
    saveField: PropTypes.func,
  };



export default ControlledInputField

//errorText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),