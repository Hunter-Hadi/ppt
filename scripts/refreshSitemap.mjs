import axios from 'axios';
import fs from 'fs';
import path from 'path';

import languageCodeMap from '../src/i18n/types/languageCodeMap.json' assert { type: 'json' };

const IS_PROD = true;

const pagesDirectory = 'src/pages';
const sitemapAssetsPath = './public/sitemap.xml'; // sitemap 文件的存储路径
const domain = 'http://www.maxai.me'; // 替换成你的域名

// 排除的目录或文件
const excludePattern = /(_app|_document|\[locale\]|embed|api)/;

function generateStaticPagesWithLocale(pagePaths) {
  // 过滤一些 没有 i18n routing 的页面
  const excludePaths = ['/partners', '/install'];
  const fixPagePaths = pagePaths.filter((page) => !excludePaths.includes(page));

  const localeCode = Object.keys(languageCodeMap);
  const pageWithLocale = [];
  localeCode.forEach((locale) => {
    fixPagePaths.forEach((path) => {
      pageWithLocale.push(`/${locale}${path}`);
    });
  });

  return pageWithLocale;
}

// 递归遍历目录
function crawlStaticDirectory(dir) {
  // 用于存储页面路径的数组
  const staticPages = [];
  const files = fs.readdirSync(dir);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (
      // 特殊文件或目录
      excludePattern.test(file) ||
      // 动态路由不需要这里处理
      file.startsWith('[') ||
      // prompts 目录不需要这里处理
      file === 'prompts'
    ) {
      continue;
    }

    if (stat.isDirectory()) {
      staticPages.push(...crawlStaticDirectory(filePath));
    } else {
      // 将文件路径转换为网址路径，并添加到 pages 数组
      const fixedFilePath = filePath
        .replace(pagesDirectory, '')
        .replace('.js', '')
        .replace('.jsx', '')
        .replace('.tsx', '')
        .replace('/index', '');

      staticPages.push(fixedFilePath);
    }
  }

  return staticPages;
}

async function generatePromptsPages() {
  // 注意这里的 PROMPT_LIBRARY_PROXY_BASE_PATH
  const PROMPT_LIBRARY_PROXY_BASE_PATH = '/prompt';
  const promptDetailPathnamePrefix = `/library`;

  // 默认存在 prompt library 首页页面
  let promptPages = [`/library`];

  const listApiGetAllData = async (
    listApiFetcher,
    startPage = 0,
    pageSize = 100,
  ) => {
    const totalData = [];
    let page = startPage;
    const listApiResponse = await listApiFetcher(page, pageSize);
    let data = listApiResponse.data;
    while (data && data.data && data.data.length > 0) {
      totalData.push(...data.data);
      page++;
      const listApiResponse = await listApiFetcher(page, pageSize);
      data = listApiResponse.data;
    }
    return totalData;
  };

  try {
    const PROMPTS_API = `https://api.maxai.me/prompt/search_prompt`;

    const promptList = await listApiGetAllData(
      (page, page_size) =>
        axios.post(PROMPTS_API, {
          page,
          page_size,
        }),
      0,
    );

    promptList.forEach((prompt) => {
      promptPages.push(`${promptDetailPathnamePrefix}/${prompt.id}`);
    });

    promptPages.push(...generateStaticPagesWithLocale(promptPages));

    promptPages = promptPages.map((page) => {
      return `${PROMPT_LIBRARY_PROXY_BASE_PATH}${page}`;
    });

    return promptPages;
  } catch (error) {
    console.log(`generatePromptsPages ERROR:`, error);
  }
}
// 生成 sitemap
function generateSitemap(pages) {
  const date = new Date();
  const isoString = date.toISOString();

  let urlTagString = ``;
  let sitemapContentTemplate = ``;

  if (IS_PROD) {
    sitemapContentTemplate = `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{{TEMPLATE}}</urlset>`;
    pages.forEach((page) => {
      urlTagString += `<url><loc>${domain}${page}</loc><changefreq>daily</changefreq><lastmod>${isoString}</lastmod></url>`;
    });
  } else {
    sitemapContentTemplate = `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{{TEMPLATE}}
</urlset>`;

    pages.forEach((page) => {
      urlTagString += `<url>
  <loc>${domain}${page}</loc>
  <changefreq>daily</changefreq>
  <lastmod>${isoString}</lastmod>
</url>
`;
    });
  }

  sitemapContentTemplate = sitemapContentTemplate.replace(
    '{{TEMPLATE}}',
    urlTagString,
  );

  // 检查文件是否存在
  if (fs.existsSync(sitemapAssetsPath)) {
    // 文件存在，先删除
    fs.unlinkSync(sitemapAssetsPath);
  }

  fs.writeFileSync(sitemapAssetsPath, sitemapContentTemplate);
}

try {
  let allPages = [];

  allPages.push(...crawlStaticDirectory(pagesDirectory));
  allPages.push(
    ...generateStaticPagesWithLocale(
      // partners 页面没有 i18n routing, 所以这里需要过滤掉
      allPages.filter((page) => !page.startsWith('/partners')),
    ),
  );
  allPages.push(...(await generatePromptsPages()));
  generateSitemap(allPages);

  console.log(`
  \x1b[32m Sitemap generated successfully! \x1b[0m
`);
} catch (error) {
  console.error(`ERROR:`, error);
}
