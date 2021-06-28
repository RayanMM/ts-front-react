import { all, takeLatest } from 'redux-saga/effects';

//Auth
import {AuthTypes} from './Auth/types';
import {signInRequest} from './Auth/sagas';

//Menus e SubMenus
import {MenuTypes} from './Menu/types';
import {menuRequest, submenuRequest} from './Menu/sagas';


//Forms
import {FormTypes} from './Form/types';
import {formListRequest, formComponentRequest, formInfoRequest, includeFormRequest, updateFormNameRequest, retrieveJsonFormRequest, includeFormItemRequest, 
        updateFormItemParentRequest, removeFormItemRequest, tableListRequest, formGroupListRequest, includeFormTableRequest, associateFormToGroupRequest, 
        includeOrUpdateFormDataRequest, retrieveJsonFormByMenuRequest, getFormItemPropertiesRequest, updatePropertyValueRequest} from './Form/sagas';

//Report 
import {ReportTypes} from './Report/types';
import {retrieveReportResultByMenuRequest} from './Report/sagas';

//Occurrence
import {OccurrenceTypes} from './Occurrence/Initial/types';
import * as OccurrenceSagas from './Occurrence/Initial/sagas';

import {InvestigationTypes} from './Occurrence/Investigation/types';
import * as InvestigationSagas from './Occurrence/Investigation/sagas';

import {AnalisysOfCauseTypes} from './Occurrence/AnalisysOfCause/types';
import * as AnalisysOfCauseSagas from './Occurrence/AnalisysOfCause/sagas';

import {PreventiveAndCorrectiveTypes} from './Occurrence/PreventiveAndCorrective/types';
import * as PreventiveAndCorrectiveSagas from './Occurrence/PreventiveAndCorrective/sagas';

export default function* rootSaga() {
    return yield all([
        takeLatest(AuthTypes.AUTH_REQUEST, signInRequest),
        takeLatest(MenuTypes.MENU_REQUEST, menuRequest),
        takeLatest(MenuTypes.SUBMENU_REQUEST, submenuRequest),
        takeLatest(FormTypes.FORM_LIST_REQUEST, formListRequest),
        takeLatest(FormTypes.FORM_COMPONENT_REQUEST, formComponentRequest),
        takeLatest(FormTypes.FORM_INFO_REQUEST, formInfoRequest),
        takeLatest(FormTypes.INCLUDE_FORM_REQUEST, includeFormRequest),
        takeLatest(FormTypes.UPDATE_FORM_NAME_REQUEST, updateFormNameRequest),
        takeLatest(FormTypes.INCLUDE_FORM_ITEM_REQUEST, includeFormItemRequest),
        takeLatest(FormTypes.UPDATE_FORM_ITEM_PARENT_REQUEST, updateFormItemParentRequest),
        takeLatest(FormTypes.REMOVE_FORM_ITEM_REQUEST, removeFormItemRequest),
        takeLatest(FormTypes.RETRIEVE_JSON_FORM_REQUEST, retrieveJsonFormRequest),
        takeLatest(FormTypes.TABLE_LIST_REQUEST, tableListRequest),
        takeLatest(FormTypes.FORM_GROUP_LIST_REQUEST, formGroupListRequest),
        takeLatest(FormTypes.INCLUDE_FORM_TABLE_REQUEST, includeFormTableRequest),
        takeLatest(FormTypes.ASSOCIATE_FORM_TO_GROUP_REQUEST, associateFormToGroupRequest),
        takeLatest(FormTypes.INCLUDE_OR_UPDATE_FORM_DATA_REQUEST, includeOrUpdateFormDataRequest),
        takeLatest(FormTypes.RETRIEVE_JSON_FORM_BY_MENU_REQUEST, retrieveJsonFormByMenuRequest),
        takeLatest(FormTypes.GET_FORMITEM_PROPERTIES_REQUEST, getFormItemPropertiesRequest),
        takeLatest(FormTypes.UPDATE_PROPERTY_VALUE_REQUEST, updatePropertyValueRequest),
        takeLatest(ReportTypes.RETRIEVE_REPORT_BY_MENU_REQUEST, retrieveReportResultByMenuRequest),
        takeLatest(OccurrenceTypes.CLASSIFICATION_LIST_REQUEST, OccurrenceSagas.getOccurrenceClassificationListRequest),
        takeLatest(OccurrenceTypes.TYPE_LIST_REQUEST, OccurrenceSagas.getOccurrenceTypeListRequest),
        takeLatest(OccurrenceTypes.JOB_LIST_REQUEST, OccurrenceSagas.getOccurrenceJobListRequest),
        takeLatest(OccurrenceTypes.FACILITY_LIST_REQUEST, OccurrenceSagas.facilityListRequest),
        takeLatest(OccurrenceTypes.DEPARTAMENT_LIST_REQUEST, OccurrenceSagas.departamentListRequest),
        takeLatest(OccurrenceTypes.CONTRACT_TYPE_LIST_REQUEST, OccurrenceSagas.contractTypeListRequest),
        takeLatest(OccurrenceTypes.OUTSOURCED_LIST_REQUEST, OccurrenceSagas.outsourcedListRequest),
        takeLatest(OccurrenceTypes.HAPPENED_GROUP_LIST_REQUEST, OccurrenceSagas.happenedGroupListRequest),
        takeLatest(OccurrenceTypes.HAPPENED_LIST_REQUEST, OccurrenceSagas.happenedListRequest),
        takeLatest(OccurrenceTypes.INCLUDE_OCCURRENCE_REQUEST, OccurrenceSagas.includeOccurrenceRequest),
        takeLatest(OccurrenceTypes.GET_OCCURRENCE_REQUEST, OccurrenceSagas.getOccurrenceRequest),
        takeLatest(OccurrenceTypes.EDIT_OCCURRENCE_REQUEST, OccurrenceSagas.editOccurrenceRequest),
        takeLatest(InvestigationTypes.WEATHER_CONDITIONS_REQUEST, InvestigationSagas.weatherConditionRequest),
        takeLatest(InvestigationTypes.ROAD_CONDITIONS_REQUEST, InvestigationSagas.roadConditionRequest),
        takeLatest(InvestigationTypes.VAHICLE_TYPE_REQUEST, InvestigationSagas.vehicleTypeRequest),
        takeLatest(InvestigationTypes.STATE_LIST_REQUEST, InvestigationSagas.stateListRequest),
        takeLatest(InvestigationTypes.GET_INVESTIGATION_REQUEST, InvestigationSagas.getInvestigationRequest),
        takeLatest(InvestigationTypes.UPDATE_INVESTIGATION_REQUEST, InvestigationSagas.updateInvestigationRequest),
        takeLatest(InvestigationTypes.POSITION_TIME_REQUEST, InvestigationSagas.positionTimeRequest),
        takeLatest(InvestigationTypes.GET_BODY_PARTS_REQUEST, InvestigationSagas.getBodyPartsRequest),
        takeLatest(AnalisysOfCauseTypes.GET_ANALISYS_SUBJECT_REQUEST, AnalisysOfCauseSagas.getAnalisysOfCauseSubjectsRequest),
        takeLatest(AnalisysOfCauseTypes.GET_ANALISYS_OF_CAUSE_REQUEST, AnalisysOfCauseSagas.getAnalisysOfCauseRequest),
        takeLatest(AnalisysOfCauseTypes.ANALISYS_OF_CAUSE_SAVE_REQUEST, AnalisysOfCauseSagas.analisysOfCauseSaveRequest),
        takeLatest(PreventiveAndCorrectiveTypes.GET_PC_SUBJECT_REQUEST, PreventiveAndCorrectiveSagas.getPcSubjectsRequest),
        takeLatest(PreventiveAndCorrectiveTypes.GET_PC_REQUEST, PreventiveAndCorrectiveSagas.getPcRequest),
        takeLatest(PreventiveAndCorrectiveTypes.PREVENTIVE_CORRECTIVE_SAVE_REQUEST, PreventiveAndCorrectiveSagas.preventiveAndCorrectiveSaveRequest),
    ])
  }
  