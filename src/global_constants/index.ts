// SERVICE
export const SWR_ERR_RETRY_COUNT = 3; // max error retry count
export const SWR_ERR_MSG = 'An error occurred while fetching the data.';
export const API_VERSION = '1';
export const USER_AGENT = 'simply node ssr 1.0';
export const GUEST_USER_MODE = 'GUEST_USER_MODE';

export const APP_IS_PROD = process.env.NEXT_PUBLIC_ENV === 'pro';

// External Links
export const APP_EXTERNAL_LINKS = {
  QUORA: 'https://www.quora.com/profile/Simply-Trends',
  TWITTER: 'https://twitter.com/MaxAI_HQ',
  FACEBOOK: 'https://www.facebook.com/SimplyTrendsOfficial',
  FACEBOOK_GROUP: 'https://www.facebook.com/groups/448979866591588',
  INSTAGRAM: 'https://www.instagram.com/simplytrendsofficial',
  YOUTUBE: 'https://www.youtube.com/channel/UC26w7hjL5_FPeMUt2Dz_uDg',
  PINTEREST: 'https://www.pinterest.com/SimplyTrendsOfficial/',
  TIKTOK: 'https://www.tiktok.com/@simplytrendsofficial',
  CHROME_EXTENSION:
    'https://chrome.google.com/webstore/detail/maxaime-1-click-ai-powere/mhnlakgilnojmhinhkckjpncpbhabphi',

  EDGE_EXTENSION:
    'https://microsoftedge.microsoft.com/addons/detail/maxaime-use-chatgpt-ai-/ngphehpfehdmjellohmlojkplilekadg',

  TWITTER_FOLLOW_UP_LINK:
    'https://twitter.com/intent/follow?screen_name=MaxAI_HQ',

  CHATGPT: 'https://chat.openai.com/',

  WEBCHATGPT_CHROME_EXTENSION:
    'https://chrome.google.com/webstore/detail/webchatgpt-chatgpt-with-i/lpfemeioodjbpieminkklglpmhlngfcn',
};

// S3
export const AWS_S3_BUCKET_HOSTNAME = 'https://images.simplytrends.co';

// Doc
export const TOTAL_SHOPIFY_STORE_COUNT = '2M';
// project link
export const WWW_PROJECT_LINK =
  process.env.NEXT_PUBLIC_WWW_PROJECT_HOST ?? 'https://www.maxai.me';
export const APP_PROJECT_LINK =
  process.env.NEXT_PUBLIC_APP_PROJECT_HOST ?? 'https://app.maxai.me';
export const SIMPLY_TRENDS_APP_LINK = 'https://app.simplytrends.co';
export const SIMPLY_TRENDS_APP_EMAIL = 'hello@maxai.me';
export const SIMPLY_TRENDS_DEMOPAGE_LINK = 'https://www.simplytrends.co';
export const SIMPLY_TRENDS_DEMOPAGE_LINK_DEV =
  'https://demopage-dev.simplysourcing.net';
export const SIMPLY_TRENDS_DEMOPAGE_LINK_MAIN =
  'https://demopage-main.simplysourcing.net';

// s3
export const RESOURCES_URL = 'https://resources.usechatgpt.ai';

// AD
export const AD_BLOG_SIMPLY_TRENDS_PNG =
  'https://images.simplytrends.co/assets/images/ad/blog/simply_trends.png';

export const AD_BLOG_CHROME_EXTENSION_PNG =
  'https://images.simplytrends.co/assets/images/ad/blog/chrome_extension.png';

export const QUOTA_TEXT = 'Free AI without a daily limit';

export const EXTENSION_INSTALL_TRACKER_LINK = `https://api.maxai.me/app/install`;

// 这些改为直接跳转具体的 chrome 或者 edge 的安装连接，这样能增加跳转成功率（我们自己的api在有些国家不一定能打开，而且慢） - 2024-05-15 - @huangsong
// export const EXTENSION_SHARE_TRACKER_LINK =
//   'https://api.maxai.me/app/maxai-ext';
// export const EXTENSION_EDGE_SHARE_TRACKER_LINK =
//   'https://api.maxai.me/app/maxai-edge';
export const EXTENSION_SHARE_TRACKER_LINK =
  APP_EXTERNAL_LINKS['CHROME_EXTENSION'];
export const EXTENSION_EDGE_SHARE_TRACKER_LINK =
  APP_EXTERNAL_LINKS['EDGE_EXTENSION'];

export const MAXAI_WWW_SHARE_TRACKER_LINK = WWW_PROJECT_LINK;

// export const MAXAI_WWW_PROMPT_SHARE_TRACKER_LINK =
//   'https://api.maxai.me/app/prompts-web';

// prompt library 代理容器的 base path
export const PROMPT_LIBRARY_PROXY_BASE_PATH = '/prompt';

// 需要针对被代理的 basePath 进行处理
export const SUPPORT_PROXY_BASE_PATHS = [
  PROMPT_LIBRARY_PROXY_BASE_PATH,
] as const;
