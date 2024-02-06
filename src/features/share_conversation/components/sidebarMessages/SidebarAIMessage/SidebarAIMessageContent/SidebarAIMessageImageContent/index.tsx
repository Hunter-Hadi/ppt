import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import debounce from 'lodash-es/debounce';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';

import LazyLoadImage from '@/features/common/components/LazyLoadImage';
import { SHARE_CONVERSATION_MIN_WIDTH } from '@/features/share_conversation/constants';
import {
  IAIResponseMessage,
  IArtTextToImageMetadata,
  IChatUploadFile,
} from '@/features/share_conversation/types';
import { artTextToAspectRatio } from '@/features/share_conversation/utils/art';

interface IAIMessageImageData extends IChatUploadFile {
  meta?: IArtTextToImageMetadata;
}

type AIMessageImageRenderData = {
  imageBoxWidth: number;
  imageBoxHeight: number;
  imageBoxTop: number;
  imageBoxLeft: number;
  image: IAIMessageImageData;
};

const SidebarAIMessageImageContent: FC<{
  AIMessage: IAIResponseMessage;
}> = (props) => {
  const { AIMessage } = props;
  const boxRef = useRef<HTMLElement | null>(null);
  const [boxRect, setBoxRect] = useState([0, 0]);
  const [count, setCount] = useState(1);
  const [b, setB] = useState('1:1');
  const renderDataList = useMemo<Array<AIMessageImageRenderData>>(() => {
    try {
      const images = AIMessage.originalMessage?.metadata?.attachments || [];
      const boxWidth = boxRect[0];
      const boxHeight = boxRect[1];
      if (images.length > 0 && boxWidth && boxHeight) {
        const padding = 6;
        // 每行展示的图片数量
        let imageCountPerLine = 2;
        if (images.length >= 12) {
          imageCountPerLine = 4;
        } else if (images.length >= 9) {
          imageCountPerLine = 3;
        }
        const totalLineCount = Math.ceil(images.length / imageCountPerLine);
        // 图片总数是否超过了每行展示的图片数量
        const isNeedSplit = images.length >= imageCountPerLine;
        const totalWidthPadding = isNeedSplit
          ? (imageCountPerLine - 1) * padding * 2
          : 0;
        const totalHeightPadding = isNeedSplit
          ? (totalLineCount - 1) * padding * 2
          : 0;
        // 每个图片的容器的宽度
        const imageBoxWidth = isNeedSplit
          ? (boxWidth - totalWidthPadding) / imageCountPerLine
          : boxWidth;
        // 每个容器的高度
        const imageBoxHeight = isNeedSplit
          ? (boxHeight - totalHeightPadding) / totalLineCount
          : boxHeight;
        // 计算的边长取最小的边
        const computedWidth = Math.min(...[imageBoxWidth, imageBoxHeight]);
        // 计算每个图片距离box的位置
        // const computedLeftPerImageBox = imageBoxWidth - computedWidth
        // const computedTopPerImageBox = imageBoxHeight - computedWidth
        // 通过box的长宽和图片的长宽比，计算最终可渲染的box大小和绝对定位的位置
        return images.map((image, index: number) => {
          const aspectRatio = b || image?.meta?.aspectRatio || '1:1';
          const [aspectRatioWidth, aspectRatioHeight] = aspectRatio
            .split(':')
            .map(Number);
          // 如果是横向的图片，那么就以box的宽度为基准，否则以box的高度为基准
          const isHorizontal = aspectRatioWidth >= aspectRatioHeight;
          const ratio = aspectRatioWidth / aspectRatioHeight;
          const imageBoxWidth = isHorizontal
            ? computedWidth
            : computedWidth * ratio;
          const imageBoxHeight = isHorizontal
            ? computedWidth / ratio
            : computedWidth;
          // 根据行数和index计算top和left
          const line = Math.floor(index / imageCountPerLine);
          const lineIndex = index % imageCountPerLine;
          const imageBoxTop = line * (computedWidth + padding * 2);
          const imageBoxLeft = lineIndex * (computedWidth + padding * 2);
          return {
            imageBoxWidth,
            imageBoxHeight,
            imageBoxTop,
            imageBoxLeft,
            image,
          };
        });
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  }, [AIMessage.originalMessage?.metadata?.attachments, boxRect, count, b]);
  const debounceUpdateBoxRect = useMemo(
    () =>
      debounce(() => {
        if (boxRef.current) {
          const { width, height } = boxRef.current.getBoundingClientRect();
          setBoxRect([width, height]);
        }
      }, 50),
    [],
  );
  useEffect(() => {
    // 监听长宽的变化
    const resizeObserver = new ResizeObserver(() => {
      debounceUpdateBoxRect();
    });
    if (boxRef.current) {
      resizeObserver.observe(boxRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [boxRef]);
  // 宋老师要求第一版本最简单实现
  return (
    <Stack
      ref={boxRef}
      mt={1}
      minHeight={'16px'}
      width={'60%'}
      minWidth={SHARE_CONVERSATION_MIN_WIDTH - 16 - 16}
      sx={{
        position: 'relative',
      }}
    >
      {renderDataList.map((renderData, index) => {
        const width =
          boxRef.current?.getBoundingClientRect().width ||
          SHARE_CONVERSATION_MIN_WIDTH - 16 - 16;
        const height =
          width / artTextToAspectRatio(renderData?.image?.meta?.aspectRatio);
        return (
          <Box
            ref={boxRef}
            key={1}
            className={'maxai-ai-message__image__content__box'}
            sx={{
              position: 'relative',
              zIndex: 0,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'auto',
              height: 'auto',
              overflow: 'hidden',
              borderRadius: '4px',
              '& > img': {
                width: '100%',
                height: '100%',
                border: '2px solid rgba(0,0,0,0)',
                boxSizing: 'border-box',
                borderRadius: '8px',
                transition: 'border .1s cubic-bezier(0.22, 0.61, 0.36, 1)',
                userSelect: 'none',
                overflow: 'hidden',
              },
            }}
          >
            <LazyLoadImage
              SkeletonSx={{
                width: '100%',
              }}
              height={height}
              src={renderData.image?.uploadedUrl || ''}
              alt={`Variation 1 of ${renderDataList.length}`}
            />
          </Box>
        );
      })}
    </Stack>
  );
};
export default SidebarAIMessageImageContent;
