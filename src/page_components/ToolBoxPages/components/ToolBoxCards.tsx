import { Card, CardContent, Grid, Typography } from '@mui/material';
import { FC } from 'react';

import ToolBoxIcon from '@/page_components/ToolBoxPages/components/ToolBoxIcon';
import {
  IToolData,
  IToolUrkKeyType,
} from '@/page_components/ToolBoxPages/constant';

interface IToolBoxCardsProps {
  list: IToolData[];
  onClickKey?: (key: IToolUrkKeyType) => void;
}

const ToolBoxCards: FC<IToolBoxCardsProps> = ({ list, onClickKey }) => {
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
          <Grid
            key={toolData.urlKey}
            item
            xs={12}
            sm={6}
            md={4}
            onClick={onClickKey ? () => onClickKey(toolData.urlKey) : undefined}
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
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ToolBoxCards;
