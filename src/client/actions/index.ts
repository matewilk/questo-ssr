import axios from 'axios';
import {Action, AnyAction, Dispatch} from "redux";

export const FETCH_QUESTIONS = 'fetch_questions';
export const fetchQuestions = () => async (dispatch:Dispatch): Promise<void> => {
    const res = await axios.post(
        'http://localhost:4000',
        {
            query: `
                query ($cursor: String, $limit: Int) {
                    questions (cursor: $cursor, limit: $limit) {
                        edges {
                            ID
                            RecordType
                            text
                            popularity
                            category
                            date
                        }
                        pageInfo {
                            cursor
                            count
                        }
                    }
                }
            `
        }
    );

    dispatch({
        type: FETCH_QUESTIONS,
        payload: res
    })
};
