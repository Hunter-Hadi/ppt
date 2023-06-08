import { Box, Skeleton, SxProps } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { ResponsiveContainer } from 'recharts';

const VideoPlayer: FC<{
  sx?: SxProps;
  src: string;
  poster?: string;
  width?: string;
  height?: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: () => void;
  onLoadedMetadata?: () => void;
  onLoadedData?: () => void;
  onWaiting?: () => void;
  onCanPlay?: () => void;
  onCanPlayThrough?: () => void;
  onSeeking?: () => void;
  onSeeked?: () => void;
  onStalled?: () => void;
  onSuspend?: () => void;
  onAbort?: () => void;
  onError?: () => void;
  onEmptied?: () => void;
  onDurationChange?: () => void;
  onRateChange?: () => void;
  onVolumeChange?: () => void;
}> = (props) => {
  const {
    sx,
    src,
    poster,
    width = '100%',
    height = '100%',
    controls = false,
    autoPlay = false,
    loop = false,
    muted = false,
    playsInline = true,
    preload = 'auto',
    onPlay,
    onPause,
    onEnded,
    onTimeUpdate,
    onLoadedMetadata,
    onLoadedData,
    onWaiting,
    onCanPlay,
    onCanPlayThrough,
    onSeeking,
    onSeeked,
    onStalled,
    onSuspend,
    onAbort,
    onError,
    onEmptied,
    onDurationChange,
    onRateChange,
    onVolumeChange,
  } = props;

  const [loading, setLoading] = useState(true);

  const onLoadedDataHandler = useCallback(() => {
    setLoading(false);
    onLoadedData && onLoadedData();
  }, [onLoadedData]);

  return (
    <Box
      sx={{
        width,
        height,
        overflow: 'hidden',
        position: 'relative',
        mx: 'auto',
        ...sx,
      }}
    >
      {loading && (
        <Skeleton
          variant='rounded'
          width={'100%'}
          height={'100%'}
          sx={{
            position: 'absolute',
          }}
        />
      )}
      <ResponsiveContainer width={width} height={height}>
        <video
          src={src}
          poster={poster}
          width={width}
          height={height}
          controls={controls}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload={preload}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onLoadedData={onLoadedDataHandler}
          onWaiting={onWaiting}
          onCanPlay={onCanPlay}
          onCanPlayThrough={onCanPlayThrough}
          onSeeking={onSeeking}
          onSeeked={onSeeked}
          onStalled={onStalled}
          onSuspend={onSuspend}
          onAbort={onAbort}
          onError={onError}
          onEmptied={onEmptied}
          onDurationChange={onDurationChange}
          onRateChange={onRateChange}
          onVolumeChange={onVolumeChange}
        />
      </ResponsiveContainer>
    </Box>
  );
};
export default VideoPlayer;
