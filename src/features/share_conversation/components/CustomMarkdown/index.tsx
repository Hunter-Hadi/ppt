import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { FC, useMemo } from 'react';
import Highlight from 'react-highlight';
import ReactMarkdown from 'react-markdown';
import reactNodeToString from 'react-node-to-string';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import supersub from 'remark-supersub';

import YoutubePlayerBox from '@/components/YoutubePlayerBox';

import CopyTooltipIconButton from '../CopyTooltipIconButton';
import TagLabelList, { isTagLabelListCheck } from './TagLabelList';

const OverrideAnchor: FC<{
  children: React.ReactNode;
  href?: string;
  title?: string;
}> = (props) => {
  return (
    <Link sx={{ cursor: 'pointer' }} href={props.href} target={'_blank'}>
      {props.children}
    </Link>
  );
};

type IHeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const OverrideHeading: FC<HTMLHeadingElement & { heading: IHeadingType }> = (
  props,
) => {
  // console.log('OverrideHeading props', props)
  return (
    <>
      {React.Children.map(props.children, (child) => {
        // console.log(child)
        const html: string = child as any;
        if (isTagLabelListCheck(props.heading === 'h1' ? `#${html}` : html)) {
          const tags = html
            .split(' ')
            .map((item) => (item.startsWith('#') ? item : `#${item}`));
          return <TagLabelList tags={tags} />;
        }
        return (
          <Typography
            component={props.heading}
            variant={props.heading}
            style={{
              color: 'text.primary',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            {child as any}
          </Typography>
        );
      })}
    </>
  );
};

const OverrideCode: FC<{ children: React.ReactNode; className?: string }> = (
  props,
) => {
  const { children, className } = props;
  const code = useMemo(
    () => reactNodeToString(props.children),
    [props.children],
  );
  const lang = props.className?.match(/language-(\w+)/)?.[1] || 'code';
  return (
    <Stack
      bgcolor='#000'
      sx={{
        borderRadius: '6px',
        mb: 2,
        overflow: 'hidden',
      }}
    >
      <Stack
        justifyContent='space-between'
        alignItems={'center'}
        direction='row'
        component='div'
        sx={{
          px: 2,
          py: 0.5,
          bgcolor: 'rgba(52,53,65,1)',
          color: 'rgb(217,217,227)',
        }}
      >
        <Typography component='span' fontSize={12}>
          {lang}
        </Typography>
        <CopyTooltipIconButton
          copyText={code}
          sx={{
            borderRadius: '6px',
            px: '8px !important',
          }}
        >
          <span style={{ marginLeft: '4px', fontSize: '12px' }}>Copy code</span>
        </CopyTooltipIconButton>
      </Stack>
      <Box fontSize={14} bgcolor='#000' color={'#fff'}>
        <Highlight className={lang + ' ' + className}>{children}</Highlight>
      </Box>
    </Stack>
  );
};

const CustomMarkdown: FC<{
  children: string;
}> = (props) => {
  return useMemo(
    () => (
      <>
        <ReactMarkdown
          remarkPlugins={[supersub, remarkBreaks, remarkGfm]}
          // rehypePlugins={[
          //   rehypeKatex,
          //   [rehypeHighlight, { detect: true, ignoreMissing: true }],
          // ]}
          disallowedElements={['br']}
          components={{
            // eslint-disable-next-line react/display-name
            h1: (props: any) => {
              return <OverrideHeading {...props} heading={'h1'} />;
            },
            // eslint-disable-next-line react/display-name
            h2: (props: any) => {
              return <OverrideHeading {...props} heading={'h2'} />;
            },
            // eslint-disable-next-line react/display-name
            h3: (props: any) => {
              return <OverrideHeading {...props} heading={'h3'} />;
            },
            // eslint-disable-next-line react/display-name
            h4: (props: any) => {
              return <OverrideHeading {...props} heading={'h4'} />;
            },
            // eslint-disable-next-line react/display-name
            h5: (props: any) => {
              return <OverrideHeading {...props} heading={'h5'} />;
            },
            // eslint-disable-next-line react/display-name
            h6: (props: any) => {
              return <OverrideHeading {...props} heading={'h6'} />;
            },
            // eslint-disable-next-line react/display-name
            a: ({ node, ...props }) => {
              return (
                // eslint-disable-next-line react/prop-types
                <OverrideAnchor href={props.href} title={props.title}>
                  {props.children}
                </OverrideAnchor>
              );
            },
            // eslint-disable-next-line react/display-name
            code: ({ node, inline, className, children, ...props }) => {
              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
              return (
                <OverrideCode className={className}>{children}</OverrideCode>
              );
            },
            // eslint-disable-next-line react/display-name
            img: ({ node, src, alt, title, ...props }) => {
              let data: any = {};
              try {
                // 传输Markdown自定义数据
                data = JSON.parse(alt || '');
              } catch (e) {
                // nothing
              }
              if (src) {
                // check is YouTube embed url
                if (src.startsWith('https://www.youtube.com/embed')) {
                  return (
                    <YoutubePlayerBox youtubeLink={src} borderRadius={4} />
                  );
                }
              }

              return <img {...{ src, alt: data?.alt || alt || '', title }} />;
            },
          }}
        >
          {props.children}
        </ReactMarkdown>
      </>
    ),
    [props.children],
  );
};
export default CustomMarkdown;
