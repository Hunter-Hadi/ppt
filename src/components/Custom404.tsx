import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

interface IProps {
  CustomButton?: React.ReactElement;
}

const Custom404: FC<IProps> = ({ CustomButton }) => {
  const router = useRouter();
  return (
    <Container maxWidth={'lg'}>
      <Card
        elevation={0}
        sx={{
          height: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', mb: 5, padding: '10px 0' }}>
            <Typography
              color='text.primary'
              variant='h5'
              sx={{
                pr: 2,
                display: 'flex',
                alignItems: 'center',
                borderRight: '1px solid rgba(0, 0, 0, 0.3)',
              }}
            >
              404
            </Typography>
            <Typography
              color='text.secondary'
              variant='body1'
              sx={{ pl: 2, display: 'flex', alignItems: 'center' }}
            >
              This page could not be found
            </Typography>
          </Box>
          <Stack spacing={2}>
            <Button
              variant='contained'
              disableElevation
              onClick={() => router.push('/')}
            >
              Back Home
            </Button>

            {CustomButton}
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Custom404;
