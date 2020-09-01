

  
  let stateKeys = {
      "AL": "Alabama",
      "AK": "Alaska",
      "AS": "American Samoa",
      "AZ": "Arizona",
      "AR": "Arkansas",
      "CA": "California",
      "CO": "Colorado",
      "CT": "Connecticut",
      "DE": "Delaware",
      "DC": "District Of Columbia",
      "FM": "Federated States Of Micronesia",
      "FL": "Florida",
      "GA": "Georgia",
      "GU": "Guam",
      "HI": "Hawaii",
      "ID": "Idaho",
      "IL": "Illinois",
      "IN": "Indiana",
      "IA": "Iowa",
      "KS": "Kansas",
      "KY": "Kentucky",
      "LA": "Louisiana",
      "ME": "Maine",
      "MH": "Marshall Islands",
      "MD": "Maryland",
      "MA": "Massachusetts",
      "MI": "Michigan",
      "MN": "Minnesota",
      "MS": "Mississippi",
      "MO": "Missouri",
      "MT": "Montana",
      "NE": "Nebraska",
      "NV": "Nevada",
      "NH": "New Hampshire",
      "NJ": "New Jersey",
      "NM": "New Mexico",
      "NY": "New York",
      "NC": "North Carolina",
      "ND": "North Dakota",
      "MP": "Northern Mariana Islands",
      "OH": "Ohio",
      "OK": "Oklahoma",
      "OR": "Oregon",
      "PW": "Palau",
      "PA": "Pennsylvania",
      "PR": "Puerto Rico",
      "RI": "Rhode Island",
      "SC": "South Carolina",
      "SD": "South Dakota",
      "TN": "Tennessee",
      "TX": "Texas",
      "UT": "Utah",
      "VT": "Vermont",
      "VI": "Virgin Islands",
      "VA": "Virginia",
      "WA": "Washington",
      "WV": "West Virginia",
      "WI": "Wisconsin",
      "WY": "Wyoming"
    }
    
export const stateNames = Object.values(stateKeys)

const capitalizePhrase = (text) => {
  return text.split(" ").reduce((allCapPhrase, word) => {
    allCapPhrase += word.charAt(0).toUpperCase()+word.substring(1).toLowerCase()+" "   
    return allCapPhrase
  }, "").trim()
}


const isNotBlank = (text) => {  
    return {
      "text": text,
      "errorMsg":  (text.length > 0) ? null : "Can't be blank."
    }  
}

const isUSState = (text) => {
  //if valid state acronym
    text = text.toUpperCase()
    text = (stateKeys[text] !== undefined) ? stateKeys[text] : text
  //capitalize
    text = (stateNames.includes(capitalizePhrase(text))) ? capitalizePhrase(text) : text

    return {
      "text": text,
      "errorMsg":  (stateNames.includes(text) || text.length <1) ? null : "Must be valid U.S. state."
    }  
}


const validationsMap = {
  "REQUIRED": isNotBlank,
  "IS_US_STATE": isUSState
}


export const validateField = (validations, text) => {
    if (validations.length < 1) return []
    let newText = text

    let errorsArray =  validations.reduce((errorsArray, validation) => {
          let validationResult = validationsMap[validation](newText)
          //console.log("FOR VALIDATION "+validation+" got: "+JSON.stringify(validationResult))
          if (validationResult.errorMsg) errorsArray.push(validationResult.errorMsg)
          newText =  validationResult.text       
          return errorsArray
    }, [])

    return {
      "text": newText,
      "errors":  errorsArray  
    }  
}


export const fullStateFromAcr = (stateAcr) => {
  return stateKeys[stateAcr] || null
}


export const acrFromFullState = (stateFull) => {
  let fullStateKeys = invert(stateKeys)
  return fullStateKeys[stateFull] || null
}



function invert(obj) {
  var result = {};
  var keys = Object.keys(obj);
  for (var i = 0, length = keys.length; i < length; i++) {
      if (result[obj[keys[i]]] instanceof Array) {
          result[obj[keys[i]]].push(keys[i])
      } else if (result[obj[keys[i]]]) {
          var temp = result[obj[keys[i]]];
          result[obj[keys[i]]] = [temp, keys[i]];
      } else {
          result[obj[keys[i]]]=keys[i];
      }
  }
  return result;
}


export const formatPhoneNumber = phoneNumberString => {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ')' + match[2] + '-' + match[3];
  }
  return null;
};


