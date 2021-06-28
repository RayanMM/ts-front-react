import {action} from 'typesafe-actions';
import {AlertTypes} from './types';

export const fire_alert = (type, title, text, time) => action(AlertTypes.FIRE_ALERT, {type, title, text, time});

export const clear_alert = () => action(AlertTypes.CLEAR_ALERT);

