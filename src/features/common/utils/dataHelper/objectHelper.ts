export function objectToQueryString(
  params: Record<string, string | number | string[] | undefined | null>,
) {
  // 使用 Object.entries 获取对象的键值对数组，然后对每个键值对进行处理
  // 使用 encodeURIComponent 确保键值对被正确编码以适应 URL 的格式要求
  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== null && value !== undefined) // 过滤掉 null 和 undefined
    .flatMap(([key, value]) => {
      if (Array.isArray(value)) {
        // 如果值是数组，为数组中的每个元素创建一个键值对
        return value.map(
          (item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`,
        );
      } else {
        // 如果值不是数组，直接创建键值对
        return `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`;
      }
    })
    .join('&');

  return queryString;
}
