import React, { Component } from "react";
import { connect } from "react-redux";
import { Store } from "redux";

import { fetchQuestions, Questions } from "../features/questions";

type QList = {
  questions: any;
  fetchQuestions: any;
};

class QuestionsListPage extends Component<QList, {}> {
  componentDidMount(): void {
    // although this data is fetched on the server side
    // and passed to the store; this request stays here
    // as the user may navigate in single page app from
    // a different route where this data wouldn't be fed
    // from the server
    this.props.fetchQuestions();
  }

  renderQuestions() {
    return this.props.questions.edges.map((question: any, i: number) => {
      return <li key={i}>{question.text}</li>;
    });
  }

  render() {
    const center = {
      display: "grid",
      justifyItems: "center",
    };

    return (
      <div style={center}>
        Here is a big list of questions:
        <ul>{this.renderQuestions()}</ul>
      </div>
    );
  }
}

function mapStateToProps({
  questions,
}: {
  questions: { questions: Questions };
}) {
  return { questions: questions.questions };
}

const loadData = (store: Store) => {
  // store is used here because there
  // is no access to connect (Provider) yet
  // as the app is not rendered at this point
  //
  // also each component feeds the store
  // with its own data so after all the
  // components render the store is full of data
  // TODO: fix type
  return store.dispatch<any>(fetchQuestions());
};

export default {
  loadData,
  component: connect(mapStateToProps, { fetchQuestions })(QuestionsListPage),
};
