import {AlertTypes} from './types';

const INITIAL_STATE = {
    text: "",
    title: "",
    type: 0,
    show: false,
    time: 2000
  };
  
  const reducer = (state = INITIAL_STATE, action) => {
      switch (action.type) {
        case AlertTypes.FIRE_ALERT:
            return {...state, show: true, text: action.payload.text, title: action.payload.title, type: action.payload.type, time: action.payload.time};
        case AlertTypes.CLEAR_ALERT:
            return INITIAL_STATE;
        default:
          return state;
      }
  };
  
  export default reducer;