export const SET_NICKNAME = 'SET_NICKNAME';
export const SET_NICKNAME_FAIL = 'SET_NICKNAME_FAIL';

export const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION';
export const SET_CURRENT_QUESTION_FAIL = 'SET_CURRENT_QUESTION_FAIL'

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

export type GlobalActionTypes = SetNicknameAction | SetNicknameFailAction | SetCurrentQuestionAction | SetCurretQuestionFailAction;