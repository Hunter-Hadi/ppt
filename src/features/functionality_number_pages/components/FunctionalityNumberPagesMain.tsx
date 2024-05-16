import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import { useState } from 'react';

import FunctionalityCommonUploadButton from '@/features/functionality_common/components/FunctionalityCommonUploadButton';
import { downloadUrl } from '@/features/functionality_common/utils/functionalityCommonDownload';
import { functionalityCommonFileNameRemoveAndAddExtension } from '@/features/functionality_common/utils/functionalityCommonIndex';
type IPositionValue =
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'top'
  | 'topLeft'
  | 'topRight';
const FunctionalityNumberPagesMain = () => {
  const [positionValue, setPositionValue] = useState<IPositionValue>('bottom');
  const [marginsValue, setMarginsValue] = useState<number>(35);
  const [startNumberValue, setStartNumberValue] = useState(1234567890);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const onUploadFile = async (fileList: FileList) => {
    if (fileList.length) {
      setFile(fileList[0]);
    }
  };
  const circleGridView = (
    activeType: string = 'top',
    viewSize: number = 150,
    onChange: (viewPosition: IPositionValue) => void,
  ) => {
    const viewPositionsList: IPositionValue[][] = [
      ['topLeft', 'top', 'topRight'],
      ['bottomLeft', 'bottom', 'bottomRight'],
    ];
    const borderColor = '#d1d1d1';
    return (
      <Stack
        direction='column'
        justifyContent='space-between'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          border: `1px solid ${borderColor}`,
          backgroundColor: '#f9f9f9',
          height: viewSize,
          width: viewSize,
        }}
      >
        {viewPositionsList.map((viewPositions, index) => (
          <Stack
            direction='row'
            justifyContent='space-between'
            key={index}
            sx={{
              height: '33%',
              borderBottom: index === 0 ? `1px solid ${borderColor}` : '',
              borderTop: index === 1 ? `1px solid ${borderColor}` : '',
            }}
          >
            {viewPositions.map((viewPosition, index) => (
              <Box
                onClick={() => onChange(viewPosition)}
                key={index}
                sx={{
                  cursor: 'pointer',
                  width: '33%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRight: index !== 2 ? `1px solid ${borderColor}` : '',
                  backgroundColor: '#fff',
                }}
              >
                <Stack
                  direction='column'
                  alignItems='center'
                  justifyContent='center'
                  sx={{
                    width: '40%',
                    height: '40%',
                    borderRadius: '50%',
                    border:
                      viewPosition === activeType
                        ? '2px solid #9065B0'
                        : '1px solid gray',
                  }}
                >
                  <Box
                    sx={{
                      width: 'calc(100% - 3px)',
                      height: 'calc(100% - 3px)',
                      borderRadius: '50%',
                      bgcolor:
                        viewPosition === activeType ? 'primary.main' : '',
                    }}
                  />
                </Stack>
              </Box>
            ))}
          </Stack>
        ))}
      </Stack>
    );
  };
  const onAddPagesNumberAndDownload = async () => {
    // 开发Test默认bottom
    if (!file) return;
    try {
      setIsLoading(true);

      const buff = await file.arrayBuffer(); // Uint8Array
      const pdfDocument = await PDFDocument.load(buff); //加载pdf文件
      for (var index = 0; index < pdfDocument.getPages().length; index++) {
        const page = pdfDocument.getPage(index);
        const { width, height } = page.getSize();
        const fontSize = 13;
        // const fontSizePadding = 2;
        const textWidth = startNumberValue.toString().length * (fontSize / 2); //大概的计算文本的宽度
        let x = 50,
          y = 0;
        switch (positionValue) {
          case 'bottom':
            //位于底部的中心位置
            x = width / 2 - textWidth / 2; //中心位置-文字宽度的一半
            y = marginsValue;
            break;
          case 'bottomLeft':
            //位于底部的中心位置
            x = marginsValue;
            y = marginsValue;
            break;
          case 'bottomRight':
            //位于底部的中心位置
            x = width - marginsValue - textWidth; //宽度-边距-文字宽度
            y = marginsValue;
            break;
          case 'top':
            //位于底部的中心位置
            x = width / 2 - textWidth / 3; //中心位置-文字宽度的一半
            y = height - fontSize - marginsValue; //高度-字体大小-边距
            break;
          case 'topLeft':
            //位于底部的中心位置
            x = marginsValue;
            y = height - marginsValue; //高度-边距
            break;
          case 'topRight':
            //位于底部的中心位置
            x = width - marginsValue - textWidth; //宽度-边距-文字宽度
            y = height - marginsValue; //高度-边距
            break;
        }
        page.drawText((startNumberValue + index).toString(), {
          x: x,
          y: y,
          size: fontSize,
        });
      }
      const blobData = await pdfDocument.save();
      const fileName = functionalityCommonFileNameRemoveAndAddExtension(
        file.name,
      );
      downloadUrl(blobData, fileName);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log('onAddPagesNumberAndDownload error :', error);
    }
  };
  return (
    <Stack
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {!file && (
        <FunctionalityCommonUploadButton
          inputProps={{
            accept: 'application/pdf',
            multiple: true,
          }}
          onChange={onUploadFile}
        />
      )}
      {file && (
        <Box sx={{ width: '100%' }}>
          <Grid container justifyContent='center' gap={1}>
            <Grid item>
              <Typography variant='custom' fontSize={16}>
                Position
              </Typography>
              {circleGridView(positionValue, 130, (value) => {
                setPositionValue(value);
              })}
            </Grid>
            <Grid
              item
              sx={{
                flex: 1,
              }}
              lg={4}
              display='flex'
              direction='column'
              justifyContent='space-between'
            >
              <Box sx={{ width: '100%' }}>
                <Typography variant='custom' fontSize={16}>
                  Margins
                </Typography>
                <Select
                  sx={{
                    width: '100%',
                  }}
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={marginsValue}
                  size='small'
                  onChange={(event) =>
                    setMarginsValue(event.target.value as number)
                  }
                >
                  <MenuItem value={20}>Narrow</MenuItem>
                  <MenuItem value={35}>Default</MenuItem>
                  <MenuItem value={65}>Wide</MenuItem>
                </Select>
              </Box>
              <Box>
                <Typography variant='custom' fontSize={16}>
                  Start numbering at
                </Typography>
                <Box>
                  <TextField
                    sx={{
                      width: '100%',
                    }}
                    size='small'
                    type='number'
                    placeholder='input start numbering at'
                    value={startNumberValue}
                    onChange={(event) =>
                      setStartNumberValue(Number(event.target.value))
                    }
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
            sx={{ mt: 5 }}
          >
            <Grid item xs={12} md={6} lg={4}>
              <Button
                sx={{ width: '100%', height: 48 }}
                size='large'
                variant='contained'
                onClick={onAddPagesNumberAndDownload}
              >
                {isLoading ? <CircularProgress size={20} /> : 'Add & Download'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Stack>
  );
};
export default FunctionalityNumberPagesMain;
