import React, { FunctionComponent, createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const DataStoreContext = createContext<{
  logAnswer: (userId: string, question: string, startTime: number, endTime: number, incorrectAnswers: object[]) => void,
  getUserName: (id: string) => string,
  createNewUser: (name: string) => void,
  userList: [string, string][]
}>({
  logAnswer: () => {},
  getUserName: () => '',
  createNewUser: () => {},
  userList: []
});

const logAnswer = (userId: string, question: string, startTime: number, endTime: number, incorrectAnswers: object[]) => {
  const key = `${userId} ${question}`;
  const data = JSON.parse(localStorage.getItem(key) || '[]');
  localStorage.setItem(key, JSON.stringify([
    { t: endTime, i: incorrectAnswers, e: endTime - startTime },
    ...data.slice(0, 19)
  ]));
}

const DataStore: FunctionComponent = (props) => {

  const [userList, setUserList] = useState<[string, string][]>(JSON.parse(localStorage.getItem('UserList') || '[]')); 

  const createNewUser = (name: string) => {
    const list: [string, string][] = [...userList, [name, uuidv4()]];
    setUserList(list);
    localStorage.setItem('UserList', JSON.stringify(list));
  }

  const getUserName = (id: string) => (userList.find(u => u[1] === id) || [])[0] || 'error retrieving username';

  return (
    <DataStoreContext.Provider value={{
      logAnswer,
      getUserName,
      createNewUser,
      userList
    }}>
      { props.children }
    </DataStoreContext.Provider>
  );
}

export default DataStore;
