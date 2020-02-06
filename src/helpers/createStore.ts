import { createStore, applyMiddleware } from "redux";
import { Request } from 'express';
import thunk from "redux-thunk";
import axios from 'axios';

import reducers from '../client/reducers';

export default (req: Request) => {
    const axiosInstance = axios.create({
        // TODO: change to env variable
        baseURL: 'http://localhost:4000',
        headers: {
            cookie: req.get('cookie') || ''
        }
    });
    return  createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument(axiosInstance)));
}
