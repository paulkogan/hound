import "./Energizers.css";
import React, { useState, useEffect, useContext } from "react";
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Cookies from 'universal-cookie';
import { withSnackbar } from 'notistack';
import CurrentUserContext, { CurrentUserConsumer, CurrentUserProvider }   from '../../contexts/CurrentUserContext.jsx';
import SlimList from './components/SlimList';
import EnergizerProfile from './components/EnergizerProfile.jsx';
import ReviewWikiResults from './components/ReviewWikiResults.jsx';
import SearchPage from './components/Search';
import ChartPage from './components/Chart';
import UploadPage from './components/Upload';

import { useHistory } from "react-router";

import * as api from '../../services/api';
import * as utils from '../../services/utils';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


const Energizers = (props) => {

  const [isLoading, setisLoading] = useState(false)
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
 
  const [statesWithCounts, setstatesWithCounts] = useState(true) 
  const [filterTerm, setfilterTerm] = useState("")

  //const [stateCurrentUser, setstateCurrentUser] = useState({})
  const [cookieUser, setcookieUser] = useState()   //NECESSARY?


 // const { currentUser } = context;
  const history = useHistory();
  const cookies = new Cookies();
  

  useEffect(() => {
    setcookieUser(cookies.get('userEmail') || "")
    console.log("USER ", cookieUser)
    // if (cookieUser==="") {
    //   history.push('/login');
    //   return;
    // }
    refreshEnergizers()
  }, [] );



  //do onece on load
  useEffect(() => {
    onClearSearch()
    refreshEnergizers()
  }, [sortByAlpha] );



//SORTING FRONTEND
// sortArray = async (enzArray) => {
//   if (state.sortByAlpha) {
//     console.log("SORTING BY ALPHA", enzArray.length)
//     await enzArray.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1)
//   } else {
//     //sort by created
//     console.log("SORTING BY createdAt", enzArray.length)
//     enzArray.sort((a, b) => {
//        if (!b.createdAt) return -1
//        if (!a.createdAt) return 1
//        if (b.createdAt > a.createdAt) {
//          return 1
//        } else {
//          return -1
//        }
//     })   
//   }
//   return enzArray
// }


const refreshEnergizers = async () => {
    let energizers = await api.fetchEnergizers(sortByAlpha) 
    console.log("REFRESHED FROM from DB", energizers.length)
    setenergizers(energizers)
}


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


const onEditEnergizer = ({ energizer }) => {
    closeAll()
    setenergizerUnderEdit(energizer)
    setopenEditModal(true)
};


const onNewEnergizer = () => {
    closeAll()
    setopenEditModal(true)
};

const onOpenSearch = () => {
      setopenSearchModal(true)
  };

const onOpenUpload = () => {
    setopenUploadModal(true)
};


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

        
        let newStatesCountsArr = Array.from(statesMap.keys()).map(key => {
            return {
              "stateName" : key,
              "numEnergizers" : statesMap[key]
            }
          });

        console.log("STATES WITH COUNTS Array", newStatesCountsArr)  
        setstatesWithCounts(newStatesCountsArr)

        // let statesWithCounts = []
        // for (let [key,value] of statesMap.entries() ) {
        //   statesWithCounts.push({
        //     "stateName" : key,
        //     "numEnergizers" : value
        //   })
        // }

        // setState({
        //   statesWithCounts
        // });
      }

      setopenChartModal(true)

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
        //console.log("WikiResults on FRONTEND", wikiResults)
        props.enqueueSnackbar('Got Wiki Page')

        setenergizerUnderEdit(energizer)  //NECESSARY?
        //setwikiResults(wikiResults)
        setopenReviewWikiModal(true)
        // await setState({
        //   energizerUnderEdit: energizer,
        //   wikiResults,
        //   openReviewWikiModal: true
        // });


      } catch (err) {
        console.log("problem", err)
        props.enqueueSnackbar(
           'Oops, something went wrong getting Wiki page'
         );
      }
  };



  const updateEnergizer = async energizer => {   //then what is energizer UnderEdit?
    try {
      let response = await api.updateEnergizer({updatedEnz:energizer});
      //console.log("FRONT end Update energizer resp", JSON.stringify(response,null,4));
      let updatedEnergizer = response.data
      //manually insert updated energizer without another DB requrst
      let newFilteredEnergizers = filteredEnergizers.slice()
      let updateIndex = newFilteredEnergizers.findIndex(enz => enz.id === updatedEnergizer.id)
      newFilteredEnergizers.splice(updateIndex, 1, updatedEnergizer );
      setfilteredEnergizers(newFilteredEnergizers)
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
              console.log ("ADDING ", autoWiki)
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

  const closeAll = () => {
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


const onDialogClose = () => {
    closeAll()
    setopenListModal(true)
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
                      onClick={onOpenUpload}
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
                  onClick={onOpenSearch}
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

                

                <Switch 
                  checked={sortByAlpha}
                  onChange={() => setsortByAlpha(!sortByAlpha)} 
                  value={sortByAlpha} 
                /> &alpha;
            </div>

            
            {openListModal && (
              
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
                  //energizer={energizerUnderEdit.energizer}
                  energizer={energizerUnderEdit}
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