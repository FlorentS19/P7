import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:{
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
     return { aa : "aa" } ;
    }
    case actionType.LOGOUT:
      localStorage.clear();
      
       return { aa : "aa" } ;
    default:
      return state;
  }
};

export default authReducer;
