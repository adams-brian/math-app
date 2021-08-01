import React, { FunctionComponent, createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Mode, formatters } from './modes';

export type IncorrectResponseData = {
  a: number;
  e: number;
}

export type ResponseData = {
  t: number;
  i: IncorrectResponseData[];
  e: number;
}

const logAnswer = (userId: string, question: string, startTime: number, endTime: number, incorrectAnswers: object[]) => {
  const key = `${userId} ${question}`;
  const data = JSON.parse(localStorage.getItem(key) || '[]');
  localStorage.setItem(key, JSON.stringify([
    { t: endTime, i: incorrectAnswers, e: endTime - startTime },
    ...data.slice(0, 19)
  ]));
}

const getReport = (userId: string, mode: Mode) => {
  const data: { [key: string]: ResponseData[] } = {};

  const allResponseTimes: number[] = [];
  for (let i = 1; i <= 12; i++) {
    for (let j = 1; j <= 12; j++) {
      const q = formatters[mode](i, j);
      data[q] = JSON.parse(localStorage.getItem(`${userId} ${q}`) || '[]');
      data[q].forEach(o => allResponseTimes.push(o.e));
    }
  }
  allResponseTimes.sort((a, b) => a - b);
  const fastest = allResponseTimes[0];
  const slowest = allResponseTimes[allResponseTimes.length - 1];

  const getWeightedData = (data: ResponseData[]) => {
    let weightedElapsed = 0, weightedIncorrect = 0, totalWeights = 0;
    for (let i = data.length - 1, w = 1; i >= 0; totalWeights += w, w *= 2, i--) {
      weightedElapsed += data[i].e * w;
      weightedIncorrect += (data[i].i.length > 0 ? 1 : 0) * w;
    }
    return totalWeights > 0 ? [weightedElapsed / totalWeights, weightedIncorrect / totalWeights] : [0, 0];
  }

  const getScore = (data: ResponseData[]) => {
    const [weightedElapsed, weightedIncorrect] = getWeightedData(data);
    const relativeElapsed = ((weightedElapsed | fastest) - fastest) / ((slowest - fastest) | 1);
    const overallElapsed = allResponseTimes.findIndex(e => e >= weightedElapsed) / allResponseTimes.length;
    return (relativeElapsed + overallElapsed + weightedIncorrect) / 3;
  }

  const n1n2QuestionScore: [number, number, string, number][] = [];
  for (let i = 1; i <= 12; i++) {
    for (let j = 1; j <= 12; j++) {
      const q = formatters[mode](i, j);
      const score = getScore(data[q]);
      n1n2QuestionScore.push([i, j, q, score]);
    }
  }
  return n1n2QuestionScore;
}

export const DataStoreContext = createContext<{
  logAnswer: (userId: string, question: string, startTime: number, endTime: number, incorrectAnswers: object[]) => void,
  getUserName: (id: string) => string,
  createNewUser: (name: string) => void,
  userList: [string, string][],
  getReport: (userId: string, mode: Mode) => [number, number, string, number][]
}>({
  logAnswer: () => {},
  getUserName: () => '',
  createNewUser: () => {},
  userList: [],
  getReport: () => []
});

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
      userList,
      getReport
    }}>
      { props.children }
    </DataStoreContext.Provider>
  );
}

export default DataStore;
