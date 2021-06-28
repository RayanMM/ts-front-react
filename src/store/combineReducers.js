import { combineReducers } from 'redux';
import alert from './Alert';
import auth from './Auth';
import menus from './Menu';
import forms from './Form';
import report from './Report';
import occurrence from './Occurrence/Initial';
import investigation from './Occurrence/Investigation';
import analisysOfCause from './Occurrence/AnalisysOfCause';
import preventiveAndCorrective from './Occurrence/PreventiveAndCorrective';

export default combineReducers({
   alert,
   auth,
   menus,
   forms,
   report,
   occurrence,
   investigation,
   analisysOfCause,
   preventiveAndCorrective
});
