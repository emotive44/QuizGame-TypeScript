import { Dispatch } from 'redux';
import { 
  SET_NICKNAME, 
  SET_NICKNAME_FAIL,
  SET_CURRENT_QUESTION,
  SET_CURRENT_QUESTION_FAIL,
  GlobalActionTypes
} from './types';

export const saveNickname = (nickname: string) => async (dispatch: Dispatch<GlobalActionTypes>) => {
  try {
    dispatch({ type: SET_NICKNAME, payload: nickname });
  } catch (error) {
    dispatch({ type: SET_NICKNAME_FAIL });
    console.log(error);
  }
}

export const currentQuestion = (currQuest: number) => async (dispatch: Dispatch<GlobalActionTypes>) => {
  try {
    dispatch({ type: SET_CURRENT_QUESTION, payload: currQuest });
  } catch (error) {
    dispatch({ type: SET_CURRENT_QUESTION_FAIL });
    console.log(error);
  }
}