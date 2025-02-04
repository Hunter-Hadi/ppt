import { franc } from 'franc';
import countBy from 'lodash-es/countBy';
import maxBy from 'lodash-es/maxBy';

const removeMarkdownImageAndLinks = (markdownText: string) => {
  try {
    const regex =
      /(?=\[(!\[.+?\]\(.+?\)|.+?)]\(((https?:\/\/|data:image)[^)]+)\))/gi;
    let match;
    const links: {
      text: string;
      link: string;
    }[] = [];
    while ((match = regex.exec(markdownText)) !== null) {
      links.push({
        text: match[1],
        link: match[2],
      });
    }
    let cleanedText = markdownText;
    //remove links
    links.forEach(({ text, link }) => {
      // 为了避免干扰，都去掉
      cleanedText = markdownText.replace(text, '');
      cleanedText = markdownText.replace(link, '');
    });
    // 不知道为什么滤不干净, 再次过滤 []()
    // 使用正则表达式匹配所有Markdown链接
    const linkWordsRegex = /\[([^\]]+)]\([^)]+\)/g;
    let linkWordsMatches;
    const linkWords: {
      fullMatch: string;
      Name: string;
    }[] = [];

    // 循环所有匹配项并将其添加到数组中
    while ((linkWordsMatches = linkWordsRegex.exec(cleanedText)) !== null) {
      // 匹配到的文本整体是 linkWordsMatches[0]
      // 捕获组内链接文本是 linkWordsMatches[1]
      linkWords.push({
        fullMatch: linkWordsMatches[0],
        Name: linkWordsMatches[1],
      });
    }

    // 遍历匹配到的链接文字
    linkWords.forEach(function (linkWord) {
      if (linkWord.Name) {
        // 替换整个匹配文本为 Name
        cleanedText = cleanedText.replace(linkWord.fullMatch, linkWord.Name);
      }
    });
    // 去掉剩下的urls
    const urlRegex = /(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-&?=%.]+/gi;
    cleanedText = cleanedText.replace(urlRegex, '');
    const chunks = cleanedText.split('\n').map((chunk) => {
      // 去掉markdown的格式, #, ##, -, *, >, `
      const regex = /^(?:\s*[-*]\s+|#+\s+|>\s+|`|\*\*.*\*\*|\[[^\]]+])/g;
      return chunk.replace(regex, '');
    });
    return chunks.join('\n');
  } catch (e) {
    return markdownText;
  }
};

/**
 * 获取文本的语言名称 只返回top20的语言
 * @param text
 * @param sliceLength
 */
export const textGetLanguageName = (
  text: string,
  sliceLength = 1000,
  returnSpecifiedLanguageList?: string[], //传入 将只能返回指定的语言列表，否则返回fallbackLanguageName
  fallbackDefaultLanguageName = 'eng', //默认返回的语言
) => {
  // 截取的内容
  let sliceOfText = '';
  // 截取的内容的isoCode
  if (text.length > sliceLength) {
    // 从中间截取0-1000个字符
    const start = Math.floor((text.length - sliceLength) / 2);
    sliceOfText = text.slice(start, start + sliceLength);
  } else {
    sliceOfText = text.slice(0, sliceLength);
  }
  sliceOfText = removeMarkdownImageAndLinks(sliceOfText);

  // 截断\n
  const isoCodes = sliceOfText
    .split(/\n|\\n/)
    .map((sliceOfTextChunk) => {
      sliceOfTextChunk = sliceOfTextChunk.trim();
      if (sliceOfTextChunk) {
        sliceOfTextChunk = sliceOfTextChunk.replace(/\s+/g, ' ');
        const isCode = franc(sliceOfTextChunk);
        return isCode;
      }
      return 'und';
    })
    .filter((isoCode) => isoCode !== 'und');
  if (isoCodes.length > 1) {
    // 找出出现次数最多的isoCode
    const isoCodeCount = countBy(isoCodes);
    // 过滤值为1的
    Object.keys(isoCodeCount).forEach((isoCode) => {
      if (isoCodeCount[isoCode] === 1) {
        delete isoCodeCount[isoCode];
      }
    });
    if (Object.keys(isoCodeCount).length > 0) {
      // 使用countBy函数计算每个值的出现次数
      const maxIsoCode = maxBy(
        Object.keys(isoCodeCount),
        (isoCode) => isoCodeCount[isoCode],
      );
      if (maxIsoCode) {
        if (returnSpecifiedLanguageList) {
          //有returnSpecifiedLanguageList 则要判断是否在其中，才返回
          if (returnSpecifiedLanguageList.includes(maxIsoCode)) {
            return maxIsoCode;
          }
          // 如果不是top20的语言, 则看看第二多的是不是top20的语言
          const secondMaxIsoCode = maxBy(
            Object.keys(isoCodeCount),
            (isoCode) => isoCodeCount[isoCode] !== isoCodeCount[maxIsoCode],
          );
          //  如果第二多的是top20的语言，并且差距第一不到2, 则使用第二多的
          if (
            secondMaxIsoCode &&
            returnSpecifiedLanguageList.includes(secondMaxIsoCode) &&
            isoCodeCount[maxIsoCode] - isoCodeCount[secondMaxIsoCode] <= 2
          ) {
            return secondMaxIsoCode;
          }
        } else {
          return maxIsoCode;
        }
      }
    }
  }
  // 如果前面没有找到, 则判断全文
  if (sliceOfText.length < 20) {
    // 字数太短的话, franc可能判断不了, 重复多几次
    sliceOfText = new Array(5).fill(sliceOfText).join(' ');
  }
  // 如果没有找到, 匹配全文
  const fullSliceOfTextIsoCode = franc(sliceOfText);
  if (fullSliceOfTextIsoCode) {
    if (returnSpecifiedLanguageList) {
      //有returnSpecifiedLanguageList 则要判断是否在其中，才返回
      if (returnSpecifiedLanguageList.includes(fullSliceOfTextIsoCode)) {
        return fullSliceOfTextIsoCode;
      }
    } else {
      return fullSliceOfTextIsoCode;
    }
  }

  return fallbackDefaultLanguageName;
};
