import { call, put } from 'redux-saga/effects';
import api from '../../../common/api';
import { AppMessages } from '../../../common/AppMessages';
import {Alert} from '../../../components/Common/SweetAlert';

import * as Actions from './actions';

export function* getAnalisysOfCauseSubjectsRequest(){
    try{
        const {data} = yield call(api.get, `AnalysisCause/GetAnalysisCausesWhySubject`);

        yield put(Actions.getAnalisysOfCauseSubjectsSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.getAnalisysOfCauseSubjectsFailure());
    }
}

export function* getAnalisysOfCauseRequest(action){
    try{
        const {data} = yield call(api.get, `AnalysisCause/GetAnalisysCausesWhy?eventId=${action.payload.eventId}`);

        yield put(Actions.getAnalisysOfCauseSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.getAnalisysOfCauseFailure());
    }
}

export function* analisysOfCauseSaveRequest(action){
    try{
        const {data} = yield call(api.post, `AnalysisCause/IncludeAnalysisCausesWhy`, action.payload.data);

        yield put(Actions.analisysOfCauseSaveSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.analisysOfCauseSaveFailure());
    }
}