import { call, put } from 'redux-saga/effects';
import api from '../../common/api';
import { AppMessages } from '../../common/AppMessages';

import {formListSuccess, formListFailure, formComponentSuccess, formComponentFailure, formInfoSuccess, formInfoFailure, includeFormSuccess, includeFormFailure,
        updateFormNameSuccess, updateFormNameFailure, retrieveJsonFormSuccess, retrieveJsonFormFailure, includeFormItemSuccess, includeFormItemFailure, 
        updateFormItemParentSuccess, updateFormItemParentFailure, removeFormItemSuccess, removeFormItemFailure, tableListSuccess, tableListFailure, 
        formGroupListSuccess, formGroupListFailure, includeFormTableSuccess, includeFormTableFailure, associateFormToGroupSuccess, associateFormToGroupFailure,
        includeOrUpdateFormDataSuccess, includeOrUpdateFormDataFailure, retrieveJsonFormByMenuSuccess, retrieveJsonFormByMenuFailure, getFormItemPropertiesSuccess,
        getFormItemPropertiesFailure, updatePropertyValueSuccess, updatePropertyValueFailure} from './actions';

export function* formListRequest(){
    try{
        const {data} = yield call(api.get, `Form/FormList`);

        yield put(formListSuccess(data));
    }catch(error){
        yield put(formListFailure());
    }
}

export function* formComponentRequest(){
    try{
        const {data} = yield call(api.get, `Form/FormComponents`);

        yield put(formComponentSuccess(data));
    }catch(error){
        yield put(formComponentFailure());
    }
}

export function* formInfoRequest(action){
    try{
        const {data} = yield call(api.get, `Form/GetFormInfo?formId=${action.payload.formId}`);

        yield put(formInfoSuccess(data));
    }catch(error){
        yield put(formInfoFailure());
    }
}

export function* includeFormRequest(action){
    try{
        const {data} = yield call(api.post, `Form/IncludeNewForm?formName=${action.payload.formName}`);

        yield put(includeFormSuccess(data));
    }catch(error){
        yield put(includeFormFailure());
    }
}

export function* updateFormNameRequest(action){
    try{
        const {data} = yield call(api.post, `Form/UpdateFormName?formId=${action.payload.formId}&formName=${action.payload.formName}`);

        yield put(updateFormNameSuccess(data));
    }catch(error){
        yield put(updateFormNameFailure());
    }
}

export function* includeFormItemRequest(action){
    try{
        const {data} = yield call(api.post, `Form/IncludeFormItem?formId=${action.payload.formId}&componentId=${action.payload.componentId}&formItemParentId=${action.payload.formItemParentId}`);

        yield put(includeFormItemSuccess(data));
    }catch(error){
        yield put(includeFormItemFailure());
    }
}

export function* updateFormItemParentRequest(action){
    try{
        const {data} = yield call(api.post, `Form/UpdateFormItemParent?formItemParentId=${action.payload.formItemParentId}&formItemId=${action.payload.formItemId}`);

        yield put(updateFormItemParentSuccess(data));
    }catch(error){
        yield put(updateFormItemParentFailure());
    }
}

export function* removeFormItemRequest(action){
    try{
        const {data} = yield call(api.post, `Form/RemoveFormItem?formItemId=${action.payload.formItemId}`);

        yield put(removeFormItemSuccess(data));
    }catch(error){
        yield put(removeFormItemFailure());
    }
}

export function* retrieveJsonFormRequest(action){
    try{
        const {data} = yield call(api.get, `Form/RetrieveJsonForm?formId=${action.payload.formId}`);

        yield put(retrieveJsonFormSuccess(data));
    }catch(error){
        yield put(retrieveJsonFormFailure());
    }
}

export function* tableListRequest(){
    try{
        const {data} = yield call(api.get, `Form/TableList`);

        yield put(tableListSuccess(data));
    }catch(error){
        yield put(tableListFailure());
    }
}

export function* formGroupListRequest(){
    try{
        const {data} = yield call(api.get, `Form/FormGroupList`);

        yield put(formGroupListSuccess(data));
    }catch(error){
        yield put(formGroupListFailure());
    }
}

export function* includeFormTableRequest(action){
    try{
        let formId = action.payload.formId;
        let associatedTables = action.payload.associatedTables;

        let json = {
            formId: formId,
            associatedTables
        };

        const {data} = yield call(api.post, `Form/IncludeFormTable`, json);

        yield put(includeFormTableSuccess(data));
    }catch(error){
        yield put(includeFormTableFailure());
    }
}

export function* associateFormToGroupRequest(action){
    try{
        const {data} = yield call(api.post, `Form/AssociateFormToGroup?formId=${action.payload.formId}&formGroupId=${action.payload.formGroupId}`);

        yield put(associateFormToGroupSuccess(data));
    }catch(error){
        yield put(associateFormToGroupFailure());
    }
}

export function* includeOrUpdateFormDataRequest(action){
    try{
        const {data} = yield call(api.post, `Form/IncludeOrUpdateFormData`, action.payload.json);

        yield put(includeOrUpdateFormDataSuccess(data));
    }catch(error){
        yield put(includeOrUpdateFormDataFailure());
    }
}

export function* retrieveJsonFormByMenuRequest(action){
    try{
        const {data} = yield call(api.get, `Form/RetrieveJsonFormByMenu?menuSubMenuId=${action.payload.itemId}&menu=${action.payload.menu}&identifier=${action.payload.identifier}`);

        yield put(retrieveJsonFormByMenuSuccess(data));
    }catch(error){
        yield put(retrieveJsonFormByMenuFailure());
    }
}

export function* getFormItemPropertiesRequest(action){
    try{
        const {data} = yield call(api.get, `Form/ComponentsProperties?formItemId=${action.payload.formItemId}`);

        yield put(getFormItemPropertiesSuccess(data));
    }catch(error){
        yield put(getFormItemPropertiesFailure());
    }
}

export function* updatePropertyValueRequest(action){
    try{
        const {data} = yield call(api.post, `Form/UpdatePropertyValue?formItemPropertyId=${action.payload.propertyId}&value=${action.payload.value}`);

        yield put(updatePropertyValueSuccess(data));
    }catch(error){
        yield put(updatePropertyValueFailure());
    }
}


