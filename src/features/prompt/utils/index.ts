import { DEFAULT_PROMPT_VARIABLE } from '../constant';
import { IPromptVariable } from '../types';

export const generateVariableHtmlContent = (
  variable: IPromptVariable,
  space = false,
  brace = true,
) => {
  const spaceStr = space ? '&nbsp;' : '';
  const leftBraceStr = brace ? '{{' : '';
  const rightBraceStr = brace ? '}}' : '';
  return `${spaceStr}<span contenteditable="false" style="color: ${variable.color}" data-variable-name="${variable.name}">${leftBraceStr}${variable.name}${rightBraceStr}</span>${spaceStr}`;
};

export const findSuspiciousVariable = (htmlString: string) => {
  // 找到所有的 {{}} 变量并且返回 start end 和 variableName
  const result: { start: number; end: number; variable: string }[] = [];
  const leftBraceIndexArr: number[] = [];
  const rightBraceIndexArr: number[] = [];

  const text = htmlString;
  let inSpanTag = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    // 如果已经被 variable span 包裹了就跳过，直到找到下一个闭合标签为止
    if (char === '<' && text.slice(i, i + 5) === '<span') {
      inSpanTag = true;
      continue;
    }
    if (char === '<' && text.slice(i, i + 6) === '</span') {
      inSpanTag = false;
    }
    if (inSpanTag) {
      continue;
    }
    const twoChar = text.slice(i, i + 2);
    if (twoChar === '{{' && text[i + 2] !== '{') {
      leftBraceIndexArr.push(i);
      i += 1;
    }
    if (twoChar === '}}' && text[i + 2] !== '<') {
      rightBraceIndexArr.push(i + 2);
      i += 2;
    }
  }
  const minLen = Math.min(leftBraceIndexArr.length, rightBraceIndexArr.length);
  if (minLen <= 0) {
    return result;
  }
  for (let i = 0; i < minLen; i++) {
    const leftBraceIndex = leftBraceIndexArr[i];
    const rightBraceIndex = rightBraceIndexArr[i];
    if (rightBraceIndex - leftBraceIndex > 2) {
      result.push({
        variable: text.slice(leftBraceIndex, rightBraceIndex),
        start: leftBraceIndex,
        end: rightBraceIndex,
      });
    }
  }
  return result;
};

export const toVariableTag = (
  htmlString: string,
  enteredVariable: IPromptVariable[],
  space?: boolean,
) => {
  const html = htmlString;
  const htmlArr: string[] = [];
  let spliceIndex = 0;
  const suspiciousVariables = findSuspiciousVariable(html);
  if (suspiciousVariables.length <= 0) {
    return html;
  }
  for (let i = 0; i < suspiciousVariables.length; i++) {
    const susVariable = suspiciousVariables[i];
    const { start, end } = susVariable;
    htmlArr.push(html.slice(spliceIndex, start));
    htmlArr.push(html.slice(start, end));
    spliceIndex = end;
    if (i === suspiciousVariables.length - 1) {
      // last one
      htmlArr.push(html.slice(end));
    }
  }
  for (let i = 0; i < enteredVariable.length; i++) {
    const variable = enteredVariable[i];
    const needReplaceIndex: number = htmlArr.findIndex(
      (str) => str === `{{${variable.name}}}`,
    );
    if (needReplaceIndex > -1) {
      htmlArr[needReplaceIndex] = generateVariableHtmlContent(variable, space);
    }
  }

  // console.log('end toVariableTag', htmlArr);
  return htmlArr.join('');
};
export const renderTemplate = (
  template: string,
  params: any,
): {
  data: string;
  error: string;
} => {
  try {
    const data = template.replace(
      /\{\{(.+?)\}\}/g,
      (match: string, p1: string) => {
        const parts: string[] = p1.trim().split('.');
        let val: any = params;
        while (parts.length) {
          const prop: string = parts.shift()!;
          if (Object.prototype.hasOwnProperty.call(val, prop)) {
            val = val[prop];
          } else {
            val = '';
            1;
            break;
          }
        }
        return val;
      },
    );
    return {
      data,
      error: '',
    };
  } catch (e) {
    return {
      data: '',
      error: 'parse template error',
    };
  }
};

// 获取光标位置、并且判断光标位置 前两位是否等于 brace
export const getCursorBrace = (brace = '{{') => {
  const selection = window.getSelection();
  console.log('getCursorBrace selection', selection);
  const text = selection?.focusNode?.textContent;
  if (text) {
    const cursorPosition = selection?.focusOffset;
    const textBeforeCursor = text.substr(cursorPosition - 2, 2);
    return {
      node: selection?.focusNode,
      index: cursorPosition,
      isBrace: textBeforeCursor === brace,
    };
  }
  return null;
};

export const isLiveCrawling = (variables?: IPromptVariable[]) => {
  if (!variables) {
    return false;
  }
  return variables.some((variable) => variable.type === 'livecrawling');
};

// 判断是否是 系统预设变量
// 需要判断 name、type 是否相等
export const checkIsDefaultVariable = (variable: IPromptVariable) => {
  return DEFAULT_PROMPT_VARIABLE.some((item) => {
    return item.name === variable.name && item.type === variable.type;
  });
};

const variableTypeWithInputVariable: Record<string, string[]> = {
  livecrawling: ['Live Crawling Target URL'],
  websearch: ['Web Search Query'],
};
// 1. 如果 variable_types 包含了系统预设变量的类型，但是又没有该变量类型的 input variable（比如url、query），则需要添加一个
export const handleVariableTypeWithInputVariable = (
  variables: IPromptVariable[],
  variableTypes: string[],
) => {
  if (variableTypes.length > 0 && variables) {
    const withInputVariableTypes = Object.keys(variableTypeWithInputVariable);
    variableTypes.forEach((type) => {
      if (withInputVariableTypes.includes(type)) {
        const currentTypeInputVariables: IPromptVariable[] = [];
        variableTypeWithInputVariable[type].forEach((withTypeVariable) => {
          const inputVariable = DEFAULT_PROMPT_VARIABLE.find(
            (item) => item.name === withTypeVariable,
          );
          inputVariable && currentTypeInputVariables.push(inputVariable);
        });
        if (currentTypeInputVariables.length > 0) {
          const newInsertInputVariables = currentTypeInputVariables?.filter(
            (variable) => {
              return !variables?.some((item) => item.name === variable.name);
            },
          );
          if (newInsertInputVariables && newInsertInputVariables.length > 0) {
            variables = variables?.concat(newInsertInputVariables);
          }
        }
      }
    });
  }

  return variables;
};
