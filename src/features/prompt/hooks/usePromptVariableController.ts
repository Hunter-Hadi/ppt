import { unionBy } from 'lodash-es';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import {
  DEFAULT_TEMPLATE_RESERVED_VARIABLE,
  PROMPT_COLORS,
} from '@/features/prompt/constant';
import {
  PromptVariableColorIndex,
  PromptVariables,
} from '@/features/prompt/store/promptVariables';
import { IPromptVariable } from '@/features/prompt/types';

const usePromptVariableController = () => {
  const [variables, setVariables] = useRecoilState(PromptVariables);
  const [colorIndex, setColorIndex] = useRecoilState(PromptVariableColorIndex);

  const initReservedVariable = useCallback(() => {
    batchAddVariable([], true);
    // const reservedVariable = DEFAULT_TEMPLATE_RESERVED_VARIABLE;
    // for (let i = 0; i < reservedVariable.length; i++) {
    //   const isExist = variables.some(
    //     (variable) => variable.name === reservedVariable[i].name,
    //   );
    //   if (!isExist) {
    //     addVariable(reservedVariable[i]);
    //   }
    // }
  }, []);

  const batchGenerateVariable = useCallback(
    (data: IPromptVariable[], colorIndex: number) => {
      let currentColorIndex = colorIndex;
      const newVariables = data.map((item) => {
        const newVariable: IPromptVariable = {
          hint: item.hint,
          name: item.name,
          type: item.type,
          color: PROMPT_COLORS[currentColorIndex],
        };
        currentColorIndex =
          currentColorIndex + 1 > PROMPT_COLORS.length - 1
            ? 0
            : currentColorIndex + 1;
        return newVariable;
      });

      return {
        newVariables,
        currentColorIndex,
      };
    },
    [],
  );

  const batchAddVariable = useCallback(
    // cover: 是否覆盖更新
    (data: IPromptVariable[], cover = false) => {
      // 虽然是覆盖更新 但是需要保留原有预设变量
      const coverData = unionBy(
        cover ? [...DEFAULT_TEMPLATE_RESERVED_VARIABLE, ...data] : data,
        'name',
      );

      const { currentColorIndex, newVariables } = batchGenerateVariable(
        coverData,
        cover ? 0 : colorIndex,
      );
      setVariables((preVariables) =>
        cover ? newVariables : [...preVariables, ...newVariables],
      );
      setColorIndex(currentColorIndex);
      return newVariables;
    },
    [colorIndex],
  );

  const addVariable = useCallback(
    (data: IPromptVariable) => {
      const [newVariable] = batchAddVariable([data]);
      return newVariable;
    },
    [batchAddVariable],
  );

  return {
    variables,
    reservedVariable: variables,
    initReservedVariable,
    addVariable,
    batchAddVariable,
    batchGenerateVariable,
  };
};

export default usePromptVariableController;
