import {FormTypes} from './types';

const INITIAL_STATE = {
    loading: false,
    success: false,
    error: false,
    formList: [],
    formComponents: [],
    formInfo: [],
    includedForm: -1,
    updatedFormName: "",
    includedFormItem: "",
    removedFormItem: "",
    updatedFormItemParent: "",
    retrievedJsonForm: [],
    gotTableList: [],
    gotFormGroupList: [],
    includedFormTable: "",
    associatedFormToGroup: "",
    includedOrUpdatedFormData: {},
    retrievedJsonFormByMenu: [],
    formItemProperties: [],
    updatedPropertyValue: false
  };
  
  const reducer = (state = INITIAL_STATE, action) => {
      switch (action.type) {
        case FormTypes.FORM_STATE:
            return {...state, [action.payload.node]: action.payload.value}
        case FormTypes.FORM_LIST_REQUEST:
          return {...state, loading: true};
        case FormTypes.FORM_LIST_SUCCESS: 
         return {
            ...state,
            loading: false,
            formList: action.payload.data
          }
        case FormTypes.FORM_LIST_FAILURE: 
          return {...state, loading: false}
        case FormTypes.FORM_COMPONENT_REQUEST:
            return {...state, loading: true};
        case FormTypes.FORM_COMPONENT_SUCCESS: 
            return {
                ...state,
                loading: false,
                formComponents: action.payload.data,
            }
        case FormTypes.FORM_COMPONENT_FAILURE: 
            return {...state, loading: false}
        case FormTypes.FORM_INFO_REQUEST:
            return {...state, loading: true};
        case FormTypes.FORM_INFO_SUCCESS: 
            return {
                ...state,
                loading: false,
                formInfo: action.payload.data,
            }
        case FormTypes.FORM_INFO_FAILURE: 
            return {...state, loading: false}
        case FormTypes.INCLUDE_FORM_REQUEST:
            return {...state, loading: true};
        case FormTypes.INCLUDE_FORM_SUCCESS: 
            return {
                ...state,
                loading: false,
                includedForm: action.payload.data,
            }
        case FormTypes.INCLUDE_FORM_FAILURE: 
            return {...state, loading: false}
        case FormTypes.UPDATE_FORM_NAME_REQUEST:
            return {...state, loading: true};
        case FormTypes.UPDATE_FORM_NAME_SUCCESS: 
            return {
                ...state,
                loading: false,
                updatedFormName: action.payload.data,
            }
        case FormTypes.UPDATE_FORM_NAME_FAILURE: 
            return {...state, loading: false}        
        case FormTypes.RETRIEVE_JSON_FORM_REQUEST:
            return {...state, loading: true};
        case FormTypes.RETRIEVE_JSON_FORM_SUCCESS: 
            return {
                ...state,
                loading: false,
                retrievedJsonForm: action.payload.data,
            }
        case FormTypes.RETRIEVE_JSON_FORM_FAILURE: 
            return {...state, loading: false}        
        case FormTypes.INCLUDE_FORM_ITEM_REQUEST:
            return {...state, loading: true};
        case FormTypes.INCLUDE_FORM_ITEM_SUCCESS: 
            return {
                ...state,
                loading: false,
                includedFormItem: action.payload.data,
            }
        case FormTypes.INCLUDE_FORM_ITEM_FAILURE: 
            return {...state, loading: false}     
        case FormTypes.UPDATE_FORM_ITEM_PARENT_REQUEST:
            return {...state, loading: true};
        case FormTypes.UPDATE_FORM_ITEM_PARENT_SUCCESS: 
            return {
                ...state,
                loading: false,
                updatedFormItemParent: action.payload.data,
            }
        case FormTypes.UPDATE_FORM_ITEM_PARENT_FAILURE: 
            return {...state, loading: false}    
        case FormTypes.REMOVE_FORM_ITEM_REQUEST:
            return {...state, loading: true};
        case FormTypes.REMOVE_FORM_ITEM_SUCCESS: 
            return {
                ...state,
                loading: false,
                removedFormItem: action.payload.data,
            }
        case FormTypes.REMOVE_FORM_ITEM_FAILURE: 
            return {...state, loading: false}          
        case FormTypes.TABLE_LIST_REQUEST:
            return {...state, loading: true};
        case FormTypes.TABLE_LIST_SUCCESS: 
            let items = [];

            action.payload.data.forEach(table =>{
                items.push({label: table, value: table});
            });
            
            return {
                ...state,
                loading: false,
                gotTableList: items,
            }
        case FormTypes.TABLE_LIST_FAILURE: 
            return {...state, loading: false}           
        case FormTypes.FORM_GROUP_LIST_REQUEST:
            return {...state, loading: true};
        case FormTypes.FORM_GROUP_LIST_SUCCESS: 
            return {
                ...state,
                loading: false,
                gotFormGroupList: action.payload.data,
            }
        case FormTypes.FORM_GROUP_LIST_FAILURE: 
            return {...state, loading: false}     
        case FormTypes.INCLUDE_FORM_TABLE_REQUEST:
            return {...state, loading: true};
        case FormTypes.INCLUDE_FORM_TABLE_SUCCESS: 
            return {
                ...state,
                loading: false,
                includedFormTable: action.payload.data,
            }
        case FormTypes.INCLUDE_FORM_TABLE_FAILURE: 
            return {...state, loading: false}        
        case FormTypes.ASSOCIATE_FORM_TO_GROUP_REQUEST:
            return {...state, loading: true};
        case FormTypes.ASSOCIATE_FORM_TO_GROUP_SUCCESS: 
            return {
                ...state,
                loading: false,
                associatedFormToGroup: action.payload.data,
            }
        case FormTypes.ASSOCIATE_FORM_TO_GROUP_FAILURE: 
            return {...state, loading: false}    
        case FormTypes.INCLUDE_OR_UPDATE_FORM_DATA_REQUEST:
            return {...state, loading: true};
        case FormTypes.INCLUDE_OR_UPDATE_FORM_DATA_SUCCESS: 
            return {
                ...state,
                loading: false,
                includedOrUpdatedFormData: action.payload.data,
            }
        case FormTypes.INCLUDE_OR_UPDATE_FORM_DATA_FAILURE: 
            return {...state, loading: false}    
        case FormTypes.RETRIEVE_JSON_FORM_BY_MENU_REQUEST:
            return {...state, retrievedJsonFormByMenu: [], loading: true};
        case FormTypes.RETRIEVE_JSON_FORM_BY_MENU_SUCCESS: 
            return {
                ...state,
                loading: false,
                success: true,
                error: false,
                retrievedJsonFormByMenu: action.payload.data,
            }
        case FormTypes.RETRIEVE_JSON_FORM_BY_MENU_FAILURE: 
            return {...state, success: false, error: true,loading: false}  
        case FormTypes.GET_FORMITEM_PROPERTIES_REQUEST:
            return {...state, loading: true};
        case FormTypes.GET_FORMITEM_PROPERTIES_SUCCESS: 
            return {
                ...state,
                loading: false,
                success: true,
                error: false,
                formItemProperties: action.payload.data,
            }
        case FormTypes.GET_FORMITEM_PROPERTIES_FAILURE: 
            return {...state, success: false, error: true,loading: false}  
        case FormTypes.UPDATE_PROPERTY_VALUE_REQUEST:
            return {...state, loading: true, updatedPropertyValue: false};
        case FormTypes.UPDATE_PROPERTY_VALUE_SUCCESS: 
            return {
                ...state,
                loading: false,
                success: true,
                error: false,
                updatedPropertyValue: action.payload.data,
            }
        case FormTypes.UPDATE_PROPERTY_VALUE_FAILURE: 
            return {...state, success: false, error: true,loading: false, updatedPropertyValue: false}  
        default:
          return state;
      }
  };
  
  export default reducer;