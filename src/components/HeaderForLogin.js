import React from "react";
import { Header } from "semantic-ui-react";

const HeaderForLogin = () => (
  <Header block attached="top" as="h4" textAlign="center">
    <Header.Content>Welcome to the Would You Rather App!</Header.Content>
    <Header.Subheader>Please sign in to continue</Header.Subheader>
  </Header>
);

export default HeaderForLogin;
