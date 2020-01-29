import { FETCH_QUESTIONS } from "../actions";

export default (state:any[] = [], action: any) => {
    switch (action.type) {
        case FETCH_QUESTIONS:
            return action.payload.data;
        default:
            return state;
    }
}
