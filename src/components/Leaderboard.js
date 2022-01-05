import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  Divider,
  Grid,
  Header,
  Image,
  Label,
  Segment,
} from "semantic-ui-react";

import PropType from "prop-types";

const trophyColor = ["grey", "orange", "yellow"];

export class Leaderboard extends Component {
  static propType = {
    leaderboardData: PropType.array.isRequired,
  };
  render() {
    return (
      <Fragment>
        {this.props.leaderboardData.map((user, idx) => (
          <Segment.Group key={user.id}>
            <Label color={trophyColor[idx]} corner="left" icon="trophy" />
            <Grid divided padded>
              <Grid.Row>
                <Grid.Column verticalAlign="middle" width={3}>
                  <Image src={user.avatarURL} />
                </Grid.Column>
                <Grid.Column width={9}>
                  <Header textAlign="left" as="h3">
                    {user.name}
                  </Header>
                  <Grid>
                    <Grid.Column width={11}>Answered questions</Grid.Column>
                    <Grid.Column width={3}>{user.answerCount}</Grid.Column>
                  </Grid>
                  <Divider />
                  <Grid>
                    <Grid.Column width={11}>Created questions</Grid.Column>
                    <Grid.Column width={3}>{user.questionCount}</Grid.Column>
                  </Grid>
                </Grid.Column>
                <Grid.Column textAlign="center" width={4} >
                  <Segment.Group>
                    <Header attached="top" as="h5" content="Score" block   />
                    <Segment>
                      <Label color="green" size="big" circular >
                        {user.questionCount + user.answerCount}
                      </Label>
                    </Segment>
                  </Segment.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment.Group>
        ))}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ users }) => {
  const leaderboardData = Object.values(users)
    .map((user) => ({
      answerCount: Object.values(user.answers).length,
      avatarURL: user.avatarURL,
      id: user.id,
      name: user.name,
      questionCount: user.questions.length,
      total: Object.values(user.answers).length + user.questions.length,
    }))
    .sort((x, y) => x.total - y.total)
    .reverse()
    .slice(0, 3);
  return {
    leaderboardData,
  };
};

const a = connect(mapStateToProps)(Leaderboard);
export default a;
