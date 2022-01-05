import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Header,
  Icon,
  Label,
  Progress,
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { styles } from "../utils/helpers";

const YourVoteMarker = () => (
  <Label className="vote" ribbon="right" color="orange">
    <Icon className="compact" name="check circle outline" size="big" />
    <div style={{ float: "right" }}>
      Your
      <br />
      Vote
    </div>
  </Label>
);

export class PollResult extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  manipulateClick = () => {
    const { history } = this.props;
    history.push("/");
  };

  render() {
    const alternativeOneVotes = this.props.question.optionOne.votes.length;
    const alternativeTwoVotes = this.props.question.optionTwo.votes.length;
    const votesAggregate = alternativeOneVotes + alternativeTwoVotes;
    const endUserVote = this.props.user.answers[this.props.question.id];

    let option1 = styles.secondary,
      option2 = styles.secondary;

    switch (true) {
      case alternativeOneVotes > alternativeTwoVotes:
        option1 = styles.primary;
        break;
      case alternativeTwoVotes > alternativeOneVotes:
        option2 = styles.primary;
        break;
      default:
    }

    return (
      <Fragment>
        <Header as="h3">
          Results:
          <Header.Subheader style={{ fontWeight: "bold" }}>
            Would you rather
          </Header.Subheader>
        </Header>
        <Segment
          style={{ backgroundColor: `${option1.bgColor}` }}
          color={option1.color}
        >
          {endUserVote === "optionOne" && <YourVoteMarker />}
          <p style={{ fontWeight: "bold" }}>
            {this.props.question.optionOne.text}
          </p>
          <Progress
            color={option1.color}
            percent={((alternativeOneVotes / votesAggregate) * 100).toFixed(2)}
            progress
          >
            {alternativeOneVotes} out of {votesAggregate} votes
          </Progress>
        </Segment>
        <Segment
          style={{ backgroundColor: `${option2.bgColor}` }}
          color={option2.color}
        >
          {endUserVote === "optionTwo" && <YourVoteMarker />}

          <p style={{ fontWeight: "bold" }}>
            {this.props.question.optionTwo.text}
          </p>
          <Progress
            color={option2.color}
            percent={((alternativeTwoVotes / votesAggregate) * 100).toFixed(2)}
            progress
          >
            {alternativeTwoVotes} out of {votesAggregate} votes
          </Progress>
        </Segment>

        <Button onClick={this.manipulateClick} size="tiny" floated="right">
          Back
        </Button>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ users, authUser }) => {
  const user = users[authUser];
  return {
    user,
  };
};

const a = withRouter(connect(mapStateToProps)(PollResult));
export default a;
