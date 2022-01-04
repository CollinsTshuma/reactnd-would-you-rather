import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import { handleInceptiveData } from './actions/shared';

class App extends Component {
  componentDidMount() {
    this.props.handleInceptiveData();
  }
  render() {
   return (
      <Router>
        <div className="App">
          <ContentGrid>
            <p>New Start...</p>
          </ContentGrid>
        </div>
      </Router>
    );
  }
}

const ContentGrid = ({ children }) => (
  <Grid padded="vertically" columns={1} centered>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 550 }}>{children}</Grid.Column>
    </Grid.Row>
  </Grid>
);

const a = connect(
  null,
  { handleInceptiveData }
)(App);

export default a;
