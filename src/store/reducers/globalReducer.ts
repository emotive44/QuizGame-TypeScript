import { SET_NICKNAME, SET_NICKNAME_FAIL, GlobalActionTypes } from '../types';

interface GlobalState {
  nickname: string | null;
}

const initialState: GlobalState = { 
  nickname: '',
}

export default function globalReducer (state = initialState, action: GlobalActionTypes): GlobalState {
  const { type, payload } = action;

  switch (type) {
    case SET_NICKNAME:
      return {
        nickname: payload,
      }
    case SET_NICKNAME_FAIL:
      return {
        ...state,
        nickname: '',
      }
    default:
      return state;
  }
}