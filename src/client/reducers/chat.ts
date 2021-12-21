import { UPDATE_CHAT } from "../actions";

export default (state: any[] = [], action: any) => {
  switch (action.type) {
    case UPDATE_CHAT:
      return [...state, action.data];
    default:
      return state;
  }
};
