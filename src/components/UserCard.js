import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Image, Header, Segment } from "semantic-ui-react";

import PropTypes from "prop-types";

import { colors } from "../utils/helpers";
import PollTeaser from "./PollTeaser";
import PollQuestion from "./PollQuestion";
import PollResult from "./PollResult";

const pollTypes = {
  POLL_QUESTION: "POLL_QUESTION",
  POLL_TEASER: "POLL_TEASER",
  POLL_RESULT: "POLL_RESULT",
};

function PollContent(props) {
  if (props.pollType === pollTypes.POLL_TEASER) {
    return (
      <PollTeaser question={props.question} unanswered={props.unanswered} />
    );
  } else if (props.pollType === pollTypes.POLL_QUESTION) {
    return <PollQuestion question={props.question} />;
  } else if (props.pollType === pollTypes.POLL_RESULT) {
    return <PollResult question={props.question} />;
  } else {
    return;
  }
}

export class UserCard extends Component {
  static propTypes = {
    author: PropTypes.object,
    pollType: PropTypes.string,
    question: PropTypes.object,
    question_id: PropTypes.string,
    unanswered: PropTypes.bool,
  };
  render() {
    const { unanswered = null } = this.props;

    switch (this.props.badPath) {
      case true:
        return <Redirect to="/questions/bad_id" />;
      default:
    }

    const tabColor = unanswered === true ? colors.green : colors.blue;
    const borderTop =
      unanswered === null
        ? `1px solid ${colors.grey}`
        : `2px solid ${tabColor.hex}`;

    return (
      <Segment.Group>
        <Header
          as="h5"
          attached="top"
          block
          style={{ borderTop: borderTop }}
          textAlign="left"
        >
          {this.props.author.name} asks:
        </Header>

        <Grid divided padded>
          <Grid.Row>
            <Grid.Column width={4}>
              <Image src={this.props.author.avatarURL} />
            </Grid.Column>
            <Grid.Column width={10}>
              <PollContent
                pollType={this.props.pollType}
                question={this.props.question}
                unanswered={unanswered}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment.Group>
    );
  }
}
const mapStateToProps = (
  { authUser, questions, users },
  { question_id, match }
) => {
  let author,
    badPath = false,
    pollType,
    question;

  if (question_id !== undefined) {
    question = questions[question_id];
    author = users[question.author];
    pollType = pollTypes.POLL_TEASER;
  } else {
    question = questions[match.params.question_id];
    const user = users[authUser];

    switch (question) {
      case undefined:
        badPath = true;
        break;
      default:
        author = users[question.author];
        pollType = pollTypes.POLL_QUESTION;
        if (Object.keys(user.answers).includes(question.id)) {
          pollType = pollTypes.POLL_RESULT;
        }
    }
  }

  return { author, badPath, pollType, question };
};

const a = connect(mapStateToProps)(UserCard);
export default a;
