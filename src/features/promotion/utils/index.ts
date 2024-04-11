// 固定几个日期时间点，如果当前时间超过了就使用下一个时间点
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export const getPromotionTimeWithCycle = () => {
  // 结束时间
  // return '2024-03-31 23:59:59';

  const timeCycle = [
    '2024-04-02 23:59:59',
    '2024-04-05 23:59:59',
    '2024-04-08 23:59:59',
    '2024-04-11 23:59:59',
    '2024-04-14 23:59:59',
    '2024-04-17 23:59:59',
    '2024-04-20 23:59:59',
    '2024-04-23 23:59:59',
    '2024-04-26 23:59:59',
    '2024-04-29 23:59:59',
    '2024-05-02 23:59:59',
  ];

  let targetTime = '';
  const currentTime = dayjs().utc();
  for (let i = 0; i < timeCycle.length; i++) {
    const time = dayjs(timeCycle[i]).utc();
    // 判断当前时间是否超过 time
    // diff > 0 代表 time > currentTime
    if (time.diff(currentTime) > 0) {
      targetTime = timeCycle[i];
      break;
    }
  }

  // 循环结束后都没有存在 有效的时间，则直接使用 cycle 最后一个
  if (targetTime === '') {
    return timeCycle[timeCycle.length - 1];
  }

  return targetTime;
};
