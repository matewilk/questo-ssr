import { FETCH_CURRENT_USER, LOG_IN_USER, LOG_OUT_USER } from "../actions";

export default function (state: any = null, action: any) {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      // TODO: deal with this thing below
      return action.payload.data.data.currentUser || false;
    case LOG_IN_USER:
      return action.payload.data.data.login || false;
    case LOG_OUT_USER:
      return !action.payload.data.data.logout.success;
    default:
      return state;
  }
}
