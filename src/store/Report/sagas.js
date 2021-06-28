import { call, put } from 'redux-saga/effects';
import api from '../../common/api';
import { AppMessages } from '../../common/AppMessages';

import { retrieveReportResultByMenuSuccess, retrieveReportResultByMenuFailure } from './actions';
import { version } from 'react';

export function* retrieveReportResultByMenuRequest(action){
    try{
        const {data} = yield call(api.post, `Report/ReportByMenu?menuSubMenuId=${action.payload.menusubMenuId}&menu=${action.payload.menu}&page=${action.payload.page}&show=${action.payload.show}`, {filter: action.payload.filter});

        yield put(retrieveReportResultByMenuSuccess(data));
    }catch(error){
        yield put(retrieveReportResultByMenuFailure());
    }
}