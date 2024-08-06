import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import nextConfig from '../next.config.js'
import languageCodeMap from '../src/packages/common/constants/languageCodeMap.json' assert { type: 'json' }
import pdfToolsCodeMap from '../src/page_components/PdfToolsPages/constant/pdfToolsCodeMap.json' assert { type: 'json' }
import pdfToolsKeyI18nMap from '../src/page_components/PdfToolsPages/constant/pdfToolsKeyI18nMap.json' assert { type: 'json' }

const localeCode = Object.keys(languageCodeMap)

const IS_DEBUG = false

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const pagesDirectory = 'src/pages'
const sitemapDirectory = 'sitemap-temp'
const wwwDomain = 'https://www.maxai.me'
const sxAssetsUrl = 'https://assets.maxai.me'

// prompt library 的代理路径
const PROMPT_LIBRARY_PROXY_BASE_PATH = '/prompt'
// chat pdf 的代理路径
const CHAT_PDF_PROXY_BASE_PATH = '/ai-tools/chat-with-pdf'
// web search 的代理路径
const AI_SEARCH_PROXY_BASE_PATH = '/ai-tools/search'

const chatpdfUrls = ['/ai-tools/chat-with-pdf']
const aiSearchUrls = ['/ai-tools/search']

function log(text) {
  console.log(`
  \x1b[32m ${text} \x1b[0m`)
}

/**
 * 保存所有 urls 的 log
 */
let pageUrlsLogCache = []
function generateUrlsLog(removeLocale = true) {
  const saveFilePath = path.join(__dirname, '../sitemap-temp/urls.txt')

  // 如果文件存在则删除
  if (fs.existsSync(saveFilePath)) {
    fs.unlinkSync(saveFilePath)
  }

  let pageUrls = pageUrlsLogCache

  if (removeLocale) {
    // 过滤掉包含 locale 的 url
    pageUrls = pageUrls.filter((url) => {
      return !localeCode.some((locale) => url.includes(`/${locale}/`))
    })
  }

  // 创建并写入新的文件
  fs.writeFileSync(saveFilePath, pageUrls.join('\n'), 'utf8')
}

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
    /404/,
    /email-unsubscribe-success/,
    // 测试页面
    /486e5db3-0853-4763-ac9f-315064d83577/,
    /\.DS_Store/,
  ]
  return !excludePattern.some((pattern) => pattern.test(file))
}

function generateStaticPagesWithLocale(pagePaths) {
  // 过滤一些 没有 i18n routing 的页面
  const excludePaths = ['/partners', '/install']
  const fixPagePaths = pagePaths.filter((page) => !excludePaths.includes(page))

  const pageWithLocale = []
  localeCode.forEach((locale) => {
    fixPagePaths.forEach((path) => {
      if (
        path.startsWith(CHAT_PDF_PROXY_BASE_PATH) ||
        path.startsWith(AI_SEARCH_PROXY_BASE_PATH)
      ) {
        pageWithLocale.push(`${path}/${locale}`)
      } else {
        pageWithLocale.push(`/${locale}${path}`)
      }
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

// 获取 pdf tools 页面
async function generatePdfToolsPages() {
  const pdfToolsPages = []
  Object.keys(pdfToolsKeyI18nMap).forEach((pdfToolKey) => {
    localeCode.forEach((locale) => {
      pdfToolsPages.push(
        `/${locale}/${pdfToolsCodeMap.topUrlKey}/${pdfToolsKeyI18nMap[pdfToolKey][locale]}`,
      )
    })
  })
  return pdfToolsPages
}
// ==== pdf tools utils start ====
/**
 * 传入 任意语言 pdfToolKey 和 currentLocale 获取 指定语言版本的 pdfToolKey
 * @param enPdfToolKey
 * @param locale
 * @returns string
 */
const getPdfToolKeyWithLocale = (
  anyLangPdfToolKey,
  currentLocale = 'en',
  targetLocale = 'en',
) => {
  const enPdfToolKey = findEnPdfToolKeyWithLocale(
    anyLangPdfToolKey,
    currentLocale,
  )
  if (enPdfToolKey) {
    return pdfToolsKeyI18nMap[enPdfToolKey][targetLocale]
  }

  return null
}
/**
 * 传入 翻译后的 pdfToolKey 和 currentLocale 获取对应的 en pdfToolKey
 * @param anyLangPdfToolKey
 * @param locale
 * @returns string | null
 */
const findEnPdfToolKeyWithLocale = (
  anyLangPdfToolKey,
  currentLocale = 'en',
) => {
  const pdfToolKeys = Object.keys(pdfToolsKeyI18nMap)

  for (let i = 0; i < pdfToolKeys.length; i++) {
    const enPdfToolKey = pdfToolKeys[i]
    if (pdfToolsKeyI18nMap[enPdfToolKey][currentLocale] === anyLangPdfToolKey) {
      return enPdfToolKey
    }
  }

  return null
}
// ==== pdf tools utils end ====

// 生成 docs (wordpress) 页面
async function generateDocsPages() {
  const docsPages = [
    '/docs/help/',
    '/docs/help/getting-started/',
    '/docs/help/getting-started/what-is-maxai-me/',
    '/docs/help/getting-started/getting-started-with-maxai-me/',
    '/docs/help/key-features/',
    '/docs/help/key-features/ai-chat/',
    '/docs/help/key-features/ai-rewriter/',
    '/docs/help/key-features/ai-summary/',
    '/docs/help/key-features/ai-instant-reply/',
    '/docs/help/key-features/ai-reading-assistant/',
    '/docs/help/key-features/ai-prompt-library/',
    '/docs/help/key-features/ai-search/',
    '/docs/help/key-features/ai-art/',
    '/docs/help/key-features/ai-translator/',
    '/docs/help/key-features/ai-vision/',
    '/docs/help/my-own-prompts/',
    '/docs/help/my-own-prompts/prompt-in-context-menu/',
    '/docs/help/my-own-prompts/prompt-in-the-instant-reply-menu/',
    '/docs/help/my-own-prompts/prompt-in-the-summary-menu/',
    '/docs/help/my-own-prompts/add-prompt-template-to-prompt-library/',
    '/docs/',
  ]
  return docsPages
}

function addHrefLangToSitemap(propPath) {
  const localeCodes = Object.keys(languageCodeMap)

  // 删除 url 上的 locale
  const inUrlLocale = localeCodes.find((locale) =>
    propPath.includes(`/${locale}/`),
  )
  const url = propPath.replace(`/${inUrlLocale}`, '')

  let hrefLangs = `<xhtml:link rel="alternate" hreflang="x-default" href="${wwwDomain}${url}" />`

  if (propPath.startsWith(CHAT_PDF_PROXY_BASE_PATH)) {
    localeCodes.forEach((locale) => {
      hrefLangs += `<xhtml:link rel="alternate" hreflang="${locale}" href="${wwwDomain}${CHAT_PDF_PROXY_BASE_PATH}/${locale}" />${
        IS_DEBUG ? '\n' : ''
      }`
    })
  } else if (propPath.startsWith(AI_SEARCH_PROXY_BASE_PATH)) {
    localeCodes.forEach((locale) => {
      hrefLangs += `<xhtml:link rel="alternate" hreflang="${locale}" href="${wwwDomain}${AI_SEARCH_PROXY_BASE_PATH}/${locale}" />${
        IS_DEBUG ? '\n' : ''
      }`
    })
  } else if (propPath.startsWith(PROMPT_LIBRARY_PROXY_BASE_PATH)) {
    const pathname = url.replace(PROMPT_LIBRARY_PROXY_BASE_PATH, '')

    localeCodes.forEach((locale) => {
      hrefLangs += `<xhtml:link rel="alternate" hreflang="${locale}" href="${wwwDomain}${PROMPT_LIBRARY_PROXY_BASE_PATH}/${locale}${pathname}" />${
        IS_DEBUG ? '\n' : ''
      }`
    })
  } else if (url.startsWith(`/${pdfToolsCodeMap.topUrlKey}`)) {
    const pdfToolKey = url.split('/')[2]
    const enPdfToolKey = findEnPdfToolKeyWithLocale(pdfToolKey, inUrlLocale)
    if (pdfToolKey) {
      hrefLangs = ''
      hrefLangs += `<xhtml:link rel="alternate" hreflang="x-default" href="${wwwDomain}/${pdfToolsCodeMap.topUrlKey}/${enPdfToolKey}/" />`
      localeCodes.forEach((locale) => {
        hrefLangs += `<xhtml:link rel="alternate" hreflang="${locale}" href="${wwwDomain}/${locale}/${
          pdfToolsCodeMap.topUrlKey
        }/${getPdfToolKeyWithLocale(enPdfToolKey, 'en', locale)}/" />${
          IS_DEBUG ? '\n' : ''
        }`
      })
    } else {
      localeCodes.forEach((locale) => {
        hrefLangs += `<xhtml:link rel="alternate" hreflang="${locale}" href="${wwwDomain}/${locale}${url}" />${
          IS_DEBUG ? '\n' : ''
        }`
      })
    }
  } else {
    localeCodes.forEach((locale) => {
      hrefLangs += `<xhtml:link rel="alternate" hreflang="${locale}" href="${wwwDomain}/${locale}${url}" />${
        IS_DEBUG ? '\n' : ''
      }`
    })
  }

  return hrefLangs
}

// 生成 sitemap
function generateSitemap(
  allPages,
  targetFilename,
  maxUrlCountSingleFile = null,
) {
  const date = new Date()
  const isoString = date.toISOString()
  const writingSitemap = (pages, targetFilePath) => {
    let urlTagString = ``
    let sitemapContentTemplate = ``

    if (!IS_DEBUG) {
      sitemapContentTemplate = `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.w3.org/1999/xhtml http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd" xmlns:xhtml="http://www.w3.org/1999/xhtml">{{TEMPLATE}}</urlset>`
      pages.forEach((page) => {
        if (page) {
          pageUrlsLogCache.push(`${wwwDomain}${page}`)
          const currentPageHrefLangText = addHrefLangToSitemap(page)
          urlTagString += `<url><loc>${wwwDomain}${page}</loc>${currentPageHrefLangText}<lastmod>${isoString}</lastmod></url>`
        }
      })
    } else {
      sitemapContentTemplate = `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.w3.org/1999/xhtml http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd" 
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
{{TEMPLATE}}
</urlset>`

      pages.forEach((page) => {
        if (page) {
          const currentPageHrefLangText = addHrefLangToSitemap(page)
          pageUrlsLogCache.push(`${wwwDomain}${page}`)
          urlTagString += `<url>
  <loc>${wwwDomain}${page}</loc>
  ${currentPageHrefLangText}
  <lastmod>${isoString}</lastmod>
</url>
`
        }
      })
    }

    sitemapContentTemplate = sitemapContentTemplate.replace(
      '{{TEMPLATE}}',
      urlTagString,
    )

    // 检查文件是否存在
    if (fs.existsSync(targetFilePath)) {
      // 文件存在，先删除
      fs.unlinkSync(targetFilePath)
    }

    fs.writeFileSync(targetFilePath, sitemapContentTemplate)
  }

  let filenames = []

  if (maxUrlCountSingleFile && maxUrlCountSingleFile > 0) {
    let index = 0
    for (let i = 0; i < allPages.length; i += maxUrlCountSingleFile) {
      index = i / maxUrlCountSingleFile + 1
      const slicedPages = allPages.slice(i, i + maxUrlCountSingleFile)
      const filename = `${targetFilename}-${index}`
      const sitemapFilePath = path.join(
        __dirname,
        `../${sitemapDirectory}/${filename}.xml`,
      )
      writingSitemap(slicedPages, sitemapFilePath)
      filenames.push(filename)
    }
    log(`${targetFilename} is split into ${index} files`)
  } else {
    writingSitemap(
      allPages,
      path.join(__dirname, `../${sitemapDirectory}/${targetFilename}.xml`),
    )
    filenames.push(targetFilename)
  }
  return filenames
}

function generateSitemapIndex(filenames) {
  const sitemapIndexContent = `<?xml version="1.0" encoding="utf-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{{TEMPLATE}</sitemapindex>`

  let sitemapIndexTemplate = ``
  filenames.forEach((filename) => {
    sitemapIndexTemplate += `<sitemap><loc>${sxAssetsUrl}/sitemap/www/${filename}.xml</loc></sitemap>`
  })

  const sitemapIndex = sitemapIndexContent.replace(
    '{{TEMPLATE}',
    sitemapIndexTemplate,
  )

  const sitemapIndexFilePath = path.join(
    __dirname,
    `../${sitemapDirectory}/sitemap-main.xml`,
  )
  fs.writeFileSync(sitemapIndexFilePath, sitemapIndex)
}

function fixPagesTrailingSlash(pages) {
  // 不需要 尾斜杠的页面
  const excludePaths = ['/prompt', ...chatpdfUrls, ...aiSearchUrls]
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
    // 开始生成前清空，sitemapDirectory 文件夹
    const sitemapPath = path.join(__dirname, `../${sitemapDirectory}`)
    if (fs.existsSync(sitemapPath)) {
      // 删除文件夹
      fs.rmSync(sitemapPath, { recursive: true })
    }
    // 创建一个新的文件夹
    fs.mkdirSync(sitemapPath)

    // 记录用时
    const startTime = new Date().getTime()

    // 1. 生成 prompt 的 sitemap
    const promptLibraryPages = await generatePromptsPages()
    log(`promptLibraryPages count: ${promptLibraryPages.length}`)
    const promptLibrarySitemapFilenames = generateSitemap(
      promptLibraryPages,
      'prompt-library-sitemap',
      1000,
    )

    // 2. 生成 www 项目静态页面的 sitemap
    let staticPages = crawlStaticDirectory(pagesDirectory)
    staticPages.push(...generateStaticPagesWithLocale(staticPages))
    staticPages.push(...(await generatePdfToolsPages()))
    staticPages.push(...generateStaticPagesWithLocale(chatpdfUrls))
    staticPages.push(...generateStaticPagesWithLocale(aiSearchUrls))
    log(`StaticPages count: ${staticPages.length}`)
    const staticPageFilenames = generateSitemap(
      fixPagesTrailingSlash(staticPages),
      'static-sitemap',
      1000,
    )

    // 3. 生成 docs 页面的 sitemap
    const docsPages = await generateDocsPages()
    log(`docsPages count: ${docsPages.length}`)
    const docsPageFilenames = generateSitemap(docsPages, 'docs-sitemap', 1000)

    // 生成 sitemap index 文件
    generateSitemapIndex([
      ...staticPageFilenames,
      ...promptLibrarySitemapFilenames,
      ...docsPageFilenames,
    ])

    generateUrlsLog(false)

    log('================================')
    log('Sitemap generated successfully!')
    log(`Time taken: ${(new Date().getTime() - startTime) / 1000}s
`)
  } catch (error) {
    console.error(`ERROR:`, error)
  }
}

main()
/**
 *
 * How to use:
 *
 * 1. 在终端执行 `node scripts/refreshSitemap.mjs`
 * 2. 将根目录下的 sitemap-temp 文件夹中的文件，上传到 S3 的 /sitemap/www/ 目录下
 * 3. https://assets.maxai.me/sitemap/www/sitemap-main.xml 就是 www 项目的 sitemap 索引入口
 * 4. 需要将 sitemap-main.xml 上传到 google search console
 *
 */
