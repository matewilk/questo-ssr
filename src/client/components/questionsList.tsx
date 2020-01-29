import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchQuestions } from "../actions";

type QList = {
    questions: any
    fetchQuestions: any
}

class QuestionsList extends Component<QList, {}> {
    componentDidMount(): void {
        this.props.fetchQuestions();
    }

    renderQuestions() {
        return this.props.questions.map((question:any, i: number) => {
            return <li key={i}>{question}</li>
        })
    }

    render () {
        return (
            <div>
                Here is a big list of questions
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return { questions: state.questions }
}

export default connect(
    mapStateToProps, { fetchQuestions }
)(QuestionsList)
