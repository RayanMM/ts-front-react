import { action } from 'typesafe-actions';
import {ReportTypes} from './types';

//Form List
export const retrieveReportResultByMenuRequest = (menusubMenuId, menu, page, show, filter) => action(ReportTypes.RETRIEVE_REPORT_BY_MENU_REQUEST, {menusubMenuId, menu, page, show, filter});

export const retrieveReportResultByMenuSuccess = data => action(ReportTypes.RETRIEVE_REPORT_BY_MENU_SUCCESS, { data });

export const retrieveReportResultByMenuFailure = () => action(ReportTypes.RETRIEVE_REPORT_BY_MENU_FAILURE);