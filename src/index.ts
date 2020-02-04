import express, { Request, Response } from 'express';
import { matchRoutes } from 'react-router-config';

import Routes from './client/Routes';
import createStore from "./helpers/createStore";
import renderer from './helpers/renderer';

const app = express();

app.use(express.static('public'));
app.get('*', (req: Request, res: Response) => {
    const store = createStore();

    // iterate through routes and search for loadData function
    // inside a component (look into each component for the function)
    // to load data on the server side
    const promises = matchRoutes(Routes, req.path).map(({ route }) => {
        // pass store to loadData to be able to use action creators
        // within the components where actions are imported
        return route.loadData ? route.loadData(store) : null;
    });

    // wait for all loadData promises to resolve
    // and render the app
    Promise.all(promises).then(() =>
        // at this point store is full of data
        // from all the components that call
        // loadData function so we render it
        // straight from the backend
        res.send(renderer(req, store))
    )
});

app.listen(3000, () => console.log('listening on port 3000'));
