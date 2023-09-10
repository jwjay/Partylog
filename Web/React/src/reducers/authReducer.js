import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  token: null,
  userData: null,
  userNo: null,
};

// 로그인 관련 리듀서
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SAVE_USERNO:
      return {
        ...state,
        isAuthenticated: true,
        userNo: action.payload,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        userData: null,
        userNo: null,
      };
    case actionTypes.SAVE_USERDATA:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};
