import React, {createContext, useReducer, useCallback} from "react";

const initialFormState = {}
const ControlledFormContext = createContext(initialFormState)
const { Provider} = ControlledFormContext;

const ControlledFormProvider = ({ children }) => {
  const [formState, dispatchFormState] = useReducer((currentState, action) => {
        const { type, id, value, isValid } = action;
        switch (type) {
            case 'UPDATE_FIELD': {
                let updatedState = {
                    ...currentState, 
                    [id]: {
                        "value": (value) ? value : "", 
                        isValid
                    }
                }
                //console.log("in dispatch updated: "+JSON.stringify(updatedState) )
                return updatedState;
            }


            default: {
                return currentState
            }
        }
  }, initialFormState);


//useCallback to improve performance
 const updateFormState = useCallback(
    (id, value, isValid) => {
        //console.log("updating state for "+id )
        dispatchFormState({ type: 'UPDATE_FIELD', id, value, isValid });
    }, [dispatchFormState]
 );



 const isFormValid = () => {
     let fieldValsArr = Object.values(formState)
     let isFormValid = !fieldValsArr.some( fieldVal => {
            return fieldVal.isValid == false
     })
     //console.log("IsFDormValid: "+isFormValid)
     return isFormValid
 }





  return (
   <Provider value={{formState, updateFormState, isFormValid}}>
            {children}
    </Provider>
  )
}

//This exports both the Context (for import into components) and the raw Provider for wrapping components
export { ControlledFormProvider, ControlledFormContext }
