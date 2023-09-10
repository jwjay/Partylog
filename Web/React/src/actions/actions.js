import * as actionTypes from "./actionTypes";
// import axios from "axios";

// const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

// 로그인 관련 액션

export const loginSaveUserNo = (userNo) => ({
  type: actionTypes.LOGIN_SAVE_USERNO,
  payload: userNo,
});

export const logoutUser = () => ({
  type: actionTypes.LOGOUT,
});

export const saveUserData = (
  userNo,
  userNickname,
  userBirthday,
  userProfile
) => ({
  type: actionTypes.SAVE_USERDATA,
  payload: {
    userNo: userNo,
    userNickname: userNickname,
    userBirthday: userBirthday,
    userProfile: userProfile,
  },
});

// export const login = (code) => async (dispatch) => {
//   const res = await axios.get(
//     `http://localhost:8080/user/kakao/callback?code=${code}`
//   );
//   dispatch(loginSuccess(res.headers.authorization));
// };

// export const getUserInfo = (token) => async (dispatch) => {
//   const res = await axios.get("http://localhost:8080/user", {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   dispatch(loadUser(res.data));
// };

// 메시지 작성 관련 액션

export const setModalData = (modalTitle, modalDescription) => {
  return {
    type: actionTypes.SET_MODAL_DATA,
    payload: {
      modalTitle,
      modalDescription,
    },
  };
};

// 남긴 메시지 삭제하는 기능.. 추후에 본인 userNo를 비교해서 해당하는거 삭제하도록
export const deleteMessageData = () => {
  return {
    type: actionTypes.DELETE_MESSAGE_DATA,
  };
};

// 모달에 입력한 데이터 초기화하는 액션
export const resetModalData = () => {
  return {
    type: actionTypes.RESET_MODAL_DATA,
  };
};

// 메시지 목록 읽어오는 액션

export const getInitailMessagesList = (messagesList) => {
  return {
    type: actionTypes.GET_INITIAL_MESSAGES_LIST,
    payload: messagesList,
  };
};

export const getAdditionalMessagesList = (additionalMessagesList) => {
  return {
    type: actionTypes.GET_ADDITIONAL_MESSAGES_LIST,
    payload: additionalMessagesList,
  };
};

export const addMyMessageData = (myMessage) => {
  return {
    type: actionTypes.ADD_MY_MESSAGE_DATA,
    payload: myMessage,
  };
};
