import { Card, CardContent, Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { FC } from 'react'

import ProLink from '@/components/ProLink'
import ToolsIcon from '@/page_components/PdfToolsPages/components/ToolsIcon'
import { IToolData } from '@/page_components/PdfToolsPages/constant'

interface IToolsCardsProps {
  list: IToolData[]
  isShowSeoTag?: boolean
}

const ToolsCards: FC<IToolsCardsProps> = ({ list, isShowSeoTag = true }) => {
  const { t } = useTranslation()

  return (
    <Grid
      sx={{
        py: 5,
      }}
      container
      spacing={3}
    >
      {list.map((toolData) => {
        return (
          <Grid
            key={toolData.urlKey}
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <ProLink
              href={`/${toolData.urlPrefixPath}/${toolData.urlKey}`}
              color='inherit'
              hardRefresh={true}
              target='_self'
              sx={{
                flex: 1,
              }}
            >
              <Card
                sx={{
                  cursor: 'pointer',
                  height: '100%',
                }}
                variant='outlined'
              >
                <CardContent style={{ padding: 20 }}>
                  <ToolsIcon
                    name={toolData.icon}
                    sx={{
                      color: 'primary.main',
                      fontSize: 40,
                    }}
                  />
                  <Typography
                    component={isShowSeoTag ? 'h2' : 'div'}
                    sx={{
                      fontSize: {
                        xs: 16,
                        lg: 20,
                        fontWeight: 600,
                      },
                      mt: 1,
                    }}
                  >
                    {t(toolData.title)}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 12,
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
        )
      })}
    </Grid>
  )
}

export default ToolsCards
