import React from 'react';
import { Request } from 'express';
import { Store } from 'redux';
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import Routes from '../client/Routes';

export default (req: Request, store: Store) => {
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={{}}>
                <div>{renderRoutes(Routes)}</div>
            </StaticRouter>
        </Provider>
    );

    return `
        <html>
            <head></head>
            <body>
                <div id="root">${content}</div>
                <script src="bundle.js"></script>
            </body>
        </html>
    `;
}
