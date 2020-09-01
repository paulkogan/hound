import "./ControlledInputField.css";
import React, { useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import { validateField } from '../../../services/utils.js'
import { ControlledFormContext } from "../../../contexts/ControlledFormContext";

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
    const [isValid, setIsValid] = useState(false);
    const [touched, setTouched] = useState(false);

   const { updateFormState } = useContext(ControlledFormContext);

    const handleChange = e => {
           setValue(e.target.value)
           setTouched(true)
    };
    
  const doFieldUpdate = (source) => {
    let validateResults = validateField(toValidate,value)
    if (validateResults.text) setValue(validateResults.text)
    if (validateResults.errors && validateResults.errors.length >0) {
        if(source=="blur") setErrorText(validateResults.errors)
        //setIsValid(false)
        updateFormState(id,value,false)
        console.log(id+ "is -- NOT -- VALID "+validateResults.errors) 

    } else {
        setErrorText("")
        //setIsValid(true)
        updateFormState(id,value,true)
        console.log(id+ "is VALID ") 
    }

  }

    //run on initial render
    useEffect(() => {
        doFieldUpdate("initial")
      }, []);


    const handleBlur = (e) => {
        setTouched(true)
        doFieldUpdate("blur")
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