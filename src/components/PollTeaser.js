import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { Button, Header } from "semantic-ui-react";

import PropTypes from "prop-types";
import { colors } from "../utils/helpers";

export default class PollTeaser extends Component {
  state = {
    viewPoll: false,
  };

  static propTypes = {
    unanswered: PropTypes.bool.isRequired,
    question: PropTypes.object.isRequired,
  };

  manipulateClick = (error) => {
    this.setState((prevState) => ({
      viewPoll: !prevState.viewPoll,
    }));
  };
  render() {
    const contentOfButton =
      this.props.unanswered === true ? "Answer Poll" : "Results";
    const colorOfButton =
      this.props.unanswered === true ? colors.green : colors.blue;

    switch (this.state.viewPoll) {
      case true:
        return <Redirect push to={`/questions/${this.props.question.id}`} />;
      default:
    }

    return (
      <Fragment>
        <Header textAlign="left" as="h5">
          Would you rather
        </Header>
        <p style={{ textAlign: "center" }}>
          {this.props.question.optionOne.text}
          <br />
          or...
        </p>
        <Button
          content={contentOfButton}
          color={colorOfButton.name}
          fluid
          onClick={this.manipulateClick}
          size="tiny"
        />
      </Fragment>
    );
  }
}
