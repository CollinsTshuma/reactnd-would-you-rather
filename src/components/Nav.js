import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Image,
  Menu,
  Responsive,
} from "semantic-ui-react";

import { setAuthUser } from "../actions/authUser";

class Nav extends Component {
  manipulateLogout = (error) => {
    error.preventDefault();
    this.props.setAuthUser(null);
  };

  render() {
    return (
      <Container>
        <Responsive minWidth={641}  pointing as={Menu} secondary>
          <Menu.Item as={NavLink} name="home" to="/" exact />
          <Menu.Item as={NavLink} name="new poll" to="/add" />
          <Menu.Item as={NavLink} name="leader board" to="/leaderboard" />
          <Menu.Menu position="right">
            <Menu.Item>
              <span>
                <Image
                  avatar
                  spaced="right"
                  src={this.props.users[this.props.authUser].avatarURL}
                  verticalAlign="bottom"
                />
                {this.props.users[this.props.authUser].name}
              </span>
            </Menu.Item>
            <Menu.Item>
              <Button
                basic
                compact
                content="Logout"
                icon="log out"
                labelPosition="right"
                onClick={this.manipulateLogout}
                size="mini"
              />
            </Menu.Item>
          </Menu.Menu>
        </Responsive>
        <Responsive minWidth={360} maxWidth={660} as={Fragment}>
          <Grid padded="vertically" columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Image
                  avatar
                  spaced="right"
                  src={this.props.users[this.props.authUser].avatarURL}
                  verticalAlign="bottom"
                />
                {this.props.users[this.props.authUser].name}
              </Grid.Column>
              <Grid.Column textAlign="right" verticalAlign="bottom">
                <Button
                  basic
                  compact
                  content="Logout"
                  icon="log out"
                  labelPosition="right"
                  onClick={this.manipulateLogout}
                  size="mini"
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <Menu pointing secondary widths={3}>
                  <Menu.Item as={NavLink} name="home" to="/" exact />
                  <Menu.Item as={NavLink} name="new poll" to="/add" />
                  <Menu.Item
                    as={NavLink}
                    name="leader board"
                    to="/leaderboard"
                  />
                </Menu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
        <Responsive maxWidth={365} as={Fragment}>
          <Grid columns={1} padded="vertically">
            <Grid.Row>
              <Grid.Column>
                <Image
                  avatar
                  spaced="right"
                  src={this.props.users[this.props.authUser].avatarURL}
                  verticalAlign="bottom"
                />
                {this.props.users[this.props.authUser].name}
                <Button
                  basic
                  compact
                  content="Logout"
                  floated="right"
                  icon="log out"
                  labelPosition="right"
                  onClick={this.manipulateLogout}
                  size="mini"
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Menu pointing secondary widths={3}>
                  <Menu.Item as={NavLink} name="home" to="/" exact />
                  <Menu.Item as={NavLink} name="new poll" to="/add" />
                  <Menu.Item
                    as={NavLink}
                    name="leader board"
                    to="/leaderboard"
                  />
                </Menu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
      </Container>
    );
  }
}

const mapStateToProps = ({ users, authUser }) => {
  return {
    authUser,
    users,
  };
};

const a = connect(
  mapStateToProps,
  { setAuthUser }
)(Nav);
export default a;
