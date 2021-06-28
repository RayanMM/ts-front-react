import { call, put } from 'redux-saga/effects';
import api from '../../common/api';
import { AppMessages } from '../../common/AppMessages';

import {signInRequestSuccess, signInRequestFailure} from './actions';

export function* signInRequest(action){
    try{
        const {data} = yield call(api.get, `User/signin?userName=${action.payload.data.userLogin}&password=${action.payload.data.userPassword}`);

        yield put(signInRequestSuccess(data));
    }catch(error){
        console.log(error);
        yield put(signInRequestFailure());
    }
}

export function* getUserData(){
    //System/GetUserData
   
}

export function* passwordRecovery(user){

    // return dispatch =>{
    //     axios.get(`${process.env.REACT_APP_API}System/PasswordRecovery/${user}`)
    //     .then(response => {
    //         sessionStorage.setItem("authToken",response.data.DataObject);
    //         dispatch(loginToIt(response.data.DataObject));
    //     })
    //     .catch(error => {
    //         dispatch(loginToIt("error"));
    //     });
    // }
    
}