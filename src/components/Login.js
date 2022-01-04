import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";

import { setAuthUser } from "../actions/authUser";
import HeaderForLogin from "./HeaderForLogin";
import LoginGridStructure from "./LoginGridStructure";
import MarqueImage from "./MarqueImage";
import FormForLogin from "./FormForLogin";

export class Login extends Component {
  state = {
    loading: false,
  };
  manipulateLoading = () => {
    this.setState({ loading: true });
  };

  render() {
    return (
      <Fragment>
        <Segment.Group>
          <HeaderForLogin />
          <LoginGridStructure
            image={<MarqueImage />}
            form={<JoinedLoginForm onLoading={this.manipulateLoading} />}
            loading={this.state.loading}
          />
        </Segment.Group>
        <footer className="footer">
          <a href="https://www.freepik.com/free-photos-vectors/design">
            Avatar characters created by freepik - www.freepik.com
          </a>
        </footer>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users: Object.values(users),
  };
}

const JoinedLoginForm = connect(
  mapStateToProps,
  { setAuthUser }
)(FormForLogin);

export default Login;
