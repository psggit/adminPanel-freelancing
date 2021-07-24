/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Header from "Components/Header";
import { Router } from "react-router";
import { Route } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import Login from "Container/Login";
import Company from "Container/Company";
import Survey from "Container/Survey";
import CompanyDetails from "Container/CompanyDetails";
import { theme } from "./Theme";

const history = createHistory();

function App() {
  const [currentRoute, setCurrentRoute] = React.useState(
    window.location.pathname.split("/")[1] || "/"
  );

  const isLoggedIn = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).isLoggedIn
    : null;

  useEffect(() => {
    history.listen((location) => {
      const newRoute =
        location.pathname.split("/")[1].trim().length > 0
          ? location.pathname.split("/")[1]
          : "/";

      console.log("new route", newRoute);
      setCurrentRoute(newRoute);
    });
    if (!isLoggedIn) history.push("/login");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <div style={{ display: "flex" }}>
          {isLoggedIn && (
            <Header currentRoute={currentRoute} history={history} />
          )}
          <div>{currentRoute}</div>
          {!isLoggedIn && (
            <Route
              exact
              path="/login"
              render={() => <Login history={history} />}
            />
          )}
          <div>
            {isLoggedIn && (
              <React.Fragment>
                <Route
                  exact
                  path="/survey"
                  render={() => (
                    <Survey history={history} title={currentRoute} />
                  )}
                />
                <Route
                  exact
                  path="/company"
                  render={() => (
                    <Company history={history} title={currentRoute} />
                  )}
                />
                <Route
                  exact
                  path="/company/:id"
                  render={(props) => (
                    <CompanyDetails
                      history={history}
                      title={currentRoute}
                      {...props}
                    />
                  )}
                />
              </React.Fragment>
            )}
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
