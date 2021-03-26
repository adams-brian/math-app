import React, { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import Users from './users';
import User from './user';

const App = () => {
  const [userList, setUserList] = useState<[string, string][]>(JSON.parse(localStorage.getItem('UserList') || '[]'));
  const [currentUser, setCurrentUser] = useState<string[]>();

  const createNewUser = (name: string) => {
    const list: [string, string][] = [...userList, [name, uuidv4()]];
    setUserList(list);
    localStorage.setItem('UserList', JSON.stringify(list));
  }

  const selectUser = (userName: string) => {
    setCurrentUser([userName, (userList.find(u => u[1] === userName) || [])[0] || 'error']);
  }

  const logAnswer = (question: string, startTime: number, endTime: number, incorrectCount: number) => {
    const key = `${currentUser![0]} ${question}`;
    const data = JSON.parse(localStorage.getItem(key) || '[]');
    localStorage.setItem(key, JSON.stringify([
      { t: endTime, i: incorrectCount, e: endTime - startTime },
      ...data.slice(0, 3)
    ]));
  }

  return (
    <div className="App">
      { currentUser ?
          <User userId={currentUser[0]} userName={currentUser[1]} logAnswer={logAnswer} /> :
          <Users selectUser={selectUser} userList={userList} createNewUser={createNewUser} />
      }
    </div>
  )
};

export default App;