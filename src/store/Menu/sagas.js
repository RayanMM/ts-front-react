import { call, put } from 'redux-saga/effects';
import api from '../../common/api';
import { AppMessages } from '../../common/AppMessages';

import {menuRequestSuccess, menuRequestFailure, submenuRequestSuccess, submenuRequestFailure} from './actions';

export function* menuRequest(action){
    try{
        const {data} = yield call(api.get, `Menu/Menus?menuGroup=${action.payload.menuGroup}`);

        yield put(menuRequestSuccess(data));
    }catch(error){
        yield put(menuRequestFailure());
    }
}

export function* submenuRequest(action){
    try{
        const {data} = yield call(api.get, `Menu/SubMenus?menuId=${action.payload.menuId}`);

        yield put(submenuRequestSuccess(data));
    }catch(error){
        yield put(submenuRequestFailure());
    }
}