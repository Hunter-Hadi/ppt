import {
  Box,
  BoxProps,
  Stack,
  Tooltip as MuiTooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import React, { FC, useState } from 'react';

import DevContent from '@/components/DevContent';
import { getLocalStorage } from '@/utils/localStorage';

// import { LightTooltip } from '@src/components/Tooltip';
const GaContentIsOpen = getLocalStorage('GaContent') === 'true';

const GA_LOG_STYLE = 'color: rgb(249, 171, 0);font-size: 1.2em';

export const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
    backgroundColor: '#f9ab00',
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    '& .MuiTooltip-arrow': {
      color: '#f9ab00',
    },
  },
}));

/* eslint-disable */
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
export const GA_TRACKING_ID_CRX = process.env.NEXT_PUBLIC_GA_ID_CRX;
export const UA_TRACKING_ID = process.env.NEXT_PUBLIC_UA_ID;
export const AW_CONVERSION_ID = process.env.NEXT_PUBLIC_AW_CONVERSION_ID;
export const AW_CONVERSION_SEND_TO_ID =
  process.env.NEXT_PUBLIC_AW_CONVERSION_SEND_TO_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const pageview = (url: string) => {
  (window as any).gtag('config', `${GA_TRACKING_ID}`, {
    page_path: url,
  });
};

// doc: https://ikjt09m6ta.larksuite.com/docs/docusH3NqbWqhXESZiopljZWKyY#aumet0

// 由于 GA 会有参数上限限制，在添加新的参数时请先询问确认是否添加的参数已达上限。
export interface gaEventType {
  eventName?: string;
  params?:
    | {
        /**
         * `data.id`
         */
        id?: string | string[] | undefined;
        type?: string | string[] | undefined;
        keyword?: string | string[] | undefined;
        /**
         * `router.pathname`
         */
        page_path?: string | string[] | undefined;
        /**
         * `router.pathname`
         */
        link?: string | string[] | undefined;
        /**
         * `collect.list.name`
         */
        list?: string | string[] | undefined;
        value?: unknown;
        page_query?: unknown;
        name?: unknown;
        filesize?: number;
        maxlength_error?: boolean;
        select_all?: boolean;
        email?: string;
        position?: string;
        non_interaction?: boolean;
        send_to?: string;
        isPageOpen?: boolean;
        ref: string;
      }
    | never;
}

export const gaEvent = ({ eventName = '', params }: gaEventType) => {
  let gaParams = params;
  if (typeof (window as any)?.gtag !== 'undefined') {
    (window as any).gtag('event', eventName, gaParams);
  }
};

/**
 *
 * @param action ga 触发动作 click | hover
 * @param eventName ga 事件名称
 * @param params ga 上报的额外参数, 如果传 boolean 则会认为 autoSend
 * @param autoSend 是否自动触发gaEvent
 * @returns
 */
export const generateGaEvent = (
  action: 'click' | 'hover',
  eventName: string,
  params?: gaEventType['params'] | boolean,
  autoSend = false,
): gaEventType => {
  const send = typeof params === 'boolean' ? params : autoSend;
  const page_path =
    typeof window !== 'undefined' ? window.location.pathname : '';
  const paramsExtend =
    typeof params === 'object'
      ? {
          page_path,
          ...params,
        }
      : { page_path };
  const eventParams = {
    eventName: `${getGaPrefix()}_${action}_${eventName}`,
    params: paramsExtend,
  };
  if (send) {
    gaEvent(eventParams);
  }
  return eventParams;
};

export const getGaPrefix = () => {
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    const pathnameArr = pathname.split('/');
    return pathnameArr[1] === '' ? 'langdingPage' : pathnameArr[1];
  } else {
    return '';
  }
};

const proxyChildrenWithClick = (
  children: React.ReactNode | undefined,
  type: 'click' | 'hover',
  autoGenerateGa: boolean,
  updateGaEventName: (newGaEventName: string) => void,
  onTrigger?: () => void,
) => {
  if (!children) return React.createElement(React.Fragment, {});
  const actionEventMap = {
    click: 'onClick',
    hover: 'onMouseEnter',
  };
  const eventKey = actionEventMap[type];
  return React.Children.map(children, (child: any) => {
    let text = '';
    if (autoGenerateGa) {
      const getNodeText = (node: any): any => {
        if (['string', 'number'].includes(typeof node)) return node;
        if (node instanceof Array) return node.map(getNodeText).join('');
        if (typeof node === 'object' && node)
          return getNodeText(node.props.children);
      };
      if (typeof child === 'string') {
        text = child;
      } else {
        text = getNodeText(child);
      }
      if (text === undefined) {
        text = (
          child.props.label ||
          child.props.text ||
          child.props.value
        ).toString();
      }
      text = text.toLowerCase().replace(/\s/g, '_');
      if (
        child?.props &&
        Object.prototype.hasOwnProperty.call(child.props, 'disableElevation')
      ) {
        text += '_button';
      }
      if (
        child?.props &&
        (Object.prototype.hasOwnProperty.call(child.props, 'href') ||
          Object.prototype.hasOwnProperty.call(child.props, 'link') ||
          Object.prototype.hasOwnProperty.call(child.props, 'externalLink'))
      ) {
        text += '_link';
      }
      updateGaEventName(text);
      // console.log('ga!!!!: \t', text, child);
    }
    return React.isValidElement<any>(child)
      ? React.cloneElement(child, {
          [eventKey]: () => {
            onTrigger && onTrigger();
            if (child.props && child.props[eventKey]) {
              child.props[eventKey]();
            }
          },
        })
      : React.createElement(
          'span',
          {
            [eventKey]: () => onTrigger && onTrigger(),
          },
          child,
        );
  });
};

export const GaContent: FC<
  {
    children?: React.ReactNode;
    /**
     * gaEvent 参数的内容将会在UI上展示
     */
    gaEvent?: gaEventType;
    /**
     * boxClickAutoSend 如果为true 则会在 GaContent Box 添加点击事件 自动发送 ga
     * 如果 gaevent 触发情况复杂 比如 select、input、checkbox、switch
     * 不建议用这个 boxClickAutoSend 建议用 gaEvent function 手动触发
     */
    boxClickAutoSend?: boolean;
    onClick?: () => void;
  } & BoxProps
> = ({
  gaEvent: gaEventParams,
  children,
  onClick,
  boxClickAutoSend = false,
  ...porps
}) => {
  if (!GaContentIsOpen) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  const handleClick = () => {
    if (boxClickAutoSend && gaEventParams) {
      gaEvent(gaEventParams);
    }
    onClick && onClick();
  };

  const [showBoundary, setShowBoundary] = useState(false);

  return (
    <Box
      sx={{
        position: 'relative',
      }}
      component='span'
      onClickCapture={handleClick}
      className='ga-content'
      {...porps}
    >
      {children}
      <DevContent>
        {showBoundary && <GaContentBoundary />}
        <GaContentLightTooltip
          setShowBoundary={setShowBoundary}
          eventName={gaEventParams?.eventName}
          params={gaEventParams?.params}
        />
      </DevContent>
    </Box>
  );
};

const GaContentLightTooltip = (props: {
  setShowBoundary: (flag: boolean) => void;
  eventName?: string;
  params?: gaEventType['params'];
}) => {
  const { setShowBoundary, eventName = '', params = {} } = props;
  return (
    <LightTooltip
      sx={{ zIndex: (t) => t.zIndex.modal + 500 }}
      title={
        <Stack spacing={1.5} sx={{ maxWidth: 400 }}>
          <Box>
            <Typography variant='body2'>EventName:</Typography>
            <Typography variant='body1'>
              <strong>{eventName}</strong>
            </Typography>
          </Box>
          <Box>
            <Typography variant='body2'>Params:</Typography>
            <Typography variant='body1'>
              <strong>{JSON.stringify(params)}</strong>
            </Typography>
          </Box>
        </Stack>
      }
      placement='bottom'
      arrow
    >
      <Box
        onMouseEnter={() => setShowBoundary(true)}
        onMouseLeave={() => setShowBoundary(false)}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 2,
          width: 12,
          height: 12,
          backgroundColor: '#f9ab00',
          borderRadius: '100%',
          filter: 'blur(1px)',
        }}
      ></Box>
    </LightTooltip>
  );
};

const GaContentBoundary = () => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#f9ab00',
      opacity: 0.4,
      pointerEvents: 'none',
    }}
  ></Box>
);
