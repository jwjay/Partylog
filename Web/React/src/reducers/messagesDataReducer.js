import * as actionTypes from "../actions/actionTypes";

const initialState = {
  // 연도 데이터도 받을텐데, 추후에 그걸 토대로 YearChips를 통한 정렬 기능 구현
  messages: [],
  myMessage: null,
};

export const messagesDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DELETE_MESSAGE_DATA:
      return {
        ...state,
        myMessage: null,
      };
    case actionTypes.GET_INITIAL_MESSAGES_LIST:
      return {
        ...state,
        messages: action.payload,
      };
    case actionTypes.GET_ADDITIONAL_MESSAGES_LIST:
      const additionalMessages = action.payload;
      const alreadyMessages = state.messages;

      const alreadyMessagesId = alreadyMessages.map(
        (message) => message.letter_id
      );

      const filterdAdditionalMessages = additionalMessages.filter(
        (message) => !alreadyMessagesId.includes(message.letter_id)
      );

      return {
        ...state,
        messages: [...alreadyMessages, ...filterdAdditionalMessages],
      };
    case actionTypes.ADD_MY_MESSAGE_DATA:
      return {
        ...state,
        myMessage: action.payload,
      };

    default:
      return state;
  }
};
