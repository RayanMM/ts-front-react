import {MenuTypes} from './types';

const INITIAL_STATE = {
    loading: false,
    menus: [],
    subMenus: []
  };
  
  const reducer = (state = INITIAL_STATE, action) => {
      switch (action.type) {
        case MenuTypes.MENU_REQUEST:
          return {...state, loading: true};
        case MenuTypes.MENU_SUCCESS: 
         return {
            ...state,
            loading: false,
            menus: action.payload.data,
          }
        case MenuTypes.MENU_FAILURE: 
          return {...state, loading: false}
        case MenuTypes.SUBMENU_REQUEST:
            return {...state, loading: true};
        case MenuTypes.SUBMENU_SUCCESS: 
            return {
                ...state,
                loading: false,
                subMenus: action.payload.data,
            }
        case MenuTypes.SUBMENU_FAILURE: 
            return {...state, loading: false}
        default:
          return state;
      }
  };
  
  export default reducer;