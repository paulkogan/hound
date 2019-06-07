import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import AddCircleIcon from '@material-ui/icons/AddCircle'

const Header = () => {
  return (
    <header className="header">
    <br/><br/>
    <Grid container spacing={ 40 }  className="">
      <Grid item xs={ 7 } lg={ 3 }>
           <div>
                 <h2 className="users-header">
                         View Patients
                 </h2>
          </div>
      </Grid>
      <Grid item xs={ 5 } lg={ 3 }>
           <div align="left">
                 <Link to={"/patients/new"}
                       className="plank-link"
                       style={{paddingLeft: 0, textDecoration: 'none'}}>
                       <AddCircleIcon  color="primary" style={{fontSize: '40px'}}/>
                </Link>
          </div>
      </Grid>
    </Grid>

    </header>

  );
};

export default Header;
  //<Link to={"/patients/"+id}></Link>
