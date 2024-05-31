// 把传入的对象的 key 都转换为小写
export const transformRecordKeyNameToLowerCase = (
  record: Record<string, any>,
) => {
  return Object.keys(record).reduce((acc, key) => {
    acc[key.toLowerCase()] = record[key];
    return acc;
  }, {});
};
