import { AnalisysOfCauseTypes } from './types';

export const INITIAL_STATE = {
    subjects: [],
    data: [],
    lessonLearned: "",
    numberOfRows: 1,
    loading: false,
    included: {show: false}
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AnalisysOfCauseTypes.ANALISYS_OF_CAUSE_STATE:
            return {...state, [action.payload.node]: action.payload.value}
        case AnalisysOfCauseTypes.GET_ANALISYS_SUBJECT_REQUEST:
          return {...state, loading: true};
        case AnalisysOfCauseTypes.GET_ANALISYS_SUBJECT_SUCCESS: 
         return {
            ...state,
            loading: false,
            subjects: action.payload.data,
          }
        case AnalisysOfCauseTypes.GET_ANALISYS_SUBJECT_FAILURE: 
          return {...state, loading: false}
        case AnalisysOfCauseTypes.GET_ANALISYS_OF_CAUSE_REQUEST:
          return {...state, loading: true};
        case AnalisysOfCauseTypes.GET_ANALISYS_OF_CAUSE_SUCCESS: 
          let formattedData = {};

          action.payload.data.listWhy.forEach(data =>{
            formattedData = {...formattedData, [data.rowNumber]: {...formattedData[data.rowNumber], [data.whySubjectId]: data.whyAnswer}}
          });

          let rows= action.payload.data.listWhy.length/6;

         return {
            ...state,
            loading: false,
            data: formattedData,
            lessonLearned: action.payload.data.lessonLearned,
            numberOfRows: rows === 0 ? 1 : rows
          }
        case AnalisysOfCauseTypes.GET_ANALISYS_OF_CAUSE_FAILURE: 
          return {...state, loading: false}
        case AnalisysOfCauseTypes.ANALISYS_OF_CAUSE_SAVE_REQUEST:
          return {...state, loading: true};
        case AnalisysOfCauseTypes.ANALISYS_OF_CAUSE_SAVE_SUCCESS: 
         return {
            ...state,
            loading: false,
            included: {show: true, ...action.payload.data},
          }
        case AnalisysOfCauseTypes.ANALISYS_OF_CAUSE_SAVE_FAILURE: 
          return {...state, loading: false}
        default:
            return state;
    }
};

export default reducer;