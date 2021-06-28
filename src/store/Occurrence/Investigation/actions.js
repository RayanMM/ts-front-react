import { action } from 'typesafe-actions';
import {InvestigationTypes} from './types';

export const investigation_state = (node, value) => action(InvestigationTypes.INVESTIGATION_STATE, {node, value});

export const weatherConditionRequest = () => action(InvestigationTypes.WEATHER_CONDITIONS_REQUEST);
export const weatherConditionSuccess = (data) => action(InvestigationTypes.WEATHER_CONDITIONS_SUCCESS, {data});
export const weatherConditionFailure = () => action(InvestigationTypes.WEATHER_CONDITIONS_FAILURE);

export const roadConditionRequest = () => action(InvestigationTypes.ROAD_CONDITIONS_REQUEST);
export const roadConditionSuccess = (data) => action(InvestigationTypes.ROAD_CONDITIONS_SUCCESS, {data});
export const roadConditionFailure = () => action(InvestigationTypes.ROAD_CONDITIONS_FAILURE);

export const vehicleTypeRequest = () => action(InvestigationTypes.VAHICLE_TYPE_REQUEST);
export const vehicleTypeSuccess = (data) => action(InvestigationTypes.VAHICLE_TYPE_SUCCESS, {data});
export const vehicleTypeFailure = () => action(InvestigationTypes.VAHICLE_TYPE_FAILURE);

export const stateListRequest = () => action(InvestigationTypes.STATE_LIST_REQUEST);
export const stateListSuccess = (data) => action(InvestigationTypes.STATE_LIST_SUCCESS, {data});
export const stateListFailure = () => action(InvestigationTypes.STATE_LIST_FAILURE);

export const getInvestigationRequest = (eventId) => action(InvestigationTypes.GET_INVESTIGATION_REQUEST, {eventId});
export const getInvestigationSuccess = (data) => action(InvestigationTypes.GET_INVESTIGATION_SUCCESS, {data});
export const getInvestigationFailure = () => action(InvestigationTypes.GET_INVESTIGATION_FAILURE);

export const updateInvestigationRequest = (data) => action(InvestigationTypes.UPDATE_INVESTIGATION_REQUEST, {data});
export const updateInvestigationSuccess = (data) => action(InvestigationTypes.UPDATE_INVESTIGATION_SUCCESS, {data});
export const updateInvestigationFailure = () => action(InvestigationTypes.UPDATE_INVESTIGATION_FAILURE);

export const positionTimeRequest = () => action(InvestigationTypes.POSITION_TIME_REQUEST, {});
export const positionTimeSuccess = (data) => action(InvestigationTypes.POSITION_TIME_SUCCESS, {data});
export const positionTimeFailure = () => action(InvestigationTypes.POSITION_TIME_FAILURE);

export const getBodyPartsRequest = () => action(InvestigationTypes.GET_BODY_PARTS_REQUEST);
export const getBodyPartsSuccess = (data) => action(InvestigationTypes.GET_BODY_PARTS_SUCCESS, {data});
export const getBodyPartsFailure = () => action(InvestigationTypes.GET_BODY_PARTS_FAILURE);
