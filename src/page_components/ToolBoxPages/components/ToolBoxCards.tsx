import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';

import ProLink from '@/components/ProLink';
import ToolBoxIcon from '@/page_components/ToolBoxPages/components/ToolBoxIcon';
import { IToolData } from '@/page_components/ToolBoxPages/constant';

interface IToolBoxCardsProps {
  list: IToolData[];
}

const ToolBoxCards: FC<IToolBoxCardsProps> = ({ list }) => {
  const { t } = useTranslation();

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
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 16,
                        lg: 18,
                      },
                      mt: 1,
                    }}
                    variant='h5'
                    component='div'
                  >
                    {t(toolData.title)}
                  </Typography>
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
