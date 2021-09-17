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

export type Ranges = {
  n1: [number, number];
  n2: [number, number];
}

export type UserSettings = {
  a: Ranges;
  s: Ranges;
  m: Ranges;
  d: Ranges;
  pa?: number;
}

const defaultRange: [number, number] = [0, 12];
const defaultRanges: Ranges = { n1: [...defaultRange], n2: [...defaultRange] };

export const defaultSettings: UserSettings = {
  a: { ...defaultRanges },
  s: { ...defaultRanges },
  m: { ...defaultRanges },
  d: { n1: [1, 12], n2: [...defaultRange] }
};

const logAnswer = (userId: string, question: string, startTime: number, endTime: number, incorrectAnswers: object[]) => {
  const data = getQuestionResponseData(userId, question);
  localStorage.setItem(`${userId} ${question}`, JSON.stringify([
    { t: endTime, i: incorrectAnswers, e: endTime - startTime },
    ...data.slice(0, 19)
  ]));
}

const getQuestionResponseData = (userId: string, question: string) =>
  JSON.parse(localStorage.getItem(`${userId} ${question}`) || '[]');

const getReport = (userId: string, mode: Mode) => {
  const data: { [key: string]: ResponseData[] } = {};

  const ranges = getUserRanges(userId, Mode[mode]);

  const allResponseTimes: number[] = [];
  for (let i = ranges.n1[0]; i <= ranges.n1[1]; i++) {
    for (let j = ranges.n2[0]; j <= ranges.n2[1]; j++) {
      const q = formatters[mode](i, j);
      data[q] = getQuestionResponseData(userId, q);
      data[q].forEach(o => allResponseTimes.push(o.e));
    }
  }
  allResponseTimes.sort((a, b) => a - b);
  const fastest = allResponseTimes.length > 0 ? allResponseTimes[0] : 0;
  const slowest = allResponseTimes.length > 0 ? allResponseTimes[allResponseTimes.length - 1] : 0;

  const getWeightedData = (data: ResponseData[]) => {
    if (data.length === 0) {
      return [0, 0];
    }
    let weightedElapsed = 0, weightedIncorrect = 0, totalWeights = 0;
    for (let i = data.length - 1, w = 1; i >= 0; totalWeights += w, w *= 2, i--) {
      weightedElapsed += data[i].e * w;
      weightedIncorrect += (data[i].i.length > 0 ? 1 : 0) * w;
    }
    return [weightedElapsed / totalWeights, weightedIncorrect / totalWeights];
  }

  const getScore = (data: ResponseData[]) => {
    if (data.length === 0) {
      return -1;
    }
    const [weightedElapsed, weightedIncorrect] = getWeightedData(data);
    const relativeElapsed = ((weightedElapsed | fastest) - fastest) / ((slowest - fastest) | 1);
    const overallElapsed = allResponseTimes.findIndex(e => e >= weightedElapsed) / allResponseTimes.length;
    return (relativeElapsed + overallElapsed + weightedIncorrect) / 3;
  }

  const n1n2QuestionScore: [number, number, string, number][] = [];
  for (let i = ranges.n1[0]; i <= ranges.n1[1]; i++) {
    for (let j = ranges.n2[0]; j <= ranges.n2[1]; j++) {
      const q = formatters[mode](i, j);
      const score = getScore(data[q]);
      n1n2QuestionScore.push([i, j, q, score]);
    }
  }
  return n1n2QuestionScore;
}

const getUserSettings: (id: string) => UserSettings = (id: string) =>
  JSON.parse(localStorage.getItem(`${id}-settings`) || JSON.stringify(defaultSettings));

const getUserRanges: (id: string, mode: Mode) => Ranges = (id: string, mode: Mode) => {
  switch (mode) {
    case Mode.addition:
      return getUserSettings(id).a;
    case Mode.subtraction:
      return getUserSettings(id).s;
    case Mode.multiplication:
      return getUserSettings(id).m;
    case Mode.division:
      return getUserSettings(id).d;
  }
  console.error('Mode not recognized in getUserRanges');
  return { ...defaultRanges };
}

const setUserSettings = (id: string, settings: UserSettings) => {
  localStorage.setItem(`${id}-settings`, JSON.stringify(settings));
}

export const DataStoreContext = createContext<{
  logAnswer: (userId: string, question: string, startTime: number, endTime: number, incorrectAnswers: object[]) => void,
  getQuestionResponseData: (userId: string, question: string) => ResponseData[],
  getUserName: (id: string) => string,
  createNewUser: (name: string) => void,
  userList: [string, string][],
  getReport: (userId: string, mode: Mode) => [number, number, string, number][],
  getUserSettings: (id: string) => UserSettings,
  getUserRanges: (id: string, mode: Mode) => Ranges,
  setUserSettings: (id: string, settings: UserSettings) => void
}>({
  logAnswer: () => {},
  getQuestionResponseData: () => [],
  getUserName: () => '',
  createNewUser: () => {},
  userList: [],
  getReport: () => [],
  getUserSettings: () => defaultSettings,
  getUserRanges: () => ({ ...defaultRanges }),
  setUserSettings: () => {}
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
      getQuestionResponseData,
      getUserName,
      createNewUser,
      userList,
      getReport,
      getUserSettings,
      getUserRanges,
      setUserSettings
    }}>
      { props.children }
    </DataStoreContext.Provider>
  );
}

export default DataStore;
