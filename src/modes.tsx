import { faPlus, faMinus, faTimes, faDivide, IconDefinition } from '@fortawesome/free-solid-svg-icons';

export enum Mode {
  none = 'none',
  addition = 'addition',
  subtraction = 'subtraction',
  multiplication = 'multiplication',
  division = 'division'
}

export enum QuestionSet {
  random = 'random',
  targeted = 'targeted'
}

export const formatters: { [key in Mode]: (n1: number, n2: number) => string } = {
  [Mode.none]: (n1, n2) => { throw new Error('formatter called on mode None') },
  [Mode.addition]: (n1, n2) => `${n1} + ${n2}`,
  [Mode.subtraction]: (n1, n2) => `${n1 + n2} - ${n1}`,
  [Mode.multiplication]: (n1, n2) => `${n1} x ${n2}`,
  [Mode.division]: (n1, n2) => `${n1 * n2} ÷ ${n1}`
};

export const checkers: { [key in Mode]: (n1: number, n2: number, a: number) => boolean } = {
  [Mode.none]: (n1, n2) => { throw new Error('check answer called on mode None') },
  [Mode.addition]: (n1, n2, a) => n1 + n2 === a,
  [Mode.subtraction]: (n1, n2, a) => n2 === a,
  [Mode.multiplication]: (n1, n2, a) => n1 * n2 === a,
  [Mode.division]: (n1, n2, a) => n2 === a
};

export const getIcon: (mode: Mode) => IconDefinition = mode => {
  switch (mode) {
    case Mode.addition:
      return faPlus;
    case Mode.subtraction:
      return faMinus;
    case Mode.multiplication:
      return faTimes;
    case Mode.division:
      return faDivide;
  }
  return faPlus;
}

export const getBg: (mode: Mode) => string = mode => {
  switch (mode) {
    case Mode.addition:
      return 'bg-addition-100';
    case Mode.subtraction:
      return 'bg-subtraction-100';
    case Mode.multiplication:
      return 'bg-multiplication-100';
    case Mode.division:
      return 'bg-division-100';
  }
  return 'bg-addition-100';
}

export const getBtn: (mode: Mode) => string = mode => {
  switch (mode) {
    case Mode.addition:
      return 'btn-addition';
    case Mode.subtraction:
      return 'btn-subtraction';
    case Mode.multiplication:
      return 'btn-multiplication';
    case Mode.division:
      return 'btn-division';
  }
  return 'btn-addition';
}
