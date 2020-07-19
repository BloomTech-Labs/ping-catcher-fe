import React from "react";
import { Route } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { SecureRoute, LoginCallback } from "@okta/okta-react";
import LandingPage from "./components/landingPage/page/LandingPage";
import PersistentDrawerLeft from "./AppDrawer";
import Profile from "./Profile";
import "./App.css";

function App() {
  const { authState, authService } = useOktaAuth();
  const login = async () => authService.login("/");
  const logout = async () => authService.logout("/");

  return (
    <>
      {authState.isAuthenticated ? (
        <>
          <PersistentDrawerLeft />
        </>
      ) : (
        <div>
          <LandingPage login={login} logout={logout} authState={authState} />
        </div>
      )}
      <SecureRoute path="/profile" component={Profile} />
      <Route path="/implicit/callback" component={LoginCallback} />
    </>
  );
}

export default App;
