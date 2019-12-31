import {
  GET_ILCE,
  GET_MAHALLE,
  GET_PAFTA,
  GET_ADA,
  GET_PARSEL
} from '../../types';

export default (state, action) => {
  console.info('state: ', state, '-->-->-->-->-->', 'action: ', action);
  switch (action.type) {
    case GET_ILCE:
      return {
        ...state,
        ilceler: action.payload
      };
    case GET_MAHALLE:
      return {
        ...state,
        mahalleler: action.payload,
        ilceSelected: action.ilceSelected
      };
    case GET_PAFTA: {
      return {
        ...state,
        paftalar: action.payload
      };
    }
    case GET_ADA: {
      return {
        ...state,
        paftalar: action.payload
      };
    }
    case GET_PARSEL: {
      return {
        ...state,
        parseller: action.payload
      };
    }
    default:
      return state;
  }
};
