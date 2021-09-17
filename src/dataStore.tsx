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

export type ModeSettings = {
  m: number,
  n1: [number, number];
  n2: [number, number];
}

export type UserSettings = {
  a: ModeSettings;
  s: ModeSettings;
  m: ModeSettings;
  d: ModeSettings;
  pa?: number;
}

const defaultRange: [number, number] = [0, 12];
const defaultModeSettings: ModeSettings = { m: 0, n1: [...defaultRange], n2: [...defaultRange] };

export const defaultSettings: UserSettings = {
  a: { ...defaultModeSettings },
  s: { ...defaultModeSettings },
  m: { ...defaultModeSettings },
  d: { m: 0, n1: [1, 12], n2: [...defaultRange] }
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

  const modeSettings = getUserModeSettings(userId, Mode[mode]);

  const allResponseTimes: number[] = [];
  for (let i = modeSettings.n1[0]; i <= modeSettings.n1[1]; i++) {
    for (let j = modeSettings.n2[0]; j <= modeSettings.n2[1]; j++) {
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
  for (let i = modeSettings.n1[0]; i <= modeSettings.n1[1]; i++) {
    for (let j = modeSettings.n2[0]; j <= modeSettings.n2[1]; j++) {
      const q = formatters[mode](i, j);
      const score = getScore(data[q]);
      n1n2QuestionScore.push([i, j, q, score]);
    }
  }
  return n1n2QuestionScore;
}

const getUserSettings: (id: string) => UserSettings = (id: string) =>
  JSON.parse(localStorage.getItem(`${id}-settings`) || JSON.stringify(defaultSettings));

const getUserModeSettings: (id: string, mode: Mode) => ModeSettings = (id: string, mode: Mode) => {
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
  console.error('Mode not recognized in getUserModeSettings');
  return { ...defaultModeSettings };
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
  getUserModeSettings: (id: string, mode: Mode) => ModeSettings,
  setUserSettings: (id: string, settings: UserSettings) => void
}>({
  logAnswer: () => {},
  getQuestionResponseData: () => [],
  getUserName: () => '',
  createNewUser: () => {},
  userList: [],
  getReport: () => [],
  getUserSettings: () => defaultSettings,
  getUserModeSettings: () => ({ ...defaultModeSettings }),
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
      getUserModeSettings,
      setUserSettings
    }}>
      { props.children }
    </DataStoreContext.Provider>
  );
}

export default DataStore;
