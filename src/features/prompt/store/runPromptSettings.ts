import { atom } from 'recoil';

import { IPromptVariable } from '@/features/prompt/types';

interface IRunPrompVariable extends IPromptVariable {
  value?: string;
}

export const RunPromptSettingsAtom = atom<{
  tone: string;
  writingStyle: string;
  language: string;
  variables: IRunPrompVariable[];
}>({
  key: 'RunPromptSettingsAtom',
  default: {
    tone: '',
    writingStyle: '',
    language: 'English',
    variables: [],
  },
});

export const RenderedTemplatePromptAtom = atom({
  key: 'RenderedTemplatePromptAtom',
  default: '',
});
