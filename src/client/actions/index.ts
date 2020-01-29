import axios from 'axios';
import { Dispatch } from "redux";

export const FETCH_QUESTIONS = 'fetch_questions';
export const fetchQuestions = () => async (dispatch:Dispatch) => {
    const res = await axios.post();

    dispatch({
        type: FETCH_QUESTIONS,
        payload: res
    })
};
