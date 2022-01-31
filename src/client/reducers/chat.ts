import { UPDATE_CHAT } from "../actions";

export default (messages: any[] = [], action: any) => {
  switch (action.type) {
    case UPDATE_CHAT:
      return [...messages, action.message];
    default:
      return messages;
  }
};
