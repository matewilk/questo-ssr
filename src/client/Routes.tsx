import React from 'react';
import Home from './components/Home';
import QuestionsList, { loadData } from "./components/questionsList";

// use react-router-config for SSA rendering
export default [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        loadData,
        path: '/questions',
        component: QuestionsList,
    }
];
