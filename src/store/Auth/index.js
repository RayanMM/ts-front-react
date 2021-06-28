import {AuthTypes} from './types';

const INITIAL_STATE = {
    success: false,
    error: false,
    loading: false,
    accessToken: '',
    signedOut: false
  };
  
  const reducer = (state = INITIAL_STATE, action) => {
      switch (action.type) {
        case AuthTypes.AUTH_REQUEST:
          return {...state, loading: true, succes: false, error: false};
        case AuthTypes.AUTH_SUCCESS: 
         return {
            ...state,
            loading: false,
            accessToken: action.payload.data.accessToken,
            success: action.payload.data.success,
            error: false
          }
        case AuthTypes.AUTH_FAILURE: 
          return {...state,success: false, loading: false, error: true}
        case AuthTypes.AUTH_SIGN_OUT:
          return {...state, success: false, signedOut: true}
        default:
          return state;
      }
  };
  
  export default reducer;