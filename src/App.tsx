import React, { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import Users from './users';
import User from './user';

const App = () => {
  const [userList, setUserList] = useState<[string, string][]>(JSON.parse(localStorage.getItem('UserList') || '[]'));
  const [currentUser, setCurrentUser] = useState<string>();

  const createNewUser = (name: string) => {
    const list: [string, string][] = [...userList, [name, uuidv4()]];
    setUserList(list);
    localStorage.setItem('UserList', JSON.stringify(list));
  }

  return (
    <div className="App">
      { currentUser ?
          <User userId={currentUser} userName={(userList.find(u => u[1] === currentUser) || [])[0] || 'error'} /> :
          <Users setCurrentUser={setCurrentUser} userList={userList} createNewUser={createNewUser} />
      }
    </div>
  )
};

export default App;