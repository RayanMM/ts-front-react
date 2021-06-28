import { action } from 'typesafe-actions';
import { MenuTypes } from './types';

export const menuRequest = (menuGroup) => action(MenuTypes.MENU_REQUEST, {menuGroup});

export const menuRequestSuccess = data => action(MenuTypes.MENU_SUCCESS, { data });

export const menuRequestFailure = () => action(MenuTypes.MENU_FAILURE);

export const submenuRequest = (menuId) => action(MenuTypes.SUBMENU_REQUEST, {menuId});

export const submenuRequestSuccess = data => action(MenuTypes.SUBMENU_SUCCESS, { data });

export const submenuRequestFailure = () => action(MenuTypes.SUBMENU_FAILURE);