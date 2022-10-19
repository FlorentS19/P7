import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';


export const login = (formData , navigate ) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    dispatch({ type: AUTH, data });
    navigate('/post');
    
  } catch (error) {
   alert ( "Vérifier votre Pseudo et/ou Mot de Passe" ) ;
    console.log(error.message);
  }
};
console.log(login)


export const signup = (formData , navigate ) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    dispatch({ type: AUTH, data });
    navigate('/post');

  } catch (error) {
   alert ( "Vérifier vos données saisies. Inscription impossible" ) ;
    console.log(error.message);
  }
};
