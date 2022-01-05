import React, { Component } from "react";
import { connect } from "react-redux";
import { Tab } from "semantic-ui-react";

import PropTypes from "prop-types";
import UserCard from "./UserCard";
export class Home extends Component {
  static propTypes = {
    userQuestionData: PropTypes.object.isRequired,
  };
  render() {
    const { userQuestionData } = this.props;

    return <Tab panes={panes({ userQuestionData })} className="tab" />;
  }
}

const panes = (props) => {
  return [
    {
      menuItem: "Unanswered",
      render: () => (
        <Tab.Pane>
          {userQuestionData.answered.map(question => (
            <UserCard
              key={question.id}
              question_id={question.id}
              unanswered={true}
            />
          ))}
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Answered",
      render: () => (
        <Tab.Pane>
          {userQuestionData.unanswered.map(question => (
            <UserCard
              key={question.id}
              question_id={question.id}
              unanswered={false}
            />
          ))}
        </Tab.Pane>
      ),
    },
  ];
};

const mapStateToProps = ({ authUser, questions, users }) => {
  const answeredIds = Object.keys(users[authUser].answers);
  const answered = Object.values(questions)
    .filter(question => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.values(questions)
    .filter(question => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return { userQuestionData: { answered, unanswered } };
};

const a = connect(mapStateToProps)(Home);
export default a;
