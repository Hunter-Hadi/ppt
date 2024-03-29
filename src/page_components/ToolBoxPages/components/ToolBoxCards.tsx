import { Card, CardContent, Grid, Typography } from '@mui/material';
import { FC } from 'react';

import ProLink from '@/components/ProLink';
import ToolBoxIcon from '@/page_components/ToolBoxPages/components/ToolBoxIcon';
import { IToolData } from '@/page_components/ToolBoxPages/constant';

interface IToolBoxCardsProps {
  list: IToolData[];
}

const ToolBoxCards: FC<IToolBoxCardsProps> = ({ list }) => {
  return (
    <Grid
      sx={{
        pb: {
          md: 5,
        },
      }}
      container
      spacing={5}
    >
      {list.map((toolData) => {
        return (
          <Grid key={toolData.urlKey} item xs={12} sm={6} md={4}>
            <ProLink
              href={`/tool-box/${toolData.urlKey}`}
              hardRefresh
              color='inherit'
              target='_self'
              sx={{
                width: '100%',
              }}
            >
              <Card sx={{ padding: 1, cursor: 'pointer' }} variant='outlined'>
                <CardContent>
                  <ToolBoxIcon
                    name={toolData.icon}
                    sx={{ color: 'primary.main' }}
                  />
                  <Typography variant='h5' component='div'>
                    {toolData.title}
                  </Typography>
                  <Typography color='text.secondary'>
                    {toolData.description}
                  </Typography>
                </CardContent>
              </Card>
            </ProLink>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ToolBoxCards;
