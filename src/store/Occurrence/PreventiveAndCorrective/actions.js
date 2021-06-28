import { action } from 'typesafe-actions';
import { PreventiveAndCorrectiveTypes } from './types';

export const preventive_corrective_state = (node, value) => action(PreventiveAndCorrectiveTypes.PREVENTIVE_CORRECTIVE_STATE, {node, value});

export const getPcSubjectsRequest = () => action(PreventiveAndCorrectiveTypes.GET_PC_SUBJECT_REQUEST, {});

export const getPcSubjectsSuccess = data => action(PreventiveAndCorrectiveTypes.GET_PC_SUBJECT_SUCCESS, { data });

export const getPcSubjectsFailure = () => action(PreventiveAndCorrectiveTypes.GET_PC_SUBJECT_FAILURE);

export const getPcRequest = (eventId) => action(PreventiveAndCorrectiveTypes.GET_PC_REQUEST, { eventId});

export const getPcSuccess = data => action(PreventiveAndCorrectiveTypes.GET_PC_SUCCESS, { data });

export const getPcFailure = () => action(PreventiveAndCorrectiveTypes.GET_PC_FAILURE);

export const preventiveAndCorrectiveSaveRequest = (data) => action(PreventiveAndCorrectiveTypes.PREVENTIVE_CORRECTIVE_SAVE_REQUEST, { data});

export const preventiveAndCorrectiveSaveSuccess = data => action(PreventiveAndCorrectiveTypes.PREVENTIVE_CORRECTIVE_SAVE_SUCCESS, { data });

export const preventiveAndCorrectiveSaveFailure = () => action(PreventiveAndCorrectiveTypes.PREVENTIVE_CORRECTIVE_SAVE_FAILURE);