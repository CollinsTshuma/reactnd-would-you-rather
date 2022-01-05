import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Divider,
  Dimmer,
  Form,
  Grid,
  Header,
  Loader,
  Segment,
} from "semantic-ui-react";

import PropTypes from "prop-types";
import { handleSaveQuestion } from "../actions/questions";

export class NewPoll extends Component {
  state = {
    isLoading: false,
    validSubmit: false,
    option1: "",
    option2: "",
  };

  static propTypes = {
    handleSaveQuestion: PropTypes.func.isRequired,
    authUser: PropTypes.string.isRequired,
  };

  manipulateChange = (error) => {
    this.setState({ [error.target.id]: error.target.value });
  };
  manipulateSubmit = (error) => {
    error.preventDefault();

    new Promise((res, rej) => {
      this.setState({ isLoading: true });
      this.props.handleSaveQuestion(
        this.state.option1,
        this.state.option2,
        this.props.authUser
      );
      setTimeout(() => res("success"), 555);
    }).then(() => {
      this.setState({
        option1: "",
        option2: "",
      });
      this.setState({ validSubmit: true });
    });
  };
  render() {
    switch (this.state.validSubmit) {
      case true:
        return <Redirect to="/" />;
      default:
    }

    return (
      <Segment.Group>
        <Header textAlign="left" as="h3" block attached="top">
          Create a New Poll
        </Header>
        <Grid padded>
          <Grid.Column>
            {this.state.isLoading && (
              <Dimmer active inverted>
                <Loader content="Updating" />
              </Dimmer>
            )}
            <p>Complete the question:</p>
            <p>
              <strong>Would you rather...</strong>
            </p>
            <Form onSubmit={this.manipulateSubmit}>
              <Form.Input
                id="option1"
                onChange={this.manipulateChange}
                placeholder="Enter option one..."
                required
                value={this.state.option1}
              />
              <Divider horizontal>Or</Divider>
              <Form.Input
                id="option2"
                onChange={this.manipulateChange}
                placeholder="Enter option two..."
                required
                value={this.state.option2}
              />
              <Form.Button
                disabled={
                  this.state.option1 === "" || this.state.option2 === ""
                }
                fluid
                positive
                size="tiny"
              >
                Submit
              </Form.Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment.Group>
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
  { handleSaveQuestion }
)(NewPoll);

export default a;
