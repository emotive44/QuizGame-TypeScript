import { Dispatch } from 'redux';
import { 
  SET_NICKNAME, 
  SET_NICKNAME_FAIL,
  SET_CURRENT_QUESTION,
  SET_CURRENT_QUESTION_FAIL,
  SET_USER_RECORD,
  SET_USER_RECORD_FAIL,
  SET_CORRECT_ANSWER,
  SET_CORRECT_ANSWER_FAIL,
  UserRecord,
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

export const saveUserRecord = (user: UserRecord) => async (dispatch: Dispatch<GlobalActionTypes>) => {
  try {
    dispatch({ type: SET_USER_RECORD, payload: user });
  } catch (error) {
    dispatch({ type: SET_USER_RECORD_FAIL });
    console.log(error);
  }
}

export const setCorrectAns = (answer: string) => async (dispatch: Dispatch<GlobalActionTypes>) => {
  try {
    dispatch({ type: SET_CORRECT_ANSWER, payload: answer })
  } catch (error) {
    dispatch({ type: SET_CORRECT_ANSWER_FAIL });
    console.log(error);
  }
}
