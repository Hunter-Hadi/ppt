import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';

interface IAbilitiesProps {
  title?: string;
  data: {
    iconPath: string;
    title: string;
    contentStrong?: string;
    content: string;
  }[];
}

const Abilities: FC<IAbilitiesProps> = ({ title, data }) => {
  return (
    <Box
      sx={{
        py: {
          xs: 7,
          md: 14,
        },
        px: 2,
        maxWidth: 1312,
        margin: '0 auto',
      }}
    >
      {title && (
        <Typography
          component='h3'
          variant='custom'
          textAlign='center'
          sx={{
            pb: 4,
            fontWeight: 700,
            fontSize: {
              xs: 32,
              lg: 40,
            },
          }}
        >
          {title}
        </Typography>
      )}

      <Grid
        container
        spacing={{
          xs: 6,
        }}
        justifyContent='center'
      >
        {data.map((item) => (
          <Grid key={item.title} item xs={12} sm={4}>
            <Box
              justifyContent='flex-start'
              alignItems='center'
              display={'flex'}
              flexDirection={'column'}
              sx={{ flex: 1 }}
            >
              <Image width={64} height={64} src={item.iconPath} alt={''} />

              <Typography
                component='h5'
                variant='custom'
                sx={{
                  fontSize: 24,
                  mt: 3,
                  fontWeight: 700,
                  textAlign: 'center',
                }}
              >
                {item.title}
              </Typography>

              <Typography
                component='p'
                variant='custom'
                sx={{ fontSize: 16, mt: 2, textAlign: 'center' }}
              >
                {item.contentStrong && (
                  <Typography
                    component='span'
                    variant='custom'
                    sx={{ fontWeight: 'bold' }}
                  >
                    {item.contentStrong}
                  </Typography>
                )}
                {item.content}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Abilities;
