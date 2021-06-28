import {InvestigationTypes} from './types';

const INITIAL_STATE = {
    current_state:{

    },
    yes_no_options:[
        {value: 1, name: "Yes"},        
        {value: 2, name: "No"},        
    ],
    yes_no_na_options: [
        {value: 0, name: "NA"},
        {value: 1, name: "Yes"},        
        {value: 2, name: "No"},        
    ],
    weatherCondition: [],
    roadCondition: [],
    vehicleType: [],
    stateList: [],
    updated: {},
    bodyParts: [], 
    namedBodyParts: [],
    selectedBodyParts: [],
    positionTime: [],
    loading: false
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case InvestigationTypes.INVESTIGATION_STATE:
          return {...state, [action.payload.node]: action.payload.value}
        case InvestigationTypes.WEATHER_CONDITIONS_REQUEST:
          return {...state, loading: true};
        case InvestigationTypes.WEATHER_CONDITIONS_SUCCESS: 
          let wheatherConditionsList = [{value: -1, name: "Choose one"}];  

          action.payload.data.forEach(item =>{
            wheatherConditionsList.push({
              value: item.conditionsWeatherId,
              name: item.conditionsWeatherName,
              enabled: item.isEnabled
            });
          });

         return {
            ...state,
            loading: false,
            weatherCondition: wheatherConditionsList,
          }
        case InvestigationTypes.WEATHER_CONDITIONS_FAILURE: 
          return {...state, loading: false}
        case InvestigationTypes.ROAD_CONDITIONS_REQUEST:
          return {...state, loading: true};
        case InvestigationTypes.ROAD_CONDITIONS_SUCCESS: 
          let roadConditionList = [{value: -1, name: "Choose one"}];  

          action.payload.data.forEach(item =>{
            roadConditionList.push({
              value: item.conditionsRoadId,
              name: item.conditionsRoadName,
              enabled: item.isEnabled
            });
          });

         return {
            ...state,
            loading: false,
            roadCondition: roadConditionList,
          }
        case InvestigationTypes.ROAD_CONDITIONS_FAILURE: 
          return {...state, loading: false}
        case InvestigationTypes.VAHICLE_TYPE_REQUEST:
          return {...state, loading: true};
        case InvestigationTypes.VAHICLE_TYPE_SUCCESS: 
          let vehicleTypeList = [{value: -1, name: "Choose one"}];  

          action.payload.data.forEach(item =>{
            vehicleTypeList.push({
              value: item.vehicleTypeId,
              name: item.vehicleTypeName,
              enabled: item.isEnabled
            });
          });

         return {
            ...state,
            loading: false,
            vehicleType: vehicleTypeList,
          }
        case InvestigationTypes.VAHICLE_TYPE_FAILURE: 
          return {...state, loading: false}
        case InvestigationTypes.STATE_LIST_REQUEST:
          return {...state, loading: true};
        case InvestigationTypes.STATE_LIST_SUCCESS: 
          let stateList = [{value: -1, name: "Choose one"}];  

          action.payload.data.forEach(item =>{
            stateList.push({
              value: item,
              name: item
            });
          });

         return {
            ...state,
            loading: false,
            stateList: stateList,
          }
        case InvestigationTypes.STATE_LIST_FAILURE: 
          return {...state, loading: false}
        case InvestigationTypes.GET_INVESTIGATION_REQUEST:
          return {...state, loading: true};
        case InvestigationTypes.GET_INVESTIGATION_SUCCESS: 
          let formattedBodyParts = [];

          action.payload.data.bodyParts.forEach(part =>{
            formattedBodyParts.push(part.bodyPartId);
          });

         return {
            ...state,
            loading: false,
            current_state: {
              ...action.payload.data.investigationDataTask,
              investigationUseVehicle: action.payload.data.investigationDataTask && action.payload.data.investigationDataTask.investigationUseVehicle ? action.payload.data.investigationDataTask.investigationUseVehicle ? 1 : 0 : 0,
              investigationLastTrainingDefensiveDriving: action.payload.data.investigationDataTask && action.payload.data.investigationDataTask.investigationLastTrainingDefensiveDriving ? action.payload.data.investigationDataTask.investigationLastTrainingDefensiveDriving.split("T")[0] : "",
              investigationLicenseDueDate: action.payload.data.investigationDataTask && action.payload.data.investigationDataTask.investigationLicenseDueDate ? action.payload.data.investigationDataTask.investigationLicenseDueDate.split("T")[0] : "",
              investigationVehicleLastInspection: action.payload.data.investigationDataTask && action.payload.data.investigationDataTask.investigationVehicleLastInspection ? action.payload.data.investigationDataTask.investigationVehicleLastInspection.split("T")[0] : "",
              taskLastTraining: action.payload.data.investigationDataTask && action.payload.data.investigationDataTask.taskLastTraining ? action.payload.data.investigationDataTask.taskLastTraining.split("T")[0] : "",
            },
            bodyParts: formattedBodyParts
          }
        case InvestigationTypes.GET_INVESTIGATION_FAILURE: 
          return {...state, loading: false}
        case InvestigationTypes.UPDATE_INVESTIGATION_REQUEST:
          return {...state, loading: true};
        case InvestigationTypes.UPDATE_INVESTIGATION_SUCCESS: 
         return {
            ...state,
            loading: false,
            updated: {show: true, ...action.payload.data},
          }
        case InvestigationTypes.UPDATE_INVESTIGATION_FAILURE: 
          return {...state, loading: false}
        case InvestigationTypes.POSITION_TIME_REQUEST:
          return {...state, loading: true};
        case InvestigationTypes.POSITION_TIME_SUCCESS: 
          let positionTimeList = [{value: -1, name: "Choose one"}];  

          action.payload.data.forEach(item =>{
            positionTimeList.push({
              value: item.confParameterValueId,
              name: item.confParameterValueLabel,
            });
          });

         return {
            ...state,
            loading: false,
            positionTime: positionTimeList,
          }
        case InvestigationTypes.POSITION_TIME_FAILURE: 
          return {...state, loading: false}
        case InvestigationTypes.GET_BODY_PARTS_REQUEST:
          return {...state, loading: true};
        case InvestigationTypes.GET_BODY_PARTS_SUCCESS: 
         return {
            ...state,
            loading: false,
            namedBodyParts: action.payload.data,
          }
        case InvestigationTypes.GET_BODY_PARTS_FAILURE: 
          return {...state, loading: false}
        default:
            return state;
    }

}

export default reducer;