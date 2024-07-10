import GradeRoundedIcon from '@mui/icons-material/GradeRounded'
import { Grid, Stack, Typography } from '@mui/material'
import React from 'react'

import AppContainer from '@/app_layout/AppContainer'
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout'
import CustomIcon, { ICustomIconType } from '@/components/CustomIcon'
import ProLink from '@/components/ProLink'
import ResponsiveImage from '@/components/ResponsiveImage'
import YoutubePlayerBox from '@/components/YoutubePlayerBox'
import {
  WEBCHATGPT_EXTENSION,
  WEBCHATGPT_SEO_CONFIG,
} from '@/features/webchatgpt/constant'
import WebChatGPTHeader from '@/features/webchatgpt/layout/WebChatGPTHeader'
import { WWW_PROJECT_LINK } from '@/global_constants'

const INSTALL_LINKS = [
  {
    name: 'Chrome',
    link: WEBCHATGPT_EXTENSION,
    icon: 'ChromeColor',
    text: 'Get it on Chrome',
  },
  {
    name: 'Edge',
    link: `https://microsoftedge.microsoft.com/addons/detail/webchatgpt-chatgpt-with-/flahobhjikkpnpohomeckhdjjkkkkmoc`,
    icon: 'EdgeColor',
    text: 'Get it on Edge',
  },
  {
    name: 'Firefox',
    link: `https://addons.mozilla.org/firefox/addon/web-chatgpt/`,
    icon: 'FirefoxColor',
    text: 'Get it on Firefox',
  },
]

const WebChatGPTHomePage = (props) => {
  const { seo } = props
  console.log(`props`, props)
  return (
    <Stack minHeight={'100%'} flex={1}>
      <AppDefaultSeoLayout {...seo} />
      <WebChatGPTHeader />
      <AppContainer sx={{ bgcolor: '#F8F9FA', height: '100%' }}>
        <Stack
          spacing={3}
          px={{
            xs: 0,
            md: 10,
          }}
          py={{
            xs: 8,
            md: 8,
          }}
        >
          <Typography
            component={'h1'}
            variant='custom'
            fontSize={{
              md: 60,
              xs: 48,
            }}
            textAlign='center'
          >
            WebChatGPT
          </Typography>
          <Typography
            component={'p'}
            variant={'body2'}
            textAlign='center'
            fontSize={24}
          >
            Enable web access and one-click prompts in ChatGPT
            <br />
            and display AI responses next to search results
          </Typography>
          <SocialProof />
          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            spacing={2}
            justifyContent={'center'}
            alignItems={'center'}
          >
            {INSTALL_LINKS.map(({ name, link, icon, text }) => (
              <ProLink
                key={name}
                target='_blank'
                href={link}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 250,
                  height: 68,
                  bgcolor: '#f4f9fd',
                  color: '#000',
                  border: '1px solid #d9dde0',
                  borderRadius: 4,
                  gap: 1.5,
                }}
              >
                <CustomIcon
                  icon={icon as ICustomIconType}
                  sx={{
                    fontSize: 48,
                  }}
                />
                <Typography variant='caption' fontSize={18}>
                  {text}
                </Typography>
              </ProLink>
            ))}
          </Stack>
          {/* video and discord */}
          <Grid container justifyContent={'center'} mt={'72px !important'}>
            <Grid
              item
              p={2}
              xs={12}
              md={6}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <YoutubePlayerBox
                youtubeLink='https://www.youtube.com/embed/vWBknmg4PGA'
                borderRadius={4}
              ></YoutubePlayerBox>
            </Grid>
            <Grid
              p={2}
              item
              xs={12}
              md={6}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <YoutubePlayerBox
                youtubeLink='https://discord.com/widget?id=1060110102188797992&theme=dark'
                borderRadius={4}
              ></YoutubePlayerBox>
            </Grid>
          </Grid>
        </Stack>

        {/* key  feature */}
        <Stack
          spacing={4}
          maxWidth={{
            xs: '100%',
            md: 896,
          }}
          pb={10}
          px={{
            xs: 0,
            md: 10,
          }}
          mx='auto'
          boxSizing={'border-box'}
        >
          <Typography variant='h1'>Key features</Typography>
          <Stack spacing={2}>
            <Typography variant='h2'>Web access</Typography>
            <Stack component={'ul'} pl={3}>
              <Typography component={'li'} variant='body2' fontSize={18}>
                Get web results for your queries
              </Typography>
              <Typography component={'li'} variant='body2' fontSize={18}>
                Scrape entire search result pages for full insights
              </Typography>
              <Typography component={'li'} variant='body2' fontSize={18}>
                Extract webpage text from any url
              </Typography>
            </Stack>
            <ResponsiveImage
              alt='web-access'
              width={1472}
              height={829}
              src='/assets/webchatgpt/features/web-access.png'
            />
          </Stack>
          <Stack spacing={2}>
            <Typography variant='h2'>One-click prompts</Typography>
            <Stack component={'ul'} pl={3}>
              <Typography component={'li'} variant='body2' fontSize={18}>
                One-click ChatGPT prompts library
              </Typography>
              <Typography component={'li'} variant='body2' fontSize={18}>
                Run prompts that perform web searches and live crawling
              </Typography>
              <Typography component={'li'} variant='body2' fontSize={18}>
                Manage your own prompts
              </Typography>
            </Stack>
            <ResponsiveImage
              alt='one-click-prompt'
              width={1472}
              height={829}
              src='/assets/webchatgpt/features/one-click-prompt.png'
            />
          </Stack>
          <Stack spacing={2}>
            <Typography variant='h2'>Search with AI</Typography>
            <Stack component={'ul'} pl={3}>
              <Typography component={'li'} variant='body2' fontSize={18}>
                Get AI-powered search answers right beside your search results
              </Typography>
              <Typography component={'li'} variant='body2' fontSize={18}>
                Powered by ChatGPT, Claude, Bard, Bing AI
              </Typography>
              <Typography component={'li'} variant='body2' fontSize={18}>
                Compatible with all popular search platforms
              </Typography>
            </Stack>
            <ResponsiveImage
              alt='web-access'
              width={1472}
              height={829}
              src='/assets/webchatgpt/features/search-with-ai.png'
            />
          </Stack>
        </Stack>

        {/* faq */}
        <Stack
          spacing={4}
          maxWidth={{
            xs: '100%',
            md: 896,
          }}
          pb={10}
          px={{
            xs: 0,
            md: 10,
          }}
          mx='auto'
          boxSizing={'border-box'}
        >
          <Typography variant='h1'>Frequently Asked Questions</Typography>
          <Stack spacing={2}>
            <Typography component={'h2'} variant='custom' fontSize={24}>
              Which search engine does the extension use?
            </Typography>
            <Typography variant='body2' fontSize={18}>
              Google Search and Yahoo! Search.
            </Typography>
          </Stack>
          <Stack spacing={2}>
            <Typography component={'h2'} variant='custom' fontSize={24}>
              Why is the extension asking for `access to all websites`
              permission?
            </Typography>
            <Typography variant='body2' fontSize={18}>
              The extension requires access to all websites because there is no
              backend server to process web requests, and everything happens
              locally in the browser. There are two modes: web searching using
              Google Search and Yahoo! Search, and extracting webpage text from
              URLs. Web searching requires access to Google Search and Yahoo!
              Search, while URL text extraction requires access to any website.
              This is why the <code>access to all websites</code> permission is
              required.
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <Typography component={'h2'} variant='custom' fontSize={24}>
              The extension does not work, the toolbar does not show up. What
              can I do?
            </Typography>
            <Typography variant='body2' fontSize={18}>
              Some other ChatGPT extensions are known to interfere with
              WebChatGPT. If you are experiencing issues with the toolbar not
              showing up, please try disabling any other ChatGPT extensions that
              you have installed and reloading the page. If you continue to
              experience issues, feel free to reach out to us on our Discord
              server for assistance.
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <Typography component={'h2'} variant='custom' fontSize={24}>
              Can I use other search engines?
            </Typography>
            <Typography variant='body2' fontSize={18}>
              {`The extension currently only supports web searching using the
            Google Search and Yahoo! Search engine. However, you can use Google Search and Yahoo! Search bangs to
            get search results from thousands of other websites. For example,
            !pm to search on PubMed, !gsc – on Google Scholar, etc. You can find
            the full list of available bangs on the Google Search and Yahoo! Search website. Simply
            type the bang followed by your search query to perform the search on
            the corresponding website.`}
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <Typography component={'h2'} variant='custom' fontSize={24}>
              Does it work on mobile?
            </Typography>
            <Typography variant='body2' fontSize={18}>
              No, currently the extension only works in chromium-based browsers.
            </Typography>
          </Stack>

          <Stack alignItems='center' justifyContent='center' spacing={2}>
            <Typography component={'h3'} variant='custom' fontSize={24}>
              Still have questions?
            </Typography>
            <ProLink
              target='_blank'
              href={'https://discord.com/invite/nmCjvyVpnB'}
              sx={{
                width: 200,
                height: 82,
                borderRadius: '6px',
                overflow: 'hidden',
              }}
            >
              <ResponsiveImage
                src='/assets/webchatgpt/discord.png'
                width={256}
                height={105}
                alt={'Join Discord'}
              ></ResponsiveImage>
            </ProLink>
          </Stack>
        </Stack>
      </AppContainer>
    </Stack>
  )
}

const SocialProof = () => {
  const count = 5
  return (
    <Stack
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      alignItems='center'
      justifyContent={'center'}
      mt={'64px !important'}
    >
      <Stack direction={'row'} alignItems='center'>
        {Array.from({ length: count }).map((_, index) => (
          <GradeRoundedIcon
            key={index}
            sx={{
              color: '#F5A523',
              fontSize: 40,
            }}
          />
        ))}
      </Stack>

      <Typography
        variant={'custom'}
        fontSize={{
          xs: 36,
          sm: 48,
        }}
        color='rgba(104, 112, 118, 1)'
        fontWeight={700}
        textAlign='center'
        pl={0.8}
      >
        Loved by 1.5M+ users
      </Typography>
    </Stack>
  )
}

export default WebChatGPTHomePage

export function getStaticProps() {
  return {
    props: {
      seo: {
        ...WEBCHATGPT_SEO_CONFIG,
        canonical: `${WWW_PROJECT_LINK}/partners/webchatgpt/`,
      },
    },
  }
}
