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
    //const [isValid, setIsValid] = useState(false);
    //const [touched, setTouched] = useState(false);
    // let value = initialValue || ""
    // let isValid = false
    // let touched = false
    const [errorText, setErrorText] = useState(initialErrorText || "");



   const { updateFormState } = useContext(ControlledFormContext);

    const handleChange = e => {
           setValue(e.target.value)
    };
    
  const doFieldUpdate = (source) => {
    //console.log("FieldUpdate "+id+ " from "+source+ " with "+value) 
    let validateResults = validateField(toValidate,value)
    if(source==="blur") {
        setValue(validateResults.text) //why bpother - to show on screen
        saveField(id,validateResults.text) //this will always be good.
    }

    if (validateResults.errors && validateResults.errors.length >0) {
        //setIsValid(false)
        if(source==="blur") { //touched does not get there
            setErrorText(validateResults.errors)
        }
        updateFormState(id,validateResults.text,false)
        //console.log(id+ "is -- NOT -- VALID "+validateResults.errors) 

    } else {  //no errors
        //setIsValid(true)
        setErrorText("")
        updateFormState(id,validateResults.text,true)
        
        //console.log(id+ "is VALID ") 
    }
    
  }

    //run on initial render to disable empty form if tehre are required fields
    useEffect(() => {
        doFieldUpdate("initial")
    }, []);


    // useEffect(() => {
    //     doFieldUpdate("touched")
    // }, [touched]);




    const handleBlur = (e) => {
        //setTouched(true) //no point
        doFieldUpdate("blur") //how do you do async useState updates
        //this is a placeholder, should update context and validate form
        
        
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