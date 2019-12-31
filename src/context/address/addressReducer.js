import { 
  GET_ILCE, 
  GET_MAHALLE, 
  GET_SOKAK, 
  GET_KAPI } from '../../types';

export default (state, action) => {
  console.info('state: ', state, '-->-->-->-->-->-->-->-->-->-->', 'action: ', action);
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
        ilceSelected: action.ilceSelected,
        ilceSelectedID: action.ilceSelectedID
      };
    case GET_SOKAK:
      return {
        ...state,
        sokaklar: action.payload,
        mahalleSelected: action.mahalleSelected,
        mahalleSelectedID: action.mahalleSelectedID
      };
    case GET_KAPI: {
      return {
        ...state,
        kapilar: action.payload,
        kapilarSelected: action.kapilarSelectedID,
        sokaklarSelected: action.sokaklarSelected,
        sokaklarSelectedID: action.sokaklarSelectedID
      };
    }
    default:
      return state;
  }
};
