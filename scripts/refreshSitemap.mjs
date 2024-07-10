import axios from 'axios'
import fs from 'fs'
import path from 'path'

import nextConfig from '../next.config.js'
import languageCodeMap from '../src/packages/common/constants/languageCodeMap.json' assert { type: 'json' }
import pdfToolsCodeMap from '../src/page_components/PdfToolsPages/constant/pdfToolsCodeMap.json' assert { type: 'json' }

const IS_PROD = false

const pagesDirectory = 'src/pages'
const sitemapAssetsPath = './public/sitemap.xml' // sitemap 文件的存储路径
const wwwDomain = 'https://www.maxai.me'
const chatpdfUrls = ['/tools/chatpdf']

// prompt library 的代理路径
const PROMPT_LIBRARY_PROXY_BASE_PATH = '/prompt'

// 判断当前 file 是否需要插入到 sitemap
function checkDoNeedToGenerateSitemap(file) {
  // 需要排除的 目录或文件 的正则表达式
  const excludePattern = [
    /_app/,
    /_document/,
    /\[locale\]/,
    /embed/,
    /api/,
    /partners/,
    /install/,
    /partner-referral/,
    /release-notes/,
    /share/,
    /survey/,
    /dev/,
    /email-unsubscribe-success/,
    /\.DS_Store/,
  ]
  return !excludePattern.some((pattern) => pattern.test(file))
}

function generateStaticPagesWithLocale(pagePaths) {
  // 过滤一些 没有 i18n routing 的页面
  const excludePaths = ['/partners', '/install']
  const fixPagePaths = pagePaths.filter((page) => !excludePaths.includes(page))

  const localeCode = Object.keys(languageCodeMap)
  const pageWithLocale = []
  localeCode.forEach((locale) => {
    fixPagePaths.forEach((path) => {
      pageWithLocale.push(`/${locale}${path}`)
    })
  })

  return pageWithLocale
}

// 递归遍历目录
function crawlStaticDirectory(dir) {
  // 用于存储页面路径的数组
  const staticPages = []
  const files = fs.readdirSync(dir)

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (
      // 特殊文件或目录
      !checkDoNeedToGenerateSitemap(file) ||
      // 动态路由不需要这里处理
      file.startsWith('[') ||
      // prompts 目录不需要这里处理
      file === 'prompts'
    ) {
      continue
    }

    if (stat.isDirectory()) {
      staticPages.push(...crawlStaticDirectory(filePath))
    } else {
      // 将文件路径转换为网址路径，并添加到 pages 数组
      const fixedFilePath = filePath
        .replace(pagesDirectory, '')
        .replace('.js', '')
        .replace('.jsx', '')
        .replace('.tsx', '')
        .replace('/index', '')

      staticPages.push(fixedFilePath)
    }
  }

  console.log(`
  \x1b[32m staticPages: ${staticPages.length} \x1b[0m,
`)
  return staticPages
}

// 获取 prompts 页面
async function generatePromptsPages() {
  const promptDetailPathnamePrefix = `/library`

  // 默认存在 prompt library 首页页面
  let promptPages = [`/library`]

  const listApiGetAllData = async (
    listApiFetcher,
    startPage = 0,
    pageSize = 100,
  ) => {
    const totalData = []
    let page = startPage
    const listApiResponse = await listApiFetcher(page, pageSize)
    let data = listApiResponse.data
    while (data && data.data && data.data.length > 0) {
      totalData.push(...data.data)
      page++
      const listApiResponse = await listApiFetcher(page, pageSize)
      data = listApiResponse.data
    }
    return totalData
  }

  try {
    const PROMPTS_API = `https://api.maxai.me/prompt/search_prompt`

    const promptList = await listApiGetAllData(
      (page, page_size) =>
        axios.post(PROMPTS_API, {
          page,
          page_size,
        }),
      0,
    )

    promptList.forEach((prompt) => {
      promptPages.push(`${promptDetailPathnamePrefix}/${prompt.id}`)
    })

    promptPages.push(...generateStaticPagesWithLocale(promptPages))

    promptPages = promptPages.map((page) => {
      return `${PROMPT_LIBRARY_PROXY_BASE_PATH}${page}`
    })

    return promptPages
  } catch (error) {
    console.log(`generatePromptsPages ERROR:`, error)
  }
}

async function generateToolsPages() {
  const toolsPages = Object.keys(pdfToolsCodeMap.childrenObject).map(
    (url) => `/${pdfToolsCodeMap.topUrlKey}/${url}`,
  )

  return toolsPages.concat(generateStaticPagesWithLocale(toolsPages))
}

function addHrefLangToSitemap(propPath) {
  const excludePaths = ['/tools/chatpdf']
  if (excludePaths.some((excludePath) => propPath.includes(excludePath))) {
    return ''
  }

  // const localeCodes = Object.keys(languageCodeMap)
  const localeCodes = ['zh-CN', 'en-US']

  // 删除 url 上的 locale
  const inUrlLocale = localeCodes.find((locale) =>
    propPath.includes(`/${locale}/`),
  )
  const url = propPath.replace(`/${inUrlLocale}`, '')

  let hrefLangs = `<xhtml:link rel="alternate" hreflang="x-default" href="${wwwDomain}${url}" />`

  if (propPath.startsWith(PROMPT_LIBRARY_PROXY_BASE_PATH)) {
    const pathname = url.replace(PROMPT_LIBRARY_PROXY_BASE_PATH, '')

    localeCodes.forEach((locale) => {
      hrefLangs += `<xhtml:link rel="alternate" hreflang="${locale}" href="${wwwDomain}${PROMPT_LIBRARY_PROXY_BASE_PATH}/${locale}${pathname}" />`
    })
  } else {
    localeCodes.forEach((locale) => {
      hrefLangs += `<xhtml:link rel="alternate" hreflang="${locale}" href="${wwwDomain}/${locale}${url}" />`
    })
  }

  return hrefLangs
}

// 生成 sitemap
function generateSitemap(pages) {
  const date = new Date()
  const isoString = date.toISOString()

  let urlTagString = ``
  let sitemapContentTemplate = ``

  if (IS_PROD) {
    sitemapContentTemplate = `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{{TEMPLATE}}</urlset>`
    pages.forEach((page) => {
      if (page) {
        const currentPageHrefLangText = addHrefLangToSitemap(page)
        console.log(`currentPageHrefLangText`, currentPageHrefLangText)
        console.log(`page`, page)
        urlTagString += `<url><loc>${wwwDomain}${page}</loc>${currentPageHrefLangText}<changefreq>daily</changefreq><lastmod>${isoString}</lastmod></url>`
      }
    })
  } else {
    sitemapContentTemplate = `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{{TEMPLATE}}
</urlset>`

    pages.forEach((page) => {
      const currentPageHrefLangText = addHrefLangToSitemap(page)
      console.log(`currentPageHrefLangText`, currentPageHrefLangText)
      console.log(`page`, page)
      urlTagString += `<url>
  <loc>${wwwDomain}${page}</loc>
  ${currentPageHrefLangText}
  <changefreq>daily</changefreq>
  <lastmod>${isoString}</lastmod>
</url>
`
    })
  }

  sitemapContentTemplate = sitemapContentTemplate.replace(
    '{{TEMPLATE}}',
    urlTagString,
  )

  // 检查文件是否存在
  if (fs.existsSync(sitemapAssetsPath)) {
    // 文件存在，先删除
    fs.unlinkSync(sitemapAssetsPath)
  }

  fs.writeFileSync(sitemapAssetsPath, sitemapContentTemplate)
}

function fixPagesTrailingSlash(pages) {
  // 不需要 尾斜杠的页面
  const excludePaths = ['/prompt', '/tools/chatpdf']
  let responsePages = [...pages]
  // 如果开启了 trailingSlash，需要将所有页面的末尾添加 /
  if (nextConfig.trailingSlash) {
    responsePages = responsePages.map((page) => {
      if (excludePaths.every((excludePath) => !page.includes(excludePath))) {
        return page.endsWith('/') ? page : page + '/'
      }
      return page
    })
  }
  return responsePages
}

async function main() {
  try {
    // 记录用时
    const startTime = new Date().getTime()
    let allPages = []

    allPages.push(...crawlStaticDirectory(pagesDirectory))
    allPages.push(
      ...generateStaticPagesWithLocale(
        // partners 页面没有 i18n routing, 所以这里需要过滤掉
        allPages.filter((page) => !page.startsWith('/partners')),
      ),
    )
    allPages.push(...(await generateToolsPages()))
    allPages.push(...(await generatePromptsPages()))
    allPages.push(...chatpdfUrls)

    generateSitemap(fixPagesTrailingSlash(allPages))

    console.log(`
  \x1b[32m Sitemap generated successfully! \x1b[0m,
  \x1b[32m Time taken: ${(new Date().getTime() - startTime) / 1000}s \x1b[0m
`)
  } catch (error) {
    console.error(`ERROR:`, error)
  }
}
main()
