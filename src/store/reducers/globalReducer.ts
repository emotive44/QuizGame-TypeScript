import { 
  SET_NICKNAME, 
  SET_NICKNAME_FAIL, 
  SET_CURRENT_QUESTION, 
  SET_CURRENT_QUESTION_FAIL,
  SET_USER_RECORD,
  SET_USER_RECORD_FAIL, 
  UserRecord,
  GlobalActionTypes 
} from '../types';

interface GlobalState {
  nickname: string | null;
  currQuest: number | null;
  users: UserRecord[];
}

const initialState: GlobalState = { 
  nickname: '',
  currQuest: 0,
  users: [],
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
    case SET_USER_RECORD: {
      let user = payload as UserRecord;
      return {
        ...state,
        users: [
          ...state.users,
          user
        ],
      }
    }
    case SET_USER_RECORD_FAIL:
      return {
        ...state,
        users: state.users
      }
    default:
      return state;
  }
}