import { call, put } from 'redux-saga/effects';
import api from '../../../common/api';
import { AppMessages } from '../../../common/AppMessages';
import {Alert} from '../../../components/Common/SweetAlert';
import * as Actions from './actions';

export function* weatherConditionRequest(){
    try{
        const {data} = yield call(api.get, `Investigation/GetConditionsWeather`);

        yield put(Actions.weatherConditionSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.weatherConditionFailure());
    }
} 

export function* roadConditionRequest(){
    try{
        const {data} = yield call(api.get, `Investigation/GetConditionsRoad`);

        yield put(Actions.roadConditionSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.roadConditionFailure());
    }
} 

export function* vehicleTypeRequest(){
    try{
        const {data} = yield call(api.get, `Investigation/GetVehicleType`);

        yield put(Actions.vehicleTypeSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.vehicleTypeFailure());
    }
} 

export function* stateListRequest(){
    try{
        const {data} = yield call(api.get, `Investigation/GetRegionBrazil`);

        yield put(Actions.stateListSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.stateListFailure());
    }
} 

export function* getInvestigationRequest(action){
    try{
        const {data} = yield call(api.get, `Investigation/GetInvestigation?eventId=${action.payload.eventId}`);

        yield put(Actions.getInvestigationSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.getInvestigationFailure());
    }
} 

export function* updateInvestigationRequest(action){
    try{
        const {data} = yield call(api.post, `Investigation/InvestigationEdition`, action.payload.data);

        yield put(Actions.updateInvestigationSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.updateInvestigationFailure());
    }
}

export function* getBodyPartsRequest(){
    try{
        const {data} = yield call(api.get, `Investigation/GetBodyParts`);

        yield put(Actions.getBodyPartsSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.getBodyPartsFailure());
    }
} 

export function* positionTimeRequest(){
    try{
        const {data} = yield call(api.get, `Configuration/GetConfigParameter`);

        yield put(Actions.positionTimeSuccess(data));
    }catch(error){
        Alert({
            title: AppMessages.ERROR_GENERIC_400,
            text: error,
            type: 3
        });

        yield put(Actions.positionTimeFailure());
    }
} 