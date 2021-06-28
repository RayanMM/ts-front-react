import { PreventiveAndCorrectiveTypes } from './types';

export const INITIAL_STATE = {
    subjects: [],
    data: [],
    numberOfRows: 1,
    loading: false,
    included: {show: false}
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PreventiveAndCorrectiveTypes.PREVENTIVE_CORRECTIVE_STATE:
            return {...state, [action.payload.node]: action.payload.value}
        case PreventiveAndCorrectiveTypes.GET_PC_SUBJECT_REQUEST:
          return {...state, loading: true};
        case PreventiveAndCorrectiveTypes.GET_PC_SUBJECT_SUCCESS: 
         return {
            ...state,
            loading: false,
            subjects: action.payload.data,
          }
        case PreventiveAndCorrectiveTypes.GET_PC_SUBJECT_FAILURE: 
          return {...state, loading: false}
        case PreventiveAndCorrectiveTypes.GET_PC_REQUEST:
          return {...state, loading: true};
        case PreventiveAndCorrectiveTypes.GET_PC_SUCCESS: 
          let formattedData = {};

          action.payload.data.forEach(data =>{
            formattedData = {...formattedData, [data.rowNumber]: {...formattedData[data.rowNumber], [data.actionSubjectId]: data.actionName}}
          });

          let rows= action.payload.data.length/8;

         return {
            ...state,
            loading: false,
            data: formattedData,
            numberOfRows: rows === 0 ? 1 : rows
          }
        case PreventiveAndCorrectiveTypes.GET_PC_FAILURE: 
          return {...state, loading: false}
        case PreventiveAndCorrectiveTypes.PREVENTIVE_CORRECTIVE_SAVE_REQUEST:
          return {...state, loading: true};
        case PreventiveAndCorrectiveTypes.PREVENTIVE_CORRECTIVE_SAVE_SUCCESS: 
         return {
            ...state,
            loading: false,
            included: {show: true, ...action.payload.data},
          }
        case PreventiveAndCorrectiveTypes.PREVENTIVE_CORRECTIVE_SAVE_FAILURE: 
          return {...state, loading: false}
        default:
            return state;
    }
};

export default reducer;