import React from 'react';

const HomePage = () =>
    <div>
        <div>I'm the home component</div>
        <button onClick={() => console.log('test')}>Press me</button>
    </div>;


export default {
    component: HomePage
};
