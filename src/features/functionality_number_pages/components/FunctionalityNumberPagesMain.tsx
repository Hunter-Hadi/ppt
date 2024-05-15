import {
  Box,
  Button,
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
  const [startNumberValue, setStartNumberValue] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const onUploadFile = async (fileList: FileList) => {
    setIsLoading(true);
    if (fileList.length) {
      setFile(fileList[0]);
    }
    setIsLoading(false);
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
    const buff = await file.arrayBuffer(); // Uint8Array
    const pdfDocument = await PDFDocument.load(buff); //加载pdf文件
    for (var i = 0; i < pdfDocument.getPages().length; i++) {
      const page = pdfDocument.getPage(i);
      const { width, height } = page.getSize();
      const fontSize = 12;
      const fontSizePadding = 10;
      const textWidth =
        startNumberValue.toString().length * (fontSize - fontSizePadding);
      let x = 50,
        y = 0;
      switch (positionValue) {
        case 'bottom':
          //位于底部的中心位置
          x = width / 2;
          y = marginsValue - fontSize / 6;
          break;
        case 'top':
          //位于底部的中心位置
          x = width / 2;
          y = height - fontSize + fontSizePadding;
          break;
      }
      x = x - textWidth;
      page.drawText('1', {
        x: x,
        y: y,
        size: fontSize,
      });
    }
    const blobData = await pdfDocument.save();
    downloadUrl(blobData, 'test.pdf');
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
              <Typography variant='custom' fontSize={18}>
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
                <Typography variant='custom' fontSize={18}>
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
                  <MenuItem value={100}>Wide</MenuItem>
                </Select>
              </Box>
              <Box>
                <Typography variant='custom' fontSize={18}>
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
            <Grid item xs={12} md={3}>
              <Button
                sx={{ width: '100%', height: 48 }}
                size='large'
                variant='contained'
                onClick={onAddPagesNumberAndDownload}
              >
                Add & Download
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Stack>
  );
};
export default FunctionalityNumberPagesMain;
