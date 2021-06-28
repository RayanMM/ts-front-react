import { call, put } from 'redux-saga/effects';
import api from '../../../common/api';
import { AppMessages } from '../../../common/AppMessages';
import {Alert} from '../../../components/Common/SweetAlert';

import * as Actions from './actions';

export function* getPcSubjectsRequest(){
    try{
        const {data} = yield call(api.get, `ActionsPreventive/GetActionsPreventiveActionSubject`);

        yield put(Actions.getPcSubjectsSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.getPcSubjectsFailure());
    }
}

export function* getPcRequest(action){
    try{
        const {data} = yield call(api.get, `ActionsPreventive/GetActionsPreventiveAction?eventId=${action.payload.eventId}`);

        yield put(Actions.getPcSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.getPcFailure());
    }
}

export function* preventiveAndCorrectiveSaveRequest(action){
    try{
        const {data} = yield call(api.post, `ActionsPreventive/IncludeActionsPreventiveAction`, action.payload.data);

        yield put(Actions.preventiveAndCorrectiveSaveSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.preventiveAndCorrectiveSaveFailure());
    }
}