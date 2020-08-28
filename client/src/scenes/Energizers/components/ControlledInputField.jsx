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
        /*console.log("BLUR in CIF ", e.target.value, "and value", value) 
        validate here - do it elegantly.
        *run the utils validateField function, passing in text and codes
        * It returns array of error codes
        * apply error codes to errorText
        * se the isValid flag for field
        */
        let errorsArray = validateField(toValidate,value)
        setErrorText(errorsArray)


        //this is a placeholder, should update context and validate form
        saveField(id,value)
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