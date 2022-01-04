import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Image, Header, Segment } from "semantic-ui-react";

import PropTypes from "prop-types";

export class UserCard extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    color: PropTypes.string
  };
  render() {
    const { user, children, color } = this.props;

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
          style={{ borderTop: `2px solid ${color}` }}
          textAlign="left"
        >
          content={`${user.name} asks:`}
        </Header>

        <Grid divided padded>
          <Grid.Row>
            <Grid.Column width={5}>
              <Image src={user.avatarURL} />
            </Grid.Column>
            <Grid.Column width={11}>{children}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment.Group>
    );
  }
}

function mapStateToProps({ users }, props) {
    const user = users[props.userId];
  
    return {
      user
    };
  }

const a = connect(mapStateToProps)(UserCard);
export default a;
