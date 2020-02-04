import React from 'react';
import HomePage from './pages/HomePage';
import QuestionsListPage from "./pages/QuestionsListPage";

// use react-router-config for SSA rendering
export default [
    {
        path: '/',
        ...HomePage,
        exact: true
    },
    {
        path: '/questions',
        ...QuestionsListPage,
    }
];
