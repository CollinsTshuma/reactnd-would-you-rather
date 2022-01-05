import React, { Component } from "react";
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
    question: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    pollType: PropTypes.string.isRequired,
    unanswered: PropTypes.bool,
    question_id: PropTypes.string
  };
  render() {
    const { author, question, pollType, unanswered = null } = this.props;

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
          style={{ borderTop: borderTop  }}
          textAlign="left"
        >
          {author.name} asks:
        </Header>

        <Grid divided padded>
          <Grid.Row>
            <Grid.Column width={4}>
              <Image src={author.avatarURL} />
            </Grid.Column>
            <Grid.Column width={10}>{children}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment.Group>
    );
  }
}

function mapStateToProps(
    { users, questions, authUser },
    { match, question_id }
  ) {
    let question, pollType;
    if (question_id !== undefined) {
      question = questions[question_id];
      pollType = pollTypes.POLL_TEASER;
    } else {
      const { question_id } = match.params;
      question = questions[question_id];
      const user = users[authUser];
  
      pollType = pollTypes.POLL_QUESTION;
      if (Object.keys(user.answers).includes(question.id)) {
        pollType = pollTypes.POLL_RESULT;
      }
    }
    const author = users[question.author];
  
    return {
      question,
      author,
      pollType
    };
  }

const a = connect(mapStateToProps)(UserCard);
export default a;
