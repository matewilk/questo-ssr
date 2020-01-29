import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import QuestionsList from "./components/questionsList";

export default () => {
    return (
        <div>
            <Route exact path="/" component={Home} />
            <Route path="/questions" component={QuestionsList} />
        </div>
    )
}
