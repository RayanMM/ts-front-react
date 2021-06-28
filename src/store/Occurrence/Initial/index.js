import {OccurrenceTypes} from './types';

export const INITIAL_STATE = {
    current_state: {
      absenceDateTimeEnd: undefined,
      absenceDateTimeIni: undefined,
      contractTypeId: undefined,
      dateTimeStamp: "",
      departamentId: undefined,
      eventActions: "",
      eventDescription: "",
      eventId: undefined,
      eventIdentification: "",
      eventInjuredPersonName: "",
      eventSIFCriticality: undefined,
      eventSIFStatus: undefined,
      eventSupervisorName: "",
      facilityId: undefined,
      happenedGroupId: undefined,
      happenedId: undefined,
      isClosed: undefined,
      isVehicleEvent: undefined,
      occupationId: undefined,
      occurrenceClassificationId: undefined,
      occurrenceTypeId: undefined,
      outSourcedCompaniesId: undefined,
      userDepartamentId: undefined,
      userId: undefined
    },
    loading: false,
    gotOccurrenceClassificationList: [],
    gotOccurrenceTypeList: [],
    gotOccurrenceJobList: [],
    facilityList: [],
    departamentList: [],
    contractTypeList: [],
    outsourcedList: [],
    happenedGroupList: [],
    happenedList: [],
    occurrenceInclusion: {
      Success: false,
      OccurrenceId: 0,
      Message: "",
      show: false
    },
    updated: {

    }
  };
  
  const reducer = (state = INITIAL_STATE, action) => {
      switch (action.type) {
        case OccurrenceTypes.OCCURRENCE_STATE:
          return {...state, [action.payload.node]: action.payload.value}
        case OccurrenceTypes.CLASSIFICATION_LIST_REQUEST:
          return {...state, loading: true};
        case OccurrenceTypes.CLASSIFICATION_LIST_SUCCESS: 
          let list = [{value: -1, name: "Choose one"}];  

          action.payload.data.forEach(item =>{
            list.push({
              value: item.occurrenceClassificationId,
              name: item.occurrenceClassificationName,
              enabled: item.isEnabled
            });
          });
        
          return {
              ...state,
              loading: false,
              gotOccurrenceClassificationList: list,
            }
        case OccurrenceTypes.CLASSIFICATION_LIST_FAILURE: 
          return {...state, loading: false}
        case OccurrenceTypes.TYPE_LIST_REQUEST:
          return {...state, loading: true};
        case OccurrenceTypes.TYPE_LIST_SUCCESS: 
          let typeList = [{value: -1, name: "Choose one"}];  

          action.payload.data.forEach(item =>{
            typeList.push({
              value: item.occurrenceTypeId,
              name: item.occurrenceTypeName,
              enabled: item.isEnabled
            });
          });

          return {
            ...state,
            loading: false,
            gotOccurrenceTypeList: typeList,
          }
        case OccurrenceTypes.TYPE_LIST_FAILURE: 
          return {...state, loading: false}
        case OccurrenceTypes.JOB_LIST_REQUEST:
          return {...state, loading: true};
        case OccurrenceTypes.JOB_LIST_SUCCESS: 
          let jobList = [{value: -1, name: "Choose one"}];  

          action.payload.data.forEach(item =>{
            jobList.push({
              value: item.occupationId,
              name: item.occupationName,
              enabled: item.isEnabled
            });
          });

          return {
            ...state,
            loading: false,
            gotOccurrenceJobList: jobList,
          }
        case OccurrenceTypes.JOB_LIST_FAILURE: 
          return {...state, loading: false}
        case OccurrenceTypes.FACILITY_LIST_REQUEST:
          return {...state, loading: true};
        case OccurrenceTypes.FACILITY_LIST_SUCCESS: 
          let facilityList = [{value: -1, name: "Choose one"}];  

          action.payload.data.forEach(item =>{
            facilityList.push({
              value: item.facilityId,
              name: `${item.facilityName} - ${item.facilityCity}`,
              enabled: item.isEnabled
            });
          });

          return {
            ...state,
            loading: false,
            facilityList: facilityList,
          }
        case OccurrenceTypes.FACILITY_LIST_FAILURE: 
          return {...state, loading: false}
        case OccurrenceTypes.DEPARTAMENT_LIST_REQUEST:
          return {...state, loading: true};
        case OccurrenceTypes.DEPARTAMENT_LIST_SUCCESS: 
          let departamentList = [{value: -1, name: "Choose one"}];  

          action.payload.data.forEach(item =>{
            departamentList.push({
              value: item.departamentId,
              name: item.departamentName,
              enabled: item.isEnabled
            });
          });

          return {
            ...state,
            loading: false,
            departamentList: departamentList,
          }
        case OccurrenceTypes.DEPARTAMENT_LIST_FAILURE: 
          return {...state, loading: false}
        case OccurrenceTypes.CONTRACT_TYPE_LIST_REQUEST:
          return {...state, loading: true};
        case OccurrenceTypes.CONTRACT_TYPE_LIST_SUCCESS: 
          let contractType = [{value: -1, name: "Choose one"}];  

          action.payload.data.forEach(item =>{
            contractType.push({
              value: item.contractTypeId,
              name: item.contractTypeName,
              enabled: item.isEnabled
            });
          });

          return {
            ...state,
            loading: false,
            contractTypeList: contractType,
          }
        case OccurrenceTypes.CONTRACT_TYPE_LIST_FAILURE: 
          return {...state, loading: false}
        case OccurrenceTypes.OUTSOURCED_LIST_REQUEST:
          return {...state, loading: true};
        case OccurrenceTypes.OUTSOURCED_LIST_SUCCESS: 
          let outsourcedType = [{value: -1, name: "Choose one"}];  

          action.payload.data.forEach(item =>{
            outsourcedType.push({
              value: item.outSourcedCompaniesId,
              name: item.outSourcedCompaniesName,
              enabled: item.isEnabled
            });
          });
          
          return {
            ...state,
            loading: false,
            outsourcedList: outsourcedType,
          }
        case OccurrenceTypes.OUTSOURCED_LIST_FAILURE: 
          return {...state, loading: false}
        case OccurrenceTypes.HAPPENED_GROUP_LIST_REQUEST:
          return {...state, loading: true};
        case OccurrenceTypes.HAPPENED_GROUP_LIST_SUCCESS: 
          let happenedGroupList = [{value: -1, name: "Choose one"}];  

          action.payload.data.forEach(item =>{
            happenedGroupList.push({
              value: item.happenedGroupId,
              name: item.happenedGroupName,
              enabled: item.isEnabled
            });
          });
          
          return {
            ...state,
            loading: false,
            happenedGroupList: happenedGroupList,
          }
        case OccurrenceTypes.HAPPENED_GROUP_LIST_FAILURE: 
          return {...state, loading: false}
        case OccurrenceTypes.HAPPENED_LIST_REQUEST:
          return {...state, loading: true};
        case OccurrenceTypes.HAPPENED_LIST_SUCCESS: 
          let happenedList = [{value: -1, name: "Choose one"}];  

          action.payload.data.forEach(item =>{
            happenedList.push({
              value: item.happenedId,
              name: item.happenedName,
              enabled: item.isEnabled
            });
          });

          return {
            ...state,
            loading: false,
            happenedList: happenedList,
          }
        case OccurrenceTypes.HAPPENED_GROUP_LIST_FAILURE: 
          return {...state, loading: false}
        case OccurrenceTypes.INCLUDE_OCCURRENCE_REQUEST:
          return {...state, loading: true};
        case OccurrenceTypes.INCLUDE_OCCURRENCE_SUCCESS: 
          return {
            ...state,
            loading: false,
            occurrenceInclusion: {...action.payload.data, show: true},
          }
        case OccurrenceTypes.INCLUDE_OCCURRENCE_FAILURE: 
          return {...state, loading: false}
        case OccurrenceTypes.GET_OCCURRENCE_REQUEST:
          return {...state, loading: true};
        case OccurrenceTypes.GET_OCCURRENCE_SUCCESS: 
          return {
            ...state,
            loading: false,
            current_state: {
              ...action.payload.data, 
              absenceDateTimeIni: action.payload.data.absenceDateTimeIni ? action.payload.data.absenceDateTimeIni.split("T")[0] : "",
              absenceDateTimeEnd: action.payload.data.absenceDateTimeEnd ? action.payload.data.absenceDateTimeEnd.split("T")[0] : ""
          },
          }
        case OccurrenceTypes.GET_OCCURRENCE_FAILURE: 
          return {...state, loading: false}
        case OccurrenceTypes.EDIT_OCCURRENCE_REQUEST:
          return {...state, loading: true};
        case OccurrenceTypes.EDIT_OCCURRENCE_SUCCESS: 
          return {
            ...state,
            loading: false,
            updated: {show: true, ...action.payload.data},
          }
        case OccurrenceTypes.EDIT_OCCURRENCE_FAILURE: 
          return {...state, loading: false}
        default:
          return state;
      }
  };
  
  export default reducer;