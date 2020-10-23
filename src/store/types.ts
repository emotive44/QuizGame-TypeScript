export const SET_NICKNAME = 'SET_NICKNAME';
export const SET_NICKNAME_FAIL = 'SET_NICKNAME_FAIL';

interface SetNicknameAction { 
  type: typeof SET_NICKNAME;
  payload: string;
}

interface SetNicknameFailAction {
  type: typeof SET_NICKNAME_FAIL;
  payload: null;
}

export type GlobalActionTypes = SetNicknameAction | SetNicknameFailAction;