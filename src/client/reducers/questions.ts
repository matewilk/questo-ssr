import { FETCH_QUESTIONS } from "../actions";

export default (state:any[] = [], action: any) => {
    switch (action.type) {
        case FETCH_QUESTIONS:
            // TODO: dealt with this thing below
            return action.payload.data.data.questions.edges;
        default:
            return state;
    }
}
