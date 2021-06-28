import { action } from 'typesafe-actions';
import {FormTypes} from './types';

//reset state 
export const formState = (node, value) => action(FormTypes.FORM_STATE, {node, value});

//Form List
export const formListRequest = () => action(FormTypes.FORM_LIST_REQUEST, {});

export const formListSuccess = data => action(FormTypes.FORM_LIST_SUCCESS, { data });

export const formListFailure = () => action(FormTypes.FORM_LIST_FAILURE);

//Form Components
export const formComponentRequest = () => action(FormTypes.FORM_COMPONENT_REQUEST, {});

export const formComponentSuccess = data => action(FormTypes.FORM_COMPONENT_SUCCESS, { data });

export const formComponentFailure = () => action(FormTypes.FORM_COMPONENT_FAILURE);

//Form Info
export const formInfoRequest = (formId) => action(FormTypes.FORM_INFO_REQUEST, {formId});

export const formInfoSuccess = data => action(FormTypes.FORM_INFO_SUCCESS, { data });

export const formInfoFailure = () => action(FormTypes.FORM_INFO_FAILURE);

//Include Form
export const includeFormRequest = (formName) => action(FormTypes.INCLUDE_FORM_REQUEST, {formName});

export const includeFormSuccess = data => action(FormTypes.INCLUDE_FORM_SUCCESS, { data });

export const includeFormFailure = () => action(FormTypes.INCLUDE_FORM_FAILURE);

//Update Form name
export const updateFormNameRequest = (formId, formName) => action(FormTypes.INCLUDE_FORM_REQUEST, {formId, formName});

export const updateFormNameSuccess = data => action(FormTypes.INCLUDE_FORM_SUCCESS, { data });

export const updateFormNameFailure = () => action(FormTypes.INCLUDE_FORM_FAILURE);

//Include form Item 
export const includeFormItemRequest = (formId, componentId, formItemParentId) => action(FormTypes.INCLUDE_FORM_ITEM_REQUEST, {formId, componentId, formItemParentId});

export const includeFormItemSuccess = data => action(FormTypes.INCLUDE_FORM_ITEM_SUCCESS, { data });

export const includeFormItemFailure = () => action(FormTypes.INCLUDE_FORM_ITEM_FAILURE);

//Update Form Item Parent
export const updateFormItemParentRequest = (formItemParentId, formItemId) => action(FormTypes.UPDATE_FORM_ITEM_PARENT_REQUEST, {formItemParentId, formItemId});

export const updateFormItemParentSuccess = data => action(FormTypes.UPDATE_FORM_ITEM_PARENT_SUCCESS, { data });

export const updateFormItemParentFailure = () => action(FormTypes.UPDATE_FORM_ITEM_PARENT_FAILURE);

//Remove Form Item
export const removeFormItemRequest = (formItemId) => action(FormTypes.REMOVE_FORM_ITEM_REQUEST, {formItemId});

export const removeFormItemSuccess = data => action(FormTypes.REMOVE_FORM_ITEM_SUCCESS, { data });

export const removeFormItemFailure = () => action(FormTypes.REMOVE_FORM_ITEM_FAILURE);

//Retrive JsonForm
export const retrieveJsonFormRequest = (formId) => action(FormTypes.RETRIEVE_JSON_FORM_REQUEST, {formId});

export const retrieveJsonFormSuccess = data => action(FormTypes.RETRIEVE_JSON_FORM_SUCCESS, { data });

export const retrieveJsonFormFailure = () => action(FormTypes.RETRIEVE_JSON_FORM_FAILURE);

//table List
export const tableListRequest = () => action(FormTypes.TABLE_LIST_REQUEST, {});

export const tableListSuccess = data => action(FormTypes.TABLE_LIST_SUCCESS, { data });

export const tableListFailure = () => action(FormTypes.TABLE_LIST_FAILURE);

//form group List
export const formGroupListRequest = () => action(FormTypes.FORM_GROUP_LIST_REQUEST, {});

export const formGroupListSuccess = data => action(FormTypes.FORM_GROUP_LIST_SUCCESS, { data });

export const formGroupListFailure = () => action(FormTypes.FORM_GROUP_LIST_FAILURE);

//include form table
export const includeFormTableRequest = (formId, associatedTables) => action(FormTypes.INCLUDE_FORM_TABLE_REQUEST, {formId, associatedTables});

export const includeFormTableSuccess = data => action(FormTypes.INCLUDE_FORM_TABLE_SUCCESS, { data });

export const includeFormTableFailure = () => action(FormTypes.INCLUDE_FORM_TABLE_FAILURE);

//Associate form to group
export const associateFormToGroupRequest = (formId, formGroupId) => action(FormTypes.ASSOCIATE_FORM_TO_GROUP_REQUEST, {formId, formGroupId});

export const associateFormToGroupSuccess = data => action(FormTypes.ASSOCIATE_FORM_TO_GROUP_SUCCESS, { data });

export const associateFormToGroupFailure = () => action(FormTypes.ASSOCIATE_FORM_TO_GROUP_FAILURE);

//Associate form to group
export const includeOrUpdateFormDataRequest = (json) => action(FormTypes.INCLUDE_OR_UPDATE_FORM_DATA_REQUEST, {json});

export const includeOrUpdateFormDataSuccess = data => action(FormTypes.INCLUDE_OR_UPDATE_FORM_DATA_SUCCESS, { data });

export const includeOrUpdateFormDataFailure = () => action(FormTypes.INCLUDE_OR_UPDATE_FORM_DATA_FAILURE);

//Retrieve JSON Form by menu

export const retrieveJsonFormByMenuRequest = (itemId, menu, identifier) => action(FormTypes.RETRIEVE_JSON_FORM_BY_MENU_REQUEST, {itemId, menu, identifier});

export const retrieveJsonFormByMenuSuccess = (data) => action(FormTypes.RETRIEVE_JSON_FORM_BY_MENU_SUCCESS, {data});

export const retrieveJsonFormByMenuFailure = () => action(FormTypes.RETRIEVE_JSON_FORM_BY_MENU_FAILURE);

//Get form item properties request

export const getFormItemPropertiesRequest = (formItemId) => action(FormTypes.GET_FORMITEM_PROPERTIES_REQUEST, {formItemId});

export const getFormItemPropertiesSuccess = (data) => action(FormTypes.GET_FORMITEM_PROPERTIES_SUCCESS, {data});

export const getFormItemPropertiesFailure = () => action(FormTypes.GET_FORMITEM_PROPERTIES_FAILURE);

//Update form item property value
export const updatePropertyValueRequest = (propertyId, value) => action( FormTypes.UPDATE_PROPERTY_VALUE_REQUEST, {propertyId, value});

export const updatePropertyValueSuccess = (data) => action(FormTypes.UPDATE_PROPERTY_VALUE_SUCCESS, {data});

export const updatePropertyValueFailure = () => action(FormTypes.UPDATE_PROPERTY_VALUE_FAILURE);