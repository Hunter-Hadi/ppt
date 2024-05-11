import { Box, Grid, Stack, Typography } from '@mui/material';

type IOptionItem = {
  value: string;
  label: string;
  [key: string]: string;
};
interface IFunctionalityCommonOptionSelector<T = IOptionItem> {
  list: T[];
  selectKey: string;
  onSelect: (onSelectItem: T) => void;
  disabled?: boolean;
}
function FunctionalityCommonOptionSelector<
  T extends IOptionItem = IOptionItem,
>({
  list,
  onSelect,
  selectKey,
  disabled,
}: IFunctionalityCommonOptionSelector<T>) {
  return (
    <Box>
      {list.map((option) => (
        <Grid container key={option.value} justifyContent='center'>
          <Grid item xs={12} lg={8}>
            <Stack
              direction='row'
              alignItems='center'
              onClick={() => {
                if (!disabled) {
                  onSelect(option);
                }
              }}
              gap={2}
              sx={{
                padding: 1.5,
                cursor: disabled ? '' : 'pointer',
                border: `1px solid ${
                  option.value === selectKey ? '#9065B0' : '#e8e8e8'
                }`,
                bgcolor: disabled ? '#f4f4f4' : 'transcript',
                borderRadius: 1,
                mt: 1,
                '&:hover': {
                  bgcolor: disabled ? 'transcript' : '#f4f4f4',
                },
              }}
            >
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='center'
                sx={{
                  border: `1px solid ${
                    option.value === selectKey ? '#9065B0' : '#e8e8e8'
                  }`,
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                }}
              >
                <Box
                  sx={{
                    bgcolor:
                      option.value === selectKey ? '#9065B0' : 'transcript',
                    width: 17,
                    height: 17,
                    borderRadius: 10,
                  }}
                ></Box>
              </Stack>
              <Box>
                <Box>
                  <Typography
                    fontSize={{
                      xs: 14,
                      lg: 16,
                    }}
                    color='text.primary'
                  >
                    {option.title}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    fontSize={{
                      xs: 12,
                      lg: 14,
                    }}
                    color='text.secondary'
                  >
                    {option.tips}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}
export default FunctionalityCommonOptionSelector;
