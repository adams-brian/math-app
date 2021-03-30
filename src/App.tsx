import React, { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import Users from './users';
import User from './user';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const App = () => {
  
  const [userList, setUserList] = useState<[string, string][]>(JSON.parse(localStorage.getItem('UserList') || '[]'));

  const createNewUser = (name: string) => {
    const list: [string, string][] = [...userList, [name, uuidv4()]];
    setUserList(list);
    localStorage.setItem('UserList', JSON.stringify(list));
  }
  const getUserName = (id: string) => (userList.find(u => u[1] === id) || [])[0] || 'error retrieving username';

  const logAnswer = (userId: string, question: string, startTime: number, endTime: number, incorrectAnswers: object[]) => {
    const key = `${userId} ${question}`;
    const data = JSON.parse(localStorage.getItem(key) || '[]');
    localStorage.setItem(key, JSON.stringify([
      { t: endTime, i: incorrectAnswers, e: endTime - startTime },
      ...data.slice(0, 19)
    ]));
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={'/user/:userId'}>
            <User getUserName={getUserName} logAnswer={logAnswer} />
          </Route>
          <Route path="/users">
            <Users userList={userList} createNewUser={createNewUser} />
          </Route>
          <Redirect to="/users" />
        </Switch>
      </Router>
    </div>
  )
};

export default App;