import { action } from 'typesafe-actions';
import { OccurrenceTypes } from './types';

export const OccurrenceState = (node, value) => action(OccurrenceTypes.OCCURRENCE_STATE, {node, value});

export const getOccurrenceClassificationListRequest = () => action(OccurrenceTypes.CLASSIFICATION_LIST_REQUEST, {});

export const getOccurrenceClassificationListSuccess = data => action(OccurrenceTypes.CLASSIFICATION_LIST_SUCCESS, { data });

export const getOccurrenceClassificationListFailure = () => action(OccurrenceTypes.CLASSIFICATION_LIST_FAILURE);

export const getOccurrenceTypeListRequest = () => action(OccurrenceTypes.TYPE_LIST_REQUEST, {});

export const getOccurrenceTypeListSuccess = data => action(OccurrenceTypes.TYPE_LIST_SUCCESS, {data});

export const getOccurrenceTypeListFailure = () => action(OccurrenceTypes.TYPE_LIST_FAILURE);

export const getOccurrenceJobListRequest = () => action(OccurrenceTypes.JOB_LIST_REQUEST, {});

export const getOccurrenceJobListSuccess = data => action(OccurrenceTypes.JOB_LIST_SUCCESS, {data});

export const getOccurrenceJobListFailure = () => action(OccurrenceTypes.JOB_LIST_FAILURE);

export const facilityListRequest = () => action(OccurrenceTypes.FACILITY_LIST_REQUEST);

export const facilityListSuccess = data => action(OccurrenceTypes.FACILITY_LIST_SUCCESS, {data});

export const facilityListFailure = () => action(OccurrenceTypes.FACILITY_LIST_FAILURE);

export const departamentListRequest = () => action(OccurrenceTypes.DEPARTAMENT_LIST_REQUEST);

export const departamentListSuccess = data => action(OccurrenceTypes.DEPARTAMENT_LIST_SUCCESS, {data});

export const departamentListFailure = () => action(OccurrenceTypes.DEPARTAMENT_LIST_FAILURE);

export const contractTypeListRequest = () => action(OccurrenceTypes.CONTRACT_TYPE_LIST_REQUEST);

export const contractTypeListSuccess = data => action(OccurrenceTypes.CONTRACT_TYPE_LIST_SUCCESS, {data});

export const contractTypeListFailure = () => action(OccurrenceTypes.CONTRACT_TYPE_LIST_FAILURE);

export const outsourcedListRequest = () => action(OccurrenceTypes.OUTSOURCED_LIST_REQUEST);

export const outsourcedListSuccess = data => action(OccurrenceTypes.OUTSOURCED_LIST_SUCCESS, {data});

export const outsourcedListFailure = () => action(OccurrenceTypes.OUTSOURCED_LIST_FAILURE);

export const happenedGroupListRequest = () => action(OccurrenceTypes.HAPPENED_GROUP_LIST_REQUEST);

export const happenedGroupListSuccess = data => action(OccurrenceTypes.HAPPENED_GROUP_LIST_SUCCESS, {data});

export const happenedGroupListFailure = () => action(OccurrenceTypes.HAPPENED_GROUP_LIST_FAILURE);

export const happenedListRequest = (happenedGroupId) => action(OccurrenceTypes.HAPPENED_LIST_REQUEST, {happenedGroupId});

export const happenedListSuccess = data => action(OccurrenceTypes.HAPPENED_LIST_SUCCESS, {data});

export const happenedListFailure = () => action(OccurrenceTypes.HAPPENED_LIST_FAILURE);

export const includeOccurrenceRequest = (data) => action(OccurrenceTypes.INCLUDE_OCCURRENCE_REQUEST, {data});

export const includeOccurrenceSuccess = data => action(OccurrenceTypes.INCLUDE_OCCURRENCE_SUCCESS, {data});

export const includeOccurrenceFailure = () => action(OccurrenceTypes.INCLUDE_OCCURRENCE_FAILURE);

export const getOccurrenceRequest = (eventId) => action(OccurrenceTypes.GET_OCCURRENCE_REQUEST, {eventId});

export const getOccurrenceSuccess = data => action(OccurrenceTypes.GET_OCCURRENCE_SUCCESS, {data});

export const getOccurrenceFailure = () => action(OccurrenceTypes.GET_OCCURRENCE_FAILURE);

export const editOccurrenceRequest = (data) => action(OccurrenceTypes.EDIT_OCCURRENCE_REQUEST, {data});

export const editOccurrenceSuccess = data => action(OccurrenceTypes.EDIT_OCCURRENCE_SUCCESS, {data});

export const editOccurrenceFailure = () => action(OccurrenceTypes.EDIT_OCCURRENCE_FAILURE);