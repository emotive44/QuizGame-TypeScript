export const SET_NICKNAME = 'SET_NICKNAME';
export const SET_NICKNAME_FAIL = 'SET_NICKNAME_FAIL';

export const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION';
export const SET_CURRENT_QUESTION_FAIL = 'SET_CURRENT_QUESTION_FAIL';

export const SET_USER_RECORD = 'SET_USER_RECORD';
export const SET_USER_RECORD_FAIL = 'SET_USER_RECORD_FAIL';

export const SET_CORRECT_ANSWER = 'SET_CORRECT_ANSWER';
export const SET_CORRECT_ANSWER_FAIL = 'SET_CORRECT_ANSWER_FAIL';

interface SetNicknameAction { 
  type: typeof SET_NICKNAME;
  payload: string;
}

interface SetNicknameFailAction {
  type: typeof SET_NICKNAME_FAIL;
  payload?: null
}

interface SetCurrentQuestionAction {
  type: typeof SET_CURRENT_QUESTION;
  payload: number;
}

interface SetCurretQuestionFailAction { 
  type: typeof SET_CURRENT_QUESTION_FAIL;
  payload?: null;
}

export interface UserRecord  { 
  nickname: string;
  winMoney: number;
}

interface SetUserRecordAction {
  type: typeof SET_USER_RECORD;
  payload: UserRecord;
}

interface SetUserRecordFailAction {
  type: typeof SET_USER_RECORD_FAIL;
  payload?: null;
}

interface SetCorrectAnswerAction { 
  type: typeof SET_CORRECT_ANSWER;
  payload: string;
}

interface SetCorrectAnswerFailAction { 
  type: typeof SET_CORRECT_ANSWER_FAIL;
  payload?: null;
}

export type GlobalActionTypes = SetNicknameAction | 
  SetNicknameFailAction | 
  SetCurrentQuestionAction | 
  SetCurretQuestionFailAction | 
  SetUserRecordAction | 
  SetUserRecordFailAction |
  SetCorrectAnswerAction |
  SetCorrectAnswerFailAction;