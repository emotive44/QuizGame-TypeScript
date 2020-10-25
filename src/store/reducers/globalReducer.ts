import { 
  SET_NICKNAME, 
  SET_NICKNAME_FAIL, 
  SET_CURRENT_QUESTION, 
  SET_CURRENT_QUESTION_FAIL , 
  GlobalActionTypes 
} from '../types';

interface GlobalState {
  nickname: string | null;
  currQuest: number | null;
}

const initialState: GlobalState = { 
  nickname: '',
  currQuest: 0,
}

export default function globalReducer (state = initialState, action: GlobalActionTypes): GlobalState {
  const { type, payload } = action;

  switch (type) {
    case SET_NICKNAME:
      return {
        ...state,
        nickname: typeof payload === 'string' ? payload : '',
      }
    case SET_NICKNAME_FAIL:
      return {
        ...state,
        nickname: '',
      }
    case SET_CURRENT_QUESTION:
      return {
        ...state,
        currQuest: typeof payload === 'number' ? payload : 0,
      }
    case SET_CURRENT_QUESTION_FAIL:
      return {
        ...state,
        currQuest: state.currQuest
      }
    default:
      return state;
  }
}