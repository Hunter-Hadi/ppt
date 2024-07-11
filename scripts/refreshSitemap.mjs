import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import nextConfig from '../next.config.js'
import languageCodeMap from '../src/packages/common/constants/languageCodeMap.json' assert { type: 'json' }
import pdfToolsCodeMap from '../src/page_components/PdfToolsPages/constant/pdfToolsCodeMap.json' assert { type: 'json' }

const IS_PROD = true

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const pagesDirectory = 'src/pages'
const sitemapDirectory = 'sitemap-temp'
const wwwDomain = 'https://www.maxai.me'
const sxAssetsUrl = 'https://assets.maxai.me'

// prompt library 的代理路径
const PROMPT_LIBRARY_PROXY_BASE_PATH = '/prompt'
const CHAT_PDF_PROXY_BASE_PATH = '/tools/chatpdf'

const chatpdfUrls = ['/tools/chatpdf']

function log(text) {
  console.log(`
  \x1b[32m ${text} \x1b[0m`)
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
  const localeCodes = Object.keys(languageCodeMap)
  // const localeCodes = ['zh-CN', 'en-US']

  // 删除 url 上的 locale
  const inUrlLocale = localeCodes.find((locale) =>
    propPath.includes(`/${locale}/`),
  )
  const url = propPath.replace(`/${inUrlLocale}`, '')

  let hrefLangs = `<xhtml:link rel="alternate" hreflang="x-default" href="${wwwDomain}${url}" />`

  if (propPath.startsWith(CHAT_PDF_PROXY_BASE_PATH)) {
    localeCodes.forEach((locale) => {
      hrefLangs += `<xhtml:link rel="alternate" hreflang="${locale}" href="${wwwDomain}${CHAT_PDF_PROXY_BASE_PATH}/${locale}" />`
    })
  } else if (propPath.startsWith(PROMPT_LIBRARY_PROXY_BASE_PATH)) {
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

    if (IS_PROD) {
      sitemapContentTemplate = `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.w3.org/1999/xhtml http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd" xmlns:xhtml="http://www.w3.org/1999/xhtml">{{TEMPLATE}}</urlset>`
      pages.forEach((page) => {
        if (page) {
          const currentPageHrefLangText = addHrefLangToSitemap(page)
          urlTagString += `<url><loc>${wwwDomain}${page}</loc>${currentPageHrefLangText}<changefreq>daily</changefreq><lastmod>${isoString}</lastmod></url>`
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
          urlTagString += `<url>
  <loc>${wwwDomain}${page}</loc>
  ${currentPageHrefLangText}
  <changefreq>daily</changefreq>
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
    // 开始生成前清空，sitemapDirectory 文件夹
    const sitemapPath = path.join(__dirname, `../${sitemapDirectory}`)
    if (fs.existsSync(sitemapPath)) {
      // 删除文件夹
      fs.rmdirSync(sitemapPath, { recursive: true })
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
    staticPages.push(...(await generateToolsPages()))
    staticPages.push(...chatpdfUrls)
    log(`StaticPages count: ${staticPages.length}`)
    const staticPageFilenames = generateSitemap(
      fixPagesTrailingSlash(staticPages),
      'static-sitemap',
      1000,
    )

    // 生成 sitemap index 文件
    generateSitemapIndex([
      ...staticPageFilenames,
      ...promptLibrarySitemapFilenames,
    ])

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
