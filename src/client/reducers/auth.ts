import { FETCH_CURRENT_USER } from "../actions";

export default function (state: any = null, action: any) {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      // TODO: deal with this thing below
      return action.payload.data.data.user || false;
    default:
      return state;
  }
}
