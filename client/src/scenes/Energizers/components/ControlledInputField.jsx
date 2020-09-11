import "./ControlledInputField.css";
import React, { useState, useEffect, useContext,useCallback } from "react";
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
    //const [isValid, setIsValid] = useState(false);
    const [touched, setTouched] = useState(false);
    const [errorText, setErrorText] = useState(initialErrorText || "");

    const { updateFormState } = useContext(ControlledFormContext);

    const handleChange = value => {
           setValue(value)
           setTouched(false) //so next blur will register
    };

    //const doFieldUpdate = useCallback((source) => { 
    //dont need useCallback because not calling useEffect based on a function     
    const doFieldUpdate = () => {
        console.log("FieldUpdate "+id+ " touched= "+touched+ " with "+value) 
        let validateResults = validateField(toValidate,value)
        let isFieldValid = !(validateResults.errors && (validateResults.errors.length >0))

        setValue(validateResults.text) //show in field
        saveField(id,validateResults.text) //in parent component - for sumbission
        updateFormState(id,validateResults.text,isFieldValid) //tracking form validation
        setErrorText( (!isFieldValid) ? validateResults.errors : ""  )
    
    }
//},[touched])

    //this runs on initial AND when touched changes
    useEffect(() => {
        doFieldUpdate()
    }, [touched] );


    const handleBlur = () => {
        setTouched(true)
        //doFieldUpdate("blur") 
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
                    onChange={event => handleChange(event.target.value)}
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
                    onChange={event => handleChange(event.target.value)}
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
