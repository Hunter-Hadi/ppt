import { Box, Grid, Stack, Typography } from '@mui/material';

const FunctionalityNumberPagesMain = () => {
  return (
    <Box>
      <Grid container>
        <Grid item>
          <Typography>Position</Typography>
          <Stack
            direction='row'
            justifyContent='space-between'
            sx={{
              border: '1px solid red',
              height: 200,
              width: 200,
              flexWrap: 'wrap',
            }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  border: '1px solid #f6f6f6',
                  width: 'calc(33% - 2px)',
                  height: '33%',
                }}
              ></Box>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
export default FunctionalityNumberPagesMain;
