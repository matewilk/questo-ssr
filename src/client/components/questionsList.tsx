import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AnyAction, Store} from "redux";

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
            return <li key={i}>{question.text}</li>
        })
    }

    render () {
        return (
            <div>
                Here is a big list of questions:
                <ul>{this.renderQuestions()}</ul>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return { questions: state.questions }
}

const loadData = (store: Store) => {
    // store is used here because there
    // is no access to connect (Provider) yet
    // as tue app is not rendered at this point
    //
    // also each component feeds the store
    // with its own data so after all the
    // components render the store is full of data
    // TODO: fix type
    return store.dispatch<any>(fetchQuestions());
};

export { loadData }

export default connect(
    mapStateToProps, { fetchQuestions }
)(QuestionsList)
