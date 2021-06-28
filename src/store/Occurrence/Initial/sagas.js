import { call, put } from 'redux-saga/effects';
import api from '../../../common/api';
import { AppMessages } from '../../../common/AppMessages';
import {Alert} from '../../../components/Common/SweetAlert';

import * as Actions from './actions';

export function* getOccurrenceClassificationListRequest(){
    try{
        const {data} = yield call(api.get, `Occurrence/GetClassification`);

        yield put(Actions.getOccurrenceClassificationListSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.getOccurrenceClassificationListFailure());
    }
}

export function* getOccurrenceTypeListRequest(){
    try{
        const {data} = yield call(api.get, `Occurrence/GetType`);

        yield put(Actions.getOccurrenceTypeListSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.getOccurrenceTypeListFailure());
    }
}

export function* getOccurrenceJobListRequest(){
    try{
        const {data} = yield call(api.get, `Occurrence/GetJob`);

        yield put(Actions.getOccurrenceJobListSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.getOccurrenceJobListFailure());
    }
}

export function* facilityListRequest(){
    try{
        const {data} = yield call(api.get, `Occurrence/GetFacilities`);

        yield put(Actions.facilityListSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.facilityListFailure());
    }
}

export function* departamentListRequest(){
    try{
        const {data} = yield call(api.get, `Occurrence/GetDepartament`);

        yield put(Actions.departamentListSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.departamentListFailure());
    }
}

export function* contractTypeListRequest(){
    try{
        const {data} = yield call(api.get, `Occurrence/GetContractType`);

        yield put(Actions.contractTypeListSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.contractTypeListFailure());
    }
}

export function* outsourcedListRequest(){
    try{
        const {data} = yield call(api.get, `Occurrence/GetOutSourcedCompanies`);

        yield put(Actions.outsourcedListSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.outsourcedListFailure());
    }
}

export function* happenedGroupListRequest(){
    try{
        const {data} = yield call(api.get, `Occurrence/GetHappenedGroup`);

        yield put(Actions.happenedGroupListSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.happenedGroupListFailure());
    }
}

export function* happenedListRequest(action){
    try{
        const {data} = yield call(api.get, `Occurrence/GetHappened?HappenedGroupId=${action.payload.happenedGroupId}`);

        yield put(Actions.happenedListSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.happenedListFailure());
    }
}

export function* includeOccurrenceRequest(action){
    try{
        const {data} = yield call(api.post, `Occurrence/OccurrenceInclude`, action.payload.data);

        yield put(Actions.includeOccurrenceSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.includeOccurrenceFailure());
    }
}

export function* getOccurrenceRequest(action){
    try{
        const {data} = yield call(api.get, `Occurrence/GetOccurrenceEventById?eventId=${action.payload.eventId}`);

        yield put(Actions.getOccurrenceSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.getOccurrenceFailure());
    }
}

export function* editOccurrenceRequest(action){
    try{
        const {data} = yield call(api.post, `Occurrence/OccurrenceEdition`, action.payload.data);

        yield put(Actions.editOccurrenceSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.editOccurrenceFailure());
    }
}