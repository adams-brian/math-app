import React from 'react';
import Users from './users';
import User from './user';
import Confetti from './confetti';
import DataStore from './dataStore';
import {
  HashRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import '@fontsource/fredoka-one';

const App = () => {
  return (
    <div className="font-primary text-gray-900 container mx-auto p-4 md:p-6 lg:p-8">
      <Confetti>
        <DataStore>
          <HashRouter>
            <Switch>
              <Route path={'/user/:userId'}>
                <User />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Redirect to="/users" />
            </Switch>
          </HashRouter>
        </DataStore>
      </Confetti>
    </div>
  )
};

export default App;