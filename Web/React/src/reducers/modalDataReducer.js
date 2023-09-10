import * as actionTypes from "../actions/actionTypes";

const initialState = {
  modalTitle: "",
  modalDescription: "",
};

export const modalDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MODAL_DATA:
      return {
        ...state,
        modalTitle: action.payload.modalTitle,
        modalDescription: action.payload.modalDescription,
      };
    case actionTypes.RESET_MODAL_DATA:
      return {
        ...state,
        modalTitle: "",
        modalDescription: "",
      };
    default:
      return state;
  }
};
