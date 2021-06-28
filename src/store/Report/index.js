import {ReportTypes} from './types';

const INITIAL_STATE = {
    reportObject: [],
    error: false,
    loading: false,
    success: false
  };
  
  const reducer = (state = INITIAL_STATE, action) => {
      switch (action.type) {
        case ReportTypes.RETRIEVE_REPORT_BY_MENU_REQUEST:
          return {...state, loading: true};
        case ReportTypes.RETRIEVE_REPORT_BY_MENU_SUCCESS: 
         return {
            ...state,
            error: false,
            success: true,
            loading: false,
            reportObject: action.payload.data,
          }
        case ReportTypes.RETRIEVE_REPORT_BY_MENU_FAILURE: 
          return {...state, loading: false, error: true, success: false}
        default:
          return state;
      }
  };
  
  export default reducer;