import { action } from 'typesafe-actions';
import { AnalisysOfCauseTypes } from './types';

export const analisys_of_cause_state = (node, value) => action(AnalisysOfCauseTypes.ANALISYS_OF_CAUSE_STATE, {node, value});

export const getAnalisysOfCauseSubjectsRequest = () => action(AnalisysOfCauseTypes.GET_ANALISYS_SUBJECT_REQUEST, {});

export const getAnalisysOfCauseSubjectsSuccess = data => action(AnalisysOfCauseTypes.GET_ANALISYS_SUBJECT_SUCCESS, { data });

export const getAnalisysOfCauseSubjectsFailure = () => action(AnalisysOfCauseTypes.GET_ANALISYS_SUBJECT_FAILURE);

export const getAnalisysOfCauseRequest = (eventId) => action(AnalisysOfCauseTypes.GET_ANALISYS_OF_CAUSE_REQUEST, { eventId});

export const getAnalisysOfCauseSuccess = data => action(AnalisysOfCauseTypes.GET_ANALISYS_OF_CAUSE_SUCCESS, { data });

export const getAnalisysOfCauseFailure = () => action(AnalisysOfCauseTypes.GET_ANALISYS_OF_CAUSE_FAILURE);

export const analisysOfCauseSaveRequest = (data) => action(AnalisysOfCauseTypes.ANALISYS_OF_CAUSE_SAVE_REQUEST, { data});

export const analisysOfCauseSaveSuccess = data => action(AnalisysOfCauseTypes.ANALISYS_OF_CAUSE_SAVE_SUCCESS, { data });

export const analisysOfCauseSaveFailure = () => action(AnalisysOfCauseTypes.ANALISYS_OF_CAUSE_SAVE_FAILURE);