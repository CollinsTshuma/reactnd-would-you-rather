import React from "react";
import { Dimmer, Grid, Loader } from "semantic-ui-react";

const LoginGridStructure = ({ form, image, loading }) => (
  <div>
    <Grid padded textAlign="center">
      <Grid.Row className="login">
        <Grid.Column width={15}>
          {loading === true && (
            <Dimmer active inverted>
              <Loader inverted content="Loading" />
            </Dimmer>
          )}
          {image}
          <br />
          {form}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

export default LoginGridStructure;
