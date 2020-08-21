import "./ControlledInputField.css";
import React, { useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';


const ControlledInputField = (props) => {
    const {
        id,
        label,
        errorText,
        toValidate,
        initialValue,
        saveField,
        isTextArea,
        ...otherProps
    } = props;

    const [value, setValue] = useState(initialValue || "");

    const handleChange = e => {
           setValue(e.target.value)
    };
    
    const handleBlur = e => {
        //console.log("BLUR in CIF ", e.target.value, "and value", value) 
        //validate here
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