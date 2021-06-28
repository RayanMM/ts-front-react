import { action } from 'typesafe-actions';
import { AuthTypes } from './types';

export const signInRequest = (data) => action(AuthTypes.AUTH_REQUEST, {data});

export const signInRequestSuccess = data => action(AuthTypes.AUTH_SUCCESS, { data });

export const signInRequestFailure = () => action(AuthTypes.AUTH_FAILURE);

export const signOut = () => action(AuthTypes.AUTH_SIGN_OUT);