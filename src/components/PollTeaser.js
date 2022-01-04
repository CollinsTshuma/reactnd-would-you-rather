import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { Button, Header } from "semantic-ui-react";

import PropTypes from "prop-types";

export default class PollTeaser extends Component {
  state = {
    viewPoll: false,
  };

  static propTypes = {
    question: PropTypes.object.isRequired,
    unanswered: PropTypes.bool.isRequired,
    color: PropTypes.string
  };

  manipulateClick = (error) => {
    this.setState((prevState) => ({
      viewPoll: !prevState.viewPoll,
    }));
  };
  render() {
    const { question, unanswered, color } = this.props;

    if (this.state.viewPoll === true) {
      return <Redirect push to={`/questions/${question.id}`} />;
    }
    return (
      <Fragment>
        <Header as="h5" textAlign="left">
          Would you rather
        </Header>
        <p style={{ textAlign: 'center' }}>
          {question.optionOne.text}
          <br />
          or...
        </p>
        <Button
          color={color}
          size="tiny"
          fluid
          onClick={this.handleClick}
          content={unanswered === true ? 'Answer Poll' : 'Results'}
        />
      </Fragment>
    );
  }
}
