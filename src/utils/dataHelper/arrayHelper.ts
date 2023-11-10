import { sumBy } from 'lodash-es';

import { hasData } from '@/utils/utils';

interface IPercentageChartReturnType<T> {
  name?: string;
  value: number;
  difference?: number;
  originData: T;
}
interface IPercentageChartDataPartialKeyMap {
  name?: string;
  perc?: string;
  Difference?: string;
}
interface IChartDataPartialKeyMap {
  name?: string;
  value?: string;
  Difference?: string;
}

interface IList2ChartDataListOptions<T> {
  nameKey?: keyof T;
  valueKey?: keyof T;
  differenceKey?: keyof T;
}
interface IList2PercentChartDataListOptions<T> {
  needOthers?: boolean;
  othersName?: string;
  nameKey?: keyof T;
  valueKey?: keyof T;
  differenceKey?: keyof T;
}

/**
 * 数组转百分比图表需要的数组
 * @param {Object[]}dataSource 数据源
 * @param {Object} options  - 可选配置
 * */
export const list2ChartDataList = <T>(
  dataSource?: T[],
  options: IList2ChartDataListOptions<T> = {},
) => {
  if (!dataSource || !hasData(dataSource)) {
    return [];
  }
  const {
    nameKey = 'name',
    valueKey = 'value',
    differenceKey = 'Difference',
  } = options;

  // @ts-ignore
  return dataSource.map((dataItem: T & IChartDataPartialKeyMap) => {
    return {
      name: dataItem[nameKey], // -> string | undefined
      value: Number(dataItem[valueKey]) || 0, // -> number
      // @ts-ignore
      [`${valueKey}Difference`]: Number(dataItem[differenceKey] || 0),
      originData: dataItem, // -> T
    } as IPercentageChartReturnType<T>;
  });
};

/**
 * 数组转百分比图表需要的数组
 * @param {Object[]}dataSource 数据源
 * @param {Object} options  - 可选配置
 * @param {boolean} options.needOthers - 是否需要计算others的百分比
 * @param {string=others} options.othersName - others展示的name的值
 * */
export const list2PercentChartDataList = <T>(
  dataSource?: T[],
  options: IList2PercentChartDataListOptions<T> = {},
) => {
  if (!dataSource || !hasData(dataSource)) {
    return [];
  }
  const {
    nameKey = 'name',
    valueKey = 'perc',
    differenceKey = 'Difference',
    needOthers = false,
    othersName = 'others',
  } = options;
  let others = 1;
  const BarChartDataList = dataSource.map(
    // @ts-ignore
    (dataItem: T & IPercentageChartDataPartialKeyMap) => {
      const modifyObject = {
        name: dataItem[nameKey], // -> string | undefined
        value: Number(dataItem[valueKey]) || 0, // -> number
        originData: dataItem, // -> T
      } as IPercentageChartReturnType<T>;
      // 计算差值
      if (modifyObject.value) {
        modifyObject.value = Number(modifyObject.value.toFixed(4));
        others -= modifyObject.value;
        let difference = Number(dataItem[differenceKey]) || 0;
        if (!difference) {
          difference = 1 - modifyObject.value;
        }
        modifyObject.difference = Number(difference.toFixed(4));
      }
      return modifyObject;
    },
  );
  // 计算剩下的百分比
  if (needOthers) {
    BarChartDataList.push({
      name: othersName,
      value: Number(others.toFixed(4)),
      difference: Number((1 - others).toFixed(4)),
      originData: {},
    } as IPercentageChartReturnType<T>);
  }
  return BarChartDataList;
};

export const list2Options = <T>(
  list?: T[],
  options?: {
    labelKey: keyof T;
    valueKey: keyof T;
  },
): any[] => {
  if (!list) {
    return [];
  }
  if (typeof list[0] === 'string' || typeof list[0] === 'number') {
    return list.map((item) => {
      return { label: String(item), value: String(item) };
    });
  }
  const { labelKey = 'label', valueKey = 'value' } = options || {};
  return list.map(
    // @ts-ignore
    (
      item: T & {
        label?: string;
        value?: string;
      },
    ) => {
      return {
        label: item[labelKey] as string,
        value: item[valueKey] as string,
        origin: item,
      };
    },
  );
};

export const list2GroupByTimeList = <T>(
  data: T[],
  startDate: number,
  endDate: number,
  groupTimeSeconds: number,
  timeStampKey = 'timeStamp',
  pushTo: 'top' | 'bottom' = 'top',
) => {
  function generateKey(
    groupBySeconds: number,
    timestamp: number,
    offset: number,
  ) {
    const keyDiff = timestamp % groupBySeconds;
    return [timestamp - keyDiff + offset, keyDiff];
  }
  function generateSlots(dateStart: number, dateEnd: number, groupBy: number) {
    const startKeyGen = generateKey(groupBy, dateStart, 0);
    const startHeadKey = startKeyGen[0];
    // const keyStep = startKeyGen[1];
    const endKeyGen = generateKey(groupBy, dateEnd, 0);
    const endTailKey = endKeyGen[0];
    let endKey = startHeadKey;
    const shift = dateStart - startHeadKey;
    const grid: { [key in number]: T[] } = {};
    while (endKey <= endTailKey) {
      grid[endKey + shift] = [];
      endKey += groupBy;
    }
    return { grid: grid, offset: shift };
  }
  const slotsAndOffsets = generateSlots(startDate, endDate, groupTimeSeconds);
  const slots = slotsAndOffsets.grid;
  const offset = slotsAndOffsets.offset;
  for (const item in data) {
    const key = generateKey(
      groupTimeSeconds,
      ((data[item] as any)[timeStampKey] as number) - offset,
      offset,
    )[0];
    if (slots[key] != undefined) {
      if (pushTo == 'top') {
        slots[key].unshift(data[item]);
      } else {
        slots[key].push(data[item]);
      }
    }
  }
  return slots;
};

export const groupByListResult2ChartListData = <T>(
  result: { [key in number]: T[] },
  dataKey = 'value',
  filterEmpty = true,
) => {
  return Object.keys(result)
    .map((timeGroupKey) => {
      const groupList = result[Number(timeGroupKey)];
      if (groupList.length === 0) {
        if (!filterEmpty) {
          return {
            label: Number(timeGroupKey),
            [dataKey]: 0,
          };
        } else {
          return null;
        }
      } else {
        const valueSum = sumBy(
          groupList,
          (item) => (item as any)[dataKey] || 0,
        );
        const revenue = sumBy(groupList, (item) => (item as any).revenue || 0);
        return {
          label: Number(timeGroupKey),
          value: valueSum || 0,
          revenue,
        };
      }
    })
    .filter((empty) => empty);
};
