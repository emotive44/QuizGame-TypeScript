import { Dispatch } from 'redux';
import { SET_NICKNAME, SET_NICKNAME_FAIL, GlobalActionTypes} from './types';

export const saveNickname = (nickname: string) => async (dispatch: Dispatch<GlobalActionTypes>) => {
  try {
    dispatch({ type: SET_NICKNAME, payload: nickname });
  } catch (error) {
    dispatch({ type: SET_NICKNAME_FAIL, payload: null });
    console.log(error);
  }
}
