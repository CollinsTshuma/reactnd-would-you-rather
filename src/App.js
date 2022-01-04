import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
        {this.props.authUser === null ? (
            <Route
              render={() => (
                <ContentGrid>
                  <Login />
                </ContentGrid>
              )}
            />
          ) : (
            <Fragment>
              <Nav />
              <ContentGrid>
                <Route exact path="/" component={Home} />
              </ContentGrid>
            </Fragment>
          )}
        </div>
      </Router>
    );
  }
}

const ContentGrid = ({ children }) => (
  <Grid columns={1} padded="vertically"  centered>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 485 }}>{children}</Grid.Column>
    </Grid.Row>
  </Grid>
);

const mapStateToProps = ({ authUser }) => {
  return {
    authUser
  };
}

const a = connect(
  mapStateToProps,
  { handleInceptiveData }
)(App);

export default a;
