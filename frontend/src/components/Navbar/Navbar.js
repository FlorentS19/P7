import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import SecurityIcon from '@material-ui/icons/Security';
import { useNavigate , useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import logo from '../../assets/icon-left-font-removebg.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';
const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();
  const navigate = useNavigate() ;
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate('/auth');
  };
  useEffect(() => {
    setUser ( JSON.parse(localStorage.getItem('profile')) ) ;
    const token = user?.token;
    console.log ( token ) ;

    if (token) {
      const decodedToken = decode(token);
      console.log ( decodedToken.exp * 1000 ) ;
      console.log (  new Date().getTime()  ) ;
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location] );
  const  handleClick = () => {
    navigate('/auth');
  }

  return (

    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <img className={classes.image} src={logo} alt="logo Entreprise Groupomania" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>{( user?.result?.isAdmin) && (
        <SecurityIcon fontSize="large" />
         )}
        {user?.result ? (
          <div className={classes.profile}>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Se Déconnecter</Button>
            <h2 className={classes.userName}>{user?.result.name}</h2>
          </div>
        ) : (
           <Button className={classes.logout} variant="contained" color="secondary" onClick = { handleClick } >Se Connecter</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
