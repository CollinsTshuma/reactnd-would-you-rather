import React, { Component } from "react";
import { Form, Header } from "semantic-ui-react";

import PropTypes from "prop-types";

class FormForLogin extends Component {
  state = {
    value: "",
  };

  static propTypes = {
    onLoading: PropTypes.func.isRequired,
  };

  onSwitch = (error, { value }) => {
    this.setState({ value });
  };
  manipulateSubmit = (error) => {
    error.preventDefault();

    new Promise((res, rej) => {
      this.props.onLoading();
      setTimeout(() => res(), 455);
    }).then(() => this.props.setAuthUser(this.state.value));
  };
  createDropdownData = () => {
    return this.props.users.map((user) => ({
      image: { avatar: true, src: user.avatarURL },
      key: user.id,
      text: user.name,
      value: user.id,
    }));
  };
  render() {
    return (
      <Form onSubmit={this.manipulateSubmit}>
        <Header color="green" as="h2">
          Sign In
        </Header>
        <Form.Dropdown
          fluid
          onChange={this.onSwitch}
          options={this.createDropdownData()}
          placeholder="Select a Friend"
          required
          selection
          scrolling
          value={this.state.value}
        />
        <Form.Button
          content="Login"
          disabled={this.state.value === "" ? true : false}
          fluid
          positive
        />
      </Form>
    );
  }
}

export default FormForLogin;
