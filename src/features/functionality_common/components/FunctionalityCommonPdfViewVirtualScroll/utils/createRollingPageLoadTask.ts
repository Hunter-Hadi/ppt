export const createRollingPageLoadTask = (
  dataList,
  startIndex,
  stopIndex,
  onStatus: (index: number, isActive: boolean) => void,
  onData: (index: number) => void,
) => {
  const task = {
    isCancelled: false,
    async start() {
      // 先加载给定的区间
      if (startIndex === 0) {
        for (let i = startIndex; i <= stopIndex && !this.isCancelled; i++) {
          await this.loadPage(i);
        }
      } else {
        const middleIndex = Math.floor((startIndex + stopIndex) / 2);
        let offset = 0;

        while (
          (middleIndex - offset >= startIndex ||
            middleIndex + offset <= stopIndex) &&
          !this.isCancelled
        ) {
          if (middleIndex - offset >= startIndex) {
            await this.loadPage(middleIndex - offset);
          }
          if (middleIndex + offset <= stopIndex) {
            await this.loadPage(middleIndex + offset);
          }
          offset++;
        }
      }
    },
    cancel() {
      this.isCancelled = true;
    },
    async loadPage(index) {
      if (!dataList[index] && !this.isCancelled) {
        onStatus(index, true);
        try {
          if (!this.isCancelled) {
            await onData(index);
          }
        } catch (error) {
          console.error(`Error loading page ${index}:`, error);
        } finally {
          onStatus(index, false);
        }
      }
    },
  };
  return task;
};
