import React from 'react';
import './App.css';
import Users from './users';
import User from './user';
import Confetti from './confetti';
import DataStore from './dataStore';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Confetti>
        <DataStore>
          <Router>
            <Switch>
              <Route path={'/user/:userId'}>
                <User />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Redirect to="/users" />
            </Switch>
          </Router>
        </DataStore>
      </Confetti>
    </div>
  )
};

export default App;