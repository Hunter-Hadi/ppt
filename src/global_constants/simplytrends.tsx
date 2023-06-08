import { Typography } from '@mui/material';
import React from 'react';

import ContactUsEmailLink from '@/components/ContactUsEmailLink';
import { IFAQItem } from '@/components/FAQList';
import ProLink from '@/components/ProLink';
import {
  APP_EXTERNAL_LINKS,
  SIMPLY_TRENDS_APP_LINK,
  SIMPLY_TRENDS_DEMOPAGE_LINK,
} from '@/global_constants';

const FAQ_SIMPLY_TRENDS: IFAQItem[] = [
  {
    key: 'panel1',
    title: 'What is SimplyTrends?',
    description: (
      <>
        <Typography variant={'body2'}>
          SimplyTrends is a toolkit for Shopify and dropshipping business at
          every scale.
        </Typography>
        <Typography variant={'body2'}>
          You can discover, spy and track any Shopify store, find real-time
          winning ads, find suppliers with image search, and there are just so
          much more.{' '}
          <ProLink
            href={`${SIMPLY_TRENDS_DEMOPAGE_LINK}/features`}
            muiLinkProps={{ title: 'Explore all features in SimplyTrends' }}
          >
            Explore all features in SimplyTrends
          </ProLink>{' '}
        </Typography>
      </>
    ),
  },
  {
    key: 'panel2',
    title: 'How to find and track competitors in SimplyTrends?',
    description: (
      <>
        <Typography variant={'body2'}>
          In SimplyTrends, everything is intuitive. Start to find, track and
          monitor your competitors in{' '}
          <ProLink
            href={`${SIMPLY_TRENDS_DEMOPAGE_LINK}/kb/how-to-find-track-your-competitors-in-simplytrends`}
            muiLinkProps={{ title: 'just 3 steps' }}
          >
            just 3 steps
          </ProLink>
          .
        </Typography>
      </>
    ),
  },
  {
    key: 'panel3',
    title: 'Can I find winning ads in SimplyTrends?',
    description: (
      <>
        <Typography variant={'body2'}>
          Sure thing! We gather real-time profitable winning ads while you can
          also search for keyword-related winning ads.
        </Typography>
        <Typography variant={'body2'}>
          We&apos;ve also visualized active ads over time on a graph so that you
          can anticipate the trend beforehand, and recognize whether it&apos;s a
          winning product.{' '}
          <ProLink
            href={`${SIMPLY_TRENDS_APP_LINK}/winningads/start`}
            muiLinkProps={{ title: 'Try it now' }}
          >
            Try it now
          </ProLink>
          .
        </Typography>
      </>
    ),
  },
  {
    key: 'panel4',
    title: 'Do you have Chrome extension?',
    description: (
      <>
        <Typography variant={'body2'}>
          Of course, and it&apos;s <b>FREE FOREVER</b>!
        </Typography>
        <Typography variant={'body2'}>
          SimplyTrends is a great combination and upgrade of all Shopify related
          Chrome extensions. Spy on any Shopify stores with store-level and
          product-level insights, and scrape products in bulk from
          Shopify-powered stores instantly with a few clicks.
        </Typography>
        <Typography variant={'body2'}>
          It also runs on AliExpress page for scraping digitals at the best
          quality, and capture ads on any Facebook page you are browsing at the
          moment.{' '}
          <ProLink
            href={`${APP_EXTERNAL_LINKS.CHROME_EXTENSION}`}
            muiLinkProps={{ title: 'Pin it to your browser now' }}
          >
            Pin it to your browser now
          </ProLink>
          .
        </Typography>
      </>
    ),
  },
  {
    key: 'panel5',
    title: `Can I trust your data?`,
    description: `We analyze millions of searches, conversations and mentions across the Internet to ensure our data are accurate. But some data are estimated, for example, the revenue of a store. `,
  },
  {
    key: 'panel6',
    title: `How do I contact help or support?`,
    description: (
      <>
        We have a dedicated support team available for all your questions and
        needs. If you need anything, simply shoot us an email at{' '}
        <ContactUsEmailLink />.
      </>
    ),
  },
];
export { FAQ_SIMPLY_TRENDS };
