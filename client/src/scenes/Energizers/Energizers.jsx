import "./Energizers.css";
import React, { useState, useEffect, useContext } from "react";
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Cookies from 'universal-cookie';
import { withSnackbar } from 'notistack';
import CurrentUserContext, { CurrentUserConsumer, CurrentUserProvider }   from '../../contexts/CurrentUserContext.jsx';
import SlimList from './components/SlimList.jsx';
import EnergizerProfile from './components/EnergizerProfile.jsx';
import ReviewWikiResults from './components/ReviewWikiResults.jsx';
import SearchPage from './components/Search';
import ChartPage from './components/Chart';
import UploadPage from './components/Upload';

import { useHistory } from "react-router-dom";

import * as api from '../../services/api';
import * as utils from '../../services/utils';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


const Energizers = (props) => {

  const [isLoading, setisLoading] = useState(true)
  const [openEditModal, setopenEditModal] = useState(false)
  const [openListModal, setopenListModal] = useState(true)
  const [openReviewWikiModal, setopenReviewWikiModal] = useState(false)  
  const [openSearchModal, setopenSearchModal] = useState(false)
  const [openChartModal, setopenChartModal] = useState(false)
  const [openUploadModal, setopenUploadModal] = useState(false)
  const [sortByAlpha, setsortByAlpha] = useState(true)


  const [energizerUnderEdit, setenergizerUnderEdit] = useState({})
  const [wikiResults, setwikiResults] = useState({})
  const [energizers, setenergizers] = useState([])
  const [filteredEnergizers, setfilteredEnergizers] = useState([]) //YES NEED BOTH
 
  const [statesWithCounts, setstatesWithCounts] = useState([]) 
  const [filterTerm, setfilterTerm] = useState("")

  //const [stateCurrentUser, setstateCurrentUser] = useState({})
  const [cookieUser, setcookieUser] = useState("")   //NECESSARY?


 // const { currentUser } = context;    
  const history = useHistory();
  const cookies = new Cookies(); 

  const refreshEnergizers = async () => {
    let energizers = await api.fetchEnergizers(sortByAlpha) 
    console.log("DID REFRESH-ENERGIZERS, GOT: ", energizers.length)
    setenergizers(energizers)
    setfilteredEnergizers(energizers)
    setisLoading(false)
}


  // useEffect(() => {
  //   let localCookieUser = cookies.get('userEmail') || "";
  //   setcookieUser(localCookieUser)
  //   console.log("DOING useEffect - on-Load cookieuser is:", localCookieUser )
  //   if (!localCookieUser  || localCookieUser ==="" || localCookieUser ==="UNAUTH") {
  //     console.log("NOT LOGGED IN")
  //     history.push('/login');
  //     return;
  //   }

  // }, [] );



  //do on initial pageload and sort change
  useEffect(() => {
    let localCookieUser = cookies.get('userEmail') || "";
    setcookieUser(localCookieUser)
    if (!localCookieUser  || localCookieUser ==="" || localCookieUser ==="UNAUTH") {
      history.push('/login');
      return;
    } 

    setisLoading(true)
    onClearSearch()
    refreshEnergizers()
    
  }, [sortByAlpha] );


  const onDialogClose = () => {
    console.log("DO dialog close")
    closeAll()
    setopenListModal(true)
  };


  const closeAll = () => {
    console.log("DO closeAll")
    setopenListModal(false)
    setopenEditModal(false)
    setopenReviewWikiModal(false)
    setenergizerUnderEdit({})
    setopenSearchModal(false)
    setopenChartModal(false)
    setopenUploadModal(false)
}

const onClearSearch = () => {
  closeAll()
  setopenListModal(true)
  setfilterTerm("")
  setfilteredEnergizers(energizers)
};






//why is this here and not in search component
const doFilter = async (searchTerm, statesOnly) => {
    setfilterTerm(searchTerm)
    let altState = (searchTerm.length === 2) ? utils.fullStateFromAcr(searchTerm) : utils.acrFromFullState(searchTerm)

    setfilteredEnergizers(statesOnly ?
      energizers.filter (ezr => {
              return ezr.bornState && ezr.bornState.toUpperCase() == searchTerm.toUpperCase() || 
              ezr.homeState && ezr.homeState.toUpperCase() == searchTerm.toUpperCase() ||
              ezr.bornState && altState && ezr.bornState.toUpperCase() == altState.toUpperCase()  || 
              ezr.homeState && altState && ezr.homeState.toUpperCase() == altState.toUpperCase() 
      })   :
      energizers.filter (ezr => {
              return ezr.bornState && ezr.bornState.toUpperCase() == searchTerm.toUpperCase() || 
              ezr.homeState && ezr.homeState.toUpperCase() == searchTerm.toUpperCase() ||
              ezr.currentState && ezr.currentState.toUpperCase() == searchTerm.toUpperCase() ||
              ezr.bornState && altState && ezr.bornState.toUpperCase() == altState.toUpperCase()  || 
              ezr.homeState && altState && ezr.homeState.toUpperCase() == altState.toUpperCase()  ||
              ezr.currentState && altState && ezr.currentState.toUpperCase() == altState.toUpperCase()  ||
              ezr.bornTown && ezr.bornTown.includes(searchTerm) || 
              ezr.homeTown && ezr.homeTown.includes(searchTerm) || 
              ezr.bio && ezr.bio.includes(searchTerm) || 
              ezr.earlyLife && ezr.earlyLife.includes(searchTerm) || 
              ezr.education && ezr.education.includes(searchTerm) || 
              ezr.highSchool && ezr.highSchool.includes(searchTerm) || 
              ezr.playsWith && ezr.playsWith.includes(searchTerm) ||
              ezr.firstName && ezr.firstName.includes(searchTerm) ||
              ezr.lastName && ezr.lastName.includes(searchTerm)
      })
     )

};

//this should be a hook
const onOpenChart = async () => {     
  closeAll() 
  if (statesWithCounts.length < 1) {
    const statesMap = new Map()

    energizers.forEach(enzr => {
      if(statesMap.has(enzr.bornState)) {
            statesMap.set(enzr.bornState,statesMap.get(enzr.bornState)+1)
      } else {
            statesMap.set(enzr.bornState,1)
      }

      if(statesMap.has(enzr.homeState)) {
        statesMap.set(enzr.homeState,statesMap.get(enzr.homeState)+1)
      } else {
        statesMap.set(enzr.homeState,1)
      }
    })

    //map to array
    let newStatesCountsArr = Array.from(statesMap.keys()).map(key => {
        return {
          "stateName" : key,
          "numEnergizers" : statesMap.get(key)
        }
      });
    setstatesWithCounts(newStatesCountsArr)
  }

  setopenChartModal(true)
};



const onEditEnergizer = ({ energizer }) => {
    closeAll()
    setenergizerUnderEdit(energizer)
    setopenEditModal(true)
};


const onNewEnergizer = () => {
    closeAll()
    setopenListModal(false)
    setopenEditModal(true)
};






  const downloadCSV = async () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    //const fileExtension = '.xlsx';

    let fileName = "energizers"
    if (filterTerm.length > 1) {
      fileName = fileName + "-"+filterTerm
    }
    fileName.concat(".csv")
    let csvData = filteredEnergizers;

    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName);
}



  const onStartScrapeWiki = async  energizer  => {
      closeAll()
      try {
        setwikiResults(await api.scrapeWikiUrl(energizer));
        props.enqueueSnackbar('Got Wiki Page')

        setenergizerUnderEdit(energizer)  //NECESSARY?
        setopenReviewWikiModal(true)

      } catch (err) {
        console.log("problem", err)
        props.enqueueSnackbar(
           'Oops, something went wrong getting Wiki page'
         );
      }
  };



  const updateEnergizer = async energizer => {  
    try {
      let response = await api.updateEnergizer({updatedEnz:energizer});
      let updatedEnergizer = response.data
      //manually insert updated energizer without another DB request
      console.log("ENZ got updated", updatedEnergizer.bornState, updatedEnergizer.homeState,);
      let newFilteredEnergizers = filteredEnergizers.slice()
      let updateIndex = newFilteredEnergizers.findIndex(enz => enz.id === updatedEnergizer.id)
      newFilteredEnergizers.splice(updateIndex, 1, updatedEnergizer );
      setfilteredEnergizers(newFilteredEnergizers)
      setenergizers(newFilteredEnergizers)
      props.enqueueSnackbar('Energizer updated!');

    } catch (err) {
       props.enqueueSnackbar(
        'Oops, something went wrong with the Update. Please Try again'+err
       );
    }
  };

  const createEnergizer = async energizer => {
    console.log("FRONT end CREATE energizer", JSON.stringify(energizer,null,4))

    try {
      await api.createEnergizer({newEnz:energizer});
      setenergizers(energizers => [energizer, ...energizers] )
      setfilteredEnergizers(energizers => [energizer, ...energizers])
      props.enqueueSnackbar('Energizer created!');
    } catch {
       props.enqueueSnackbar(
         'Oops, something went wrong. Please Try again'
       );
    }
  };


  const deleteEnergizer = async energizer => {
    try {
      await api.deleteEnergizer(energizer);
      onDialogClose() 
      refreshEnergizers();
      props.enqueueSnackbar('Energizer deleted!');
    } catch {
       props.enqueueSnackbar(
         'Oops, something went wrong. Please Try again'
       );
    }
  };

  const sendUploadList= async (enzList) => {

    let enzListWithWiki = enzList.map(enz => {
         
          if (!enz.wikiPage || enz.wikiPage.length <10 ) {
              let capFirst = enz.firstName.charAt(0).toUpperCase()
              if(enz.firstName.length > 0) capFirst+=enz.firstName.substring(1);
              let capLast = enz.lastName.charAt(0).toUpperCase()
              if(enz.lastName.length > 0) capLast+=enz.lastName.substring(1);
              let autoWiki = "https://en.wikipedia.org/wiki/"+capFirst+"_"+capLast
              enz.wikiPage = autoWiki 
          }
          return enz
    })


    try {
      await api.sendUploadList({enzlist: enzListWithWiki});
      props.enqueueSnackbar('Energizer List Added!');
      refreshEnergizers();
      onDialogClose()

    } catch {
       props.enqueueSnackbar(
         'Oops, something went wrong with adding the List.'
       );
    }
  };



    return (
      <div id="outerContainer">  
            <div id="buttonsRow">   
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={onNewEnergizer}
                    >
                      Add Energizer
                    </Button>

                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => setopenUploadModal(true)}
                    >
                      Upload List
                    </Button>


                    <Button
                    color="primary"
                    variant="contained"
                    onClick={downloadCSV}
                  >
                    Download List
                  </Button>

                    <Button
                    color="primary"
                    variant="contained"
                    onClick={onOpenChart}
                  >
                    States Map
                  </Button>
       

                  <Button
                  color="primary"
                  variant="contained"
                  onClick={() => setopenSearchModal(true)}
                >
                  Search
                </Button>


                <span className="showSearchTerm">
                  {filterTerm}
                </span>

                <Button
                  color="primary"
                  variant="contained"
                  onClick={onClearSearch}
                >
                  Clear
                </Button>

                
              <span id="switchBox">     <Switch 
                  checked={sortByAlpha}
                  onChange={() => setsortByAlpha(!sortByAlpha)} 
                  value={sortByAlpha} 
                /> &alpha; </span>
           
            </div>

            
            {openListModal  && (        
              <div>
                {!isLoading ? 
                    <SlimList
                      energizers={filteredEnergizers}
                      onEditEnergizer={onEditEnergizer}
                      onStartScrapeWiki = {onStartScrapeWiki}
                      sortByAlpha = {sortByAlpha}
                    /> : <div> Loading... </div>
                }
              </div> 

              )}

            {openEditModal && (
              <div>
                    <EnergizerProfile
                      energizer={energizerUnderEdit}
                      updateEnergizer={updateEnergizer}
                      createEnergizer={createEnergizer}
                      deleteEnergizer={deleteEnergizer}
                      onClose={onDialogClose}
                    />
              </div>  
            )}


              {openReviewWikiModal && (
              <div>
                <ReviewWikiResults
                  energizer={energizerUnderEdit.energizer}
                  wikiResults={wikiResults}
                  updateEnergizer={updateEnergizer}
                  onClose={onDialogClose}
                />
              </div>

            )}

            {openSearchModal && (
            <div>
              <SearchPage
                doSearch={doFilter}
                onClose={onDialogClose}
              />
            </div>
            )}

            {openChartModal &&  (
            <div>
              <ChartPage
                statesWithCounts = {statesWithCounts}
                doSearch={doFilter}
                onClose={onDialogClose}
              />
            </div>
            )}

            {openUploadModal &&  (
            <div>
              <UploadPage
                onClose={onDialogClose}
                sendUploadList = {sendUploadList}
              /> 
            </div>
            )}  


            </div>
         ) //return

  } //component



export default withSnackbar(Energizers);

//Energizers.contextType = CurrentUserContext;
