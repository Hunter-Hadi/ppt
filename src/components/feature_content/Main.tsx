import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import React, { FC, HTMLAttributeAnchorTarget } from 'react'

import CustomImage from '@/components/CustomImage'
import ProLink from '@/components/ProLink'

export type IFeaturePageMainProps = {
  type: 'largeCards' | 'mediumCards' | 'smallCards' | 'listCards'
  list: {
    icon?: string
    title?: string
    description?: string
    image?: string
    imageHeight?: number
    cardHref?: string
    leftButton?: {
      text: string
      href: string
      description?: string
    }
    rightButton?: {
      text: string
      href: string
      description?: string
    }
    tag?: {
      text: string
    }
    imagePosition?: 'left' | 'right'
    sideInfos?: Array<{
      title: string
      description: string | React.ReactNode
    }>
    CTAButton?: {
      text: string
      href: string
      variant?: 'contained' | 'outlined'
      target?: HTMLAttributeAnchorTarget
    }
  }[]
}

const FeatureMain: FC<{
  docs: IFeaturePageMainProps[]
  // 针对partner修改链接
  partnerMode?: boolean
}> = ({ docs, partnerMode = false }) => {
  // let isTextLeft = true; // 图片文字左右切换的效果
  const hrefRel = partnerMode ? '' : undefined
  return (
    <Grid container sx={{ px: { xs: 2 } }} rowSpacing={{ xs: 2, sm: 8 }}>
      {docs?.map((doc, docIndex) => {
        const docType = doc.type
        if (docType === 'largeCards') {
          return (
            <Grid item xs={12} key={docIndex}>
              <Grid container rowSpacing={{ xs: 4, sm: 8 }}>
                {doc.list.map((item, index) => (
                  <Grid item xs={12} key={index} sx={{ textAlign: 'center' }}>
                    {item.title && (
                      <Typography
                        variant={'h4'}
                        component={'h2'}
                        sx={{
                          fontSize: 32,
                          whiteSpace: 'pre-wrap',
                          fontWeight: 700,
                          lineHeight: 1.5,
                        }}
                      >
                        {item.title}
                      </Typography>
                    )}

                    {item.description && (
                      <Typography
                        variant={'body1'}
                        sx={{
                          mt: 2,
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {item.description}
                      </Typography>
                    )}

                    {item.image ? (
                      <Box
                        sx={{
                          mt: 4,
                          mb: 2,
                          p: 1,
                          position: 'relative',
                          width: '100%',
                          height: item.imageHeight || 450,
                        }}
                      >
                        <CustomImage
                          src={item.image}
                          alt={item.title}
                          layout={'fill'}
                          objectFit={'contain'}
                        />
                      </Box>
                    ) : null}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )
        } else if (docType === 'mediumCards') {
          return (
            <Grid container item xs={12} spacing={3} key={docIndex}>
              {doc.list.map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                  {item.cardHref ? (
                    <ProLink
                      muiLinkProps={{ rel: hrefRel }}
                      href={item.cardHref}
                      sx={{ height: '100%' }}
                    >
                      <Card
                        elevation={0}
                        sx={{
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          height: '100%',
                          '&:hover': {
                            boxShadow:
                              '0px 3px 6px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px rgba(0, 0, 0, 0.05)',
                          },
                        }}
                      >
                        <CardContent
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                          }}
                        >
                          <Box sx={{ height: 48, width: 48 }}>
                            <CustomImage
                              src={item.icon}
                              alt={item.title}
                              width={48}
                              height={48}
                            ></CustomImage>
                          </Box>
                          <Typography
                            variant='h5'
                            component={'h3'}
                            fontWeight={'bold'}
                            my={1.5}
                          >
                            {item.title}
                          </Typography>
                          <Typography color='text.primary' sx={{ flex: 1 }}>
                            {item.description}
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mt: 3,
                            }}
                          >
                            {item.leftButton?.text && item.leftButton?.href && (
                              <ProLink
                                muiLinkProps={{ rel: hrefRel }}
                                href={item.leftButton.href}
                              >
                                <Button variant='outlined'>
                                  <Typography variant='body2'>
                                    {item.leftButton.text}
                                  </Typography>
                                </Button>
                              </ProLink>
                            )}
                            {item.rightButton?.text &&
                              item.rightButton?.href && (
                                <ProLink
                                  muiLinkProps={{ rel: hrefRel }}
                                  href={item.rightButton.href}
                                >
                                  <Button>
                                    <Typography
                                      color='text.secondary'
                                      variant='body2'
                                    >
                                      {item.rightButton.text}
                                    </Typography>
                                  </Button>
                                </ProLink>
                              )}
                            {item.tag?.text && (
                              <Button
                                variant='contained'
                                disabled
                                sx={{
                                  px: 0.5,
                                  py: 0.25,
                                  '&:disabled': {
                                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                                  },
                                }}
                              >
                                <Typography
                                  variant='caption'
                                  color='text.secondary'
                                >
                                  {item.tag.text}
                                </Typography>
                              </Button>
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    </ProLink>
                  ) : (
                    <Card
                      elevation={0}
                      sx={{
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        height: '100%',
                      }}
                    >
                      <CardContent
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                        }}
                      >
                        <Box sx={{ height: 48, width: 48 }}>
                          <CustomImage
                            src={item.icon}
                            alt={item.title}
                            width={48}
                            height={48}
                          ></CustomImage>
                        </Box>
                        <Typography
                          variant='h5'
                          component={'h3'}
                          fontWeight={'bold'}
                          my={1.5}
                        >
                          {item.title}
                        </Typography>
                        <Typography color='text.primary' sx={{ flex: 1 }}>
                          {item.description}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 3,
                          }}
                        >
                          {item.leftButton?.text && item.leftButton?.href && (
                            <ProLink
                              muiLinkProps={{ rel: hrefRel }}
                              href={item.leftButton.href}
                            >
                              <Button variant='outlined'>
                                <Typography variant='body2'>
                                  {item.leftButton.text}
                                </Typography>
                              </Button>
                            </ProLink>
                          )}
                          {item.rightButton?.text && item.rightButton?.href && (
                            <ProLink
                              muiLinkProps={{ rel: hrefRel }}
                              href={item.rightButton.href}
                            >
                              <Button>
                                <Typography
                                  color='text.secondary'
                                  variant='body2'
                                >
                                  {item.rightButton.text}
                                </Typography>
                              </Button>
                            </ProLink>
                          )}
                          {item.tag?.text && (
                            <Button
                              variant='contained'
                              disabled
                              sx={{
                                px: 0.5,
                                py: 0.25,
                                '&:disabled': {
                                  bgcolor: 'rgba(0, 0, 0, 0.04)',
                                },
                              }}
                            >
                              <Typography
                                variant='caption'
                                color='text.secondary'
                              >
                                {item.tag.text}
                              </Typography>
                            </Button>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  )}
                </Grid>
              ))}
            </Grid>
          )
        } else if (doc.type == 'smallCards') {
          return (
            <Grid container item xs={12} spacing={3} key={docIndex}>
              {doc.list.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  {item.cardHref ? (
                    <ProLink
                      href={item.cardHref}
                      muiLinkProps={{ rel: hrefRel }}
                      target={
                        partnerMode && item?.cardHref?.startsWith('http')
                          ? '_blank'
                          : '_self'
                      }
                    >
                      <Card
                        elevation={0}
                        sx={{
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          height: '100%',
                          '&:hover': {
                            boxShadow:
                              '0px 3px 6px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px rgba(0, 0, 0, 0.05)',
                          },
                        }}
                      >
                        <CardContent
                          sx={{
                            display: 'flex',
                            p: 3,
                            flexDirection: 'column',
                            height: '100%',
                          }}
                        >
                          {item.icon && (
                            <Stack
                              py={2.5}
                              justifyContent={'center'}
                              alignItems={'center'}
                            >
                              <Box
                                sx={{
                                  position: 'relative',
                                  width: '100%',
                                  height: item.imageHeight || 120,
                                }}
                              >
                                <CustomImage
                                  src={item.icon}
                                  alt={item.title}
                                  layout={'fill'}
                                  objectFit={'contain'}
                                />
                              </Box>
                            </Stack>
                          )}
                          <Typography
                            variant='h5'
                            component={'h3'}
                            sx={{
                              fontWeight: 'bold',
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant='body2'
                            sx={{
                              flex: 1,
                              mt: 1.5,
                            }}
                          >
                            {item.description && (
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: item.description,
                                }}
                              ></span>
                            )}
                          </Typography>
                          {item.image && (
                            <Box
                              sx={{
                                my: 2,
                                position: 'relative',
                                width: '100%',
                                height: item.imageHeight || 450,
                              }}
                            >
                              <CustomImage
                                src={item.image}
                                alt={item.title}
                                layout={'fill'}
                                objectFit={'contain'}
                              />
                            </Box>
                          )}
                          {item.CTAButton && (
                            <ProLink
                              muiLinkProps={{ rel: hrefRel }}
                              href={item.CTAButton.href}
                              target={item.CTAButton.target || '_self'}
                              onClick={(event) => {
                                event.stopPropagation()
                              }}
                            >
                              <Button
                                variant={item.CTAButton.variant || 'outlined'}
                                fullWidth
                                sx={{ height: 56 }}
                              >
                                {item.CTAButton.text}
                              </Button>
                            </ProLink>
                          )}
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mt: 2,
                            }}
                          >
                            {item.leftButton?.text && item.leftButton?.href && (
                              <ProLink
                                muiLinkProps={{ rel: hrefRel }}
                                href={item.leftButton.href}
                              >
                                <Button>
                                  <Typography
                                    color='text.secondary'
                                    variant='body2'
                                  >
                                    {item.leftButton.text}
                                  </Typography>
                                </Button>
                              </ProLink>
                            )}
                            {item.tag?.text && (
                              <Button
                                variant='contained'
                                disabled
                                sx={{
                                  px: 0.5,
                                  py: 0.25,
                                  '&:disabled': {
                                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                                  },
                                }}
                              >
                                <Typography
                                  variant='caption'
                                  color='text.secondary'
                                >
                                  {item.tag.text}
                                </Typography>
                              </Button>
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    </ProLink>
                  ) : (
                    <Card
                      elevation={0}
                      sx={{
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        height: '100%',
                      }}
                    >
                      <CardContent
                        sx={{
                          display: 'flex',
                          p: 3,
                          flexDirection: 'column',
                          height: '100%',
                        }}
                      >
                        <Typography
                          variant='h5'
                          component={'h3'}
                          sx={{
                            fontWeight: 'bold',
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant='body2'
                          sx={{
                            flex: 1,
                            mt: 1.5,
                          }}
                        >
                          {item.description && (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            ></span>
                          )}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 3,
                          }}
                        >
                          {item.leftButton?.text && item.leftButton?.href && (
                            <ProLink
                              muiLinkProps={{ rel: hrefRel }}
                              href={item.leftButton.href}
                            >
                              <Button>
                                <Typography
                                  color='text.secondary'
                                  variant='body2'
                                >
                                  {item.leftButton.text}
                                </Typography>
                              </Button>
                            </ProLink>
                          )}
                          {item.tag?.text && (
                            <Button
                              variant='contained'
                              disabled
                              sx={{
                                px: 0.5,
                                py: 0.25,
                                '&:disabled': {
                                  bgcolor: 'rgba(0, 0, 0, 0.04)',
                                },
                              }}
                            >
                              <Typography
                                variant='caption'
                                color='text.secondary'
                              >
                                {item.tag.text}
                              </Typography>
                            </Button>
                          )}
                        </Box>
                        {item.image && (
                          <Box
                            sx={{
                              position: 'relative',
                              width: '100%',
                              height: item.imageHeight || 450,
                            }}
                          >
                            <CustomImage
                              src={item.image}
                              alt={item.title}
                              layout={'fill'}
                              objectFit={'contain'}
                            />
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </Grid>
              ))}
            </Grid>
          )
        } else if (doc.type === 'listCards') {
          return (
            <Grid
              container
              item
              xs={12}
              spacing={{ xs: 4, sm: 12 }}
              key={docIndex}
            >
              {doc.list.map((item, index) => (
                <React.Fragment key={index}>
                  {item.title && item.title.trim() !== '' && (
                    <Grid item xs={12} key={index}>
                      <Typography
                        variant='h5'
                        component={'h3'}
                        sx={{
                          fontWeight: 'bold',
                          textAlign: 'center',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Grid>
                  )}
                  {item.description && (
                    <Grid item xs={12}>
                      <Typography
                        sx={{
                          textAlign: 'center',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Grid>
                  )}
                  <Grid
                    container
                    item
                    sx={{
                      flexFlow: {
                        xs: 'column-reverse',
                        md: index % 2 === 0 ? 'row' : 'row-reverse',
                      },
                      flexDirection: {
                        xs: 'column-reverse',
                        md: index % 2 === 0 ? 'row' : 'row-reverse',
                      },
                    }}
                  >
                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          mt: 4,
                          mb: 2,
                          p: 1,
                          position: 'relative',
                          width: '100%',
                          height: {
                            xs: 260,
                            sm: item.imageHeight || 450,
                          },
                          maxHeight: {
                            xs: '90vw',
                            sm: 'unset',
                          },
                        }}
                      >
                        <CustomImage
                          src={item.image}
                          alt={item.title}
                          layout={'fill'}
                          objectFit={'contain'}
                        />
                      </Box>
                    </Grid>
                    {item.sideInfos && (
                      <Grid item xs={12} md={6}>
                        <Stack
                          sx={{
                            p: 2,
                            px: {
                              xs: 2,
                              sm: 10,
                            },
                            height: '100%',
                            justifyContent: 'center',
                          }}
                        >
                          {item.sideInfos.map((sideInfo) => (
                            <Box mt={3} key={sideInfo.title}>
                              <Typography
                                fontSize={item.title ? 20 : 32}
                                fontWeight={item.title ? 400 : 700}
                                component={item.title ? 'h3' : 'h2'}
                                variant={'custom'}
                                mb={4}
                              >
                                {sideInfo.title}
                              </Typography>
                              <Typography
                                color='text.secondary'
                                variant={'custom'}
                                fontSize={20}
                                whiteSpace={'pre-wrap'}
                              >
                                {sideInfo.description}
                              </Typography>
                            </Box>
                          ))}
                        </Stack>
                      </Grid>
                    )}
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          )
        }
      })}
    </Grid>
  )
}
export default FeatureMain
