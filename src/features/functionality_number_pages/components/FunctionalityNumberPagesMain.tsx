import {
  Box,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const FunctionalityNumberPagesMain = () => {
  const [positionValue, setPositionValue] = useState('topLeft');
  const [marginsValue, setMarginsValue] = useState('Default');
  const [startNumberValue, setStartNumberValue] = useState(1);

  const circleGridView = (
    activeType: string = 'top',
    viewSize: number = 150,
    onChange: (value: string) => void,
  ) => {
    const viewPositionsList = [
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
  return (
    <Box>
      <Grid container gap={1}>
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
              onChange={(event) => setMarginsValue(event.target.value)}
            >
              <MenuItem value='Narrow'>Narrow</MenuItem>
              <MenuItem value='Default'>Default</MenuItem>
              <MenuItem value='Wide'>Wide</MenuItem>
            </Select>
          </Box>
          <Box>
            <Typography variant='custom' fontSize={18}>
              Start numbering at
            </Typography>
            <Box>
              <TextField
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
    </Box>
  );
};
export default FunctionalityNumberPagesMain;
