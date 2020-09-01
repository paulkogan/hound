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

  //this is the exposed update function
 const updateFormState = (id, value, isValid) => {
        dispatchFormState({ type: 'UPDATE_FIELD', id, value, isValid });
 }


 //why usecallback?
//  const updateFormState = useCallback(
//     (id, value, isValid) => {
//         //console.log("updating state for "+id )
//         dispatchFormState({ type: 'UPDATE_FIELD', id, value, isValid });
//     }, [dispatchFormState]
//  );



  return (
   <Provider value={{formState, updateFormState}}>
            {children}
    </Provider>
  )
}

//This exports both the Context (for import into components) and the raw Provider for wrapping components
export { ControlledFormProvider, ControlledFormContext }
