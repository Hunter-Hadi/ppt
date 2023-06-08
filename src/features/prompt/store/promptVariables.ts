import { atom } from 'recoil';

import { IPromptVariable } from '../types';

// add prompt template model form's variables
export const PromptVariables = atom<IPromptVariable[]>({
  key: 'PromptVariablesAtom',
  default: [],
});

export const PromptVariableColorIndex = atom<number>({
  key: 'PromptVariableColorIndexAtom',
  default: 0,
});
