import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button, Form, Header, Radio } from "semantic-ui-react";

import PropTypes from "prop-types";
import { handleSaveQuestionAnswer } from "../actions/users";

export class PollQuestion extends Component {
  state = {
    value: "",
  };

  static propTypes = {
    question: PropTypes.object.isRequired,
    handleSaveQuestionAnswer: PropTypes.func.isRequired,
    authUser: PropTypes.string.isRequired,
  };

  manipulateChange = (error, { value }) => this.setState({ value });

  manipulateSubmit = (error) => {
    error.preventDefault();

    switch (true) {
      case this.state.value !== "":
        this.props.handleSaveQuestionAnswer(
          this.props.authUser,
          this.props.question.id,
          this.state.value
        );
        break;
      default:
    }
  };

  render() {
    return (
      <Fragment>
        <Header as="h4">Would you rather</Header>
        <Form onSubmit={this.manipulateSubmit}>
          <Form.Field>
            <Radio
              checked={this.state.value === "optionOne"}
              label={this.props.question.optionOne.text}
              name="radioGroup"
              onChange={this.manipulateChange}
              value="optionOne"
            />
            <br />
            <Radio
              checked={this.state.value === "optionTwo"}
              label={this.props.question.optionTwo.text}
              name="radioGroup"
              onChange={this.manipulateChange}
              value="optionTwo"
            />
          </Form.Field>
          <Form.Field>
            <Button
              color="green"
              content="Submit"
              disabled={this.state.value === "" ? true : false}
              fluid
              positive
              size="tiny"
            />
          </Form.Field>
        </Form>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  return {
    authUser,
  };
};

const a = connect(
  mapStateToProps,
  { handleSaveQuestionAnswer }
)(PollQuestion);
export default a;
