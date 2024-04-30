import { Box, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';

import FunctionalitySignPdfCommonButtonPopover from '../FunctionalitySignPdfButtonPopover/FunctionalitySignPdfCommonButtonPopover';
interface IFunctionalitySignPdfShowPdfDateFormatsPopoverProps {
  value: string;
  onHandleValue: (value: string) => void;
}
const formatList = [
  'MM/DD/YYYY',
  'DD/MM/YYYY',
  'MM.DD.YYYY',
  'DD.MM.YYYY',
  'YYYY-MM-DD',
  // 在这里添加其他可能的格式
];
const FunctionalitySignPdfShowPdfDateFormatsPopover: FC<
  IFunctionalitySignPdfShowPdfDateFormatsPopoverProps
> = ({ value, onHandleValue }) => {
  const [currentFormat, setCurrentFormat] = useState<string>(formatList[0]);
  const inferDateFormat = (dateString: string) => {
    for (const format of formatList) {
      const parsedDate = dayjs(dateString, format);
      if (parsedDate.isValid()) {
        return format;
      }
    }

    return null; // 如果无法确定格式，则返回null
  };
  useEffect(() => {
    const formats = inferDateFormat(value);
    if (formats) {
      setCurrentFormat(formats);
    }
  }, [value]);
  const handleSelect = (format: string) => {
    const isDateValid = dayjs(value).isValid();
    if (isDateValid) {
      //如果用户发生输入改变，导致不是的话默认重置为当天
      const formattedDate = dayjs(value, currentFormat).format(format);
      onHandleValue(formattedDate);
    } else {
      onHandleValue(dayjs().format(format));
    }

    setCurrentFormat(format);
  };
  return (
    <FunctionalitySignPdfCommonButtonPopover
      buttonProps={{
        variant: 'text',
      }}
      popoverView={
        <Box>
          {formatList.map((format) => (
            <Box key={format}>
              <Button
                sx={{
                  width: '100%',
                }}
                onClick={() => handleSelect(format)}
              >
                <Typography
                  color='primary.main'
                  sx={{
                    fontSize: {
                      lg: 16,
                    },
                  }}
                >
                  {format}
                </Typography>
              </Button>
            </Box>
          ))}
        </Box>
      }
    >
      <Typography
        sx={{
          fontSize: {
            lg: 16,
          },
        }}
      >
        {currentFormat}
      </Typography>
    </FunctionalitySignPdfCommonButtonPopover>
  );
};
export default FunctionalitySignPdfShowPdfDateFormatsPopover;
