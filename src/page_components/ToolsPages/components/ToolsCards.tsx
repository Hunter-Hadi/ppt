import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';

import ProLink from '@/components/ProLink';
import ToolsIcon from '@/page_components/ToolsPages/components/ToolsIcon';
import {
  IToolData,
  toolsTopUrlKey,
} from '@/page_components/ToolsPages/constant';

interface IToolsCardsProps {
  list: IToolData[];
}

const ToolsCards: FC<IToolsCardsProps> = ({ list }) => {
  const { t } = useTranslation();

  return (
    <Grid
      sx={{
        pb: 5,
      }}
      container
      spacing={5}
    >
      {list.map((toolData) => {
        return (
          <Grid key={toolData.urlKey} item xs={12} sm={6} md={4}>
            <ProLink
              href={`/${toolsTopUrlKey}/${toolData.urlKey}`}
              color='inherit'
              target='_self'
              sx={{
                width: '100%',
              }}
            >
              <Card sx={{ padding: 1, cursor: 'pointer' }} variant='outlined'>
                <CardContent>
                  <ToolsIcon
                    name={toolData.icon}
                    sx={{ color: 'primary.main' }}
                  />
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 15,
                        lg: 16,
                      },
                      mt: 1,
                    }}
                    variant='h5'
                    component='div'
                  >
                    {t(toolData.title)}
                  </Typography>
                  <div style={{ minHeight: 70 }}>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: 13,
                          lg: 15,
                        },
                        mt: 1,
                      }}
                      color='text.secondary'
                    >
                      {t(toolData.description)}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </ProLink>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ToolsCards;
