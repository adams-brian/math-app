export enum Mode {
  none = 'none',
  addition = 'addition',
  subtraction = 'subtraction',
  multiplication = 'multiplication',
  division = 'division'
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
