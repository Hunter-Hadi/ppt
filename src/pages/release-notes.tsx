import { Box, Divider, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import { MAXAI_RELEASE_NOTES } from '@/global_constants/releaseNotes';

const ReleaseNotes = () => {
  // 需要支持从 url 中获取 样式参数
  const { query, isReady } = useRouter();

  console.log(`query`, query);

  if (!isReady) {
    return null;
  }

  return (
    <AppContainer
      sx={{
        bgcolor: query.bgcolor ?? 'background.paper',
        color: query.color ?? 'text.primary',
      }}
      maxWidth={'unset'}
    >
      <AppDefaultSeoLayout title={'Release notes | MaxAI.me'} />
      <Stack
        pt={2.5}
        sx={{
          fontFamily: 'Roboto',
        }}
        spacing={2.5}
      >
        {MAXAI_RELEASE_NOTES.map((note) => {
          return (
            <Stack key={note.version} spacing={2}>
              <Typography
                variant='custom'
                fontSize={20}
                fontWeight={700}
                lineHeight={1.4}
              >
                Version {note.version} -{' '}
                {dayjs(note.date).format('MMMM DD, YYYY')}
              </Typography>

              {note.content && note.content.length > 0
                ? note.content.map((item) => {
                    return (
                      <Stack key={item.title} spacing={2}>
                        <Typography
                          variant='custom'
                          fontSize={16}
                          fontWeight={400}
                          lineHeight={1.5}
                        >
                          {item.title}:
                        </Typography>
                        {item.lists && item.lists.length > 0 ? (
                          <Stack
                            spacing={2}
                            component='ul'
                            pt={2.5}
                            pb={4}
                            pl={3}
                          >
                            {item.lists.map((item) => {
                              return (
                                <Box key={item.module} component='li'>
                                  <Typography
                                    variant='custom'
                                    fontSize={16}
                                    fontWeight={400}
                                    lineHeight={1.5}
                                  >
                                    <b>{item.module}</b>: {item.desc}
                                  </Typography>
                                </Box>
                              );
                            })}
                          </Stack>
                        ) : null}
                      </Stack>
                    );
                  })
                : null}

              <Divider
                flexItem
                sx={{
                  borderColor: query.divider ?? 'divider',
                }}
              />
            </Stack>
          );
        })}
      </Stack>
    </AppContainer>
  );
};

export default ReleaseNotes;
