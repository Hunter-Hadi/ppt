This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## I18n routing architecture description
[www 项目 i18n 架构说明](https://ikjt09m6ta.larksuite.com/docx/IGESd36Koo7qUGx57q9uDwQGsTb)

## Getting Started


### 环境变量
在项目根目录创建一个 .env.local 文件
```
VITE_PUBLIC_ENV=test
VITE_PUBLIC_GA_ID=
VITE_PUBLIC_GA_ID_MCC=
VITE_PUBLIC_MIXPANEL_PROJECT_ID=dc4e4b13d1d423a76e0e10ea377e2949
VITE_PUBLIC_CALRITY_ID=
```

在终端执行 :

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## 注意事项

在开发 www 相关项目的时的注意事项

1. www 项目全站使用的都是 [SSG](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation) 的方式实现，在新增页面时尽可能参考其他页面写法，保持统一的规范。

2. www 项目是需要 SEO 支持的，所以在开发页面时需要注意 语义化标签 和 SEO meta 的信息是否正确；同时也需要考虑当前页面路径是否需要 i18n url。（例如：/en/pdf-tools/merge-pdf 和 /zh-CN/pdf-tools/合并pdf）

3. www 项目需要支持移动端展示，在开发网页时可以以 ”移动端优先“ 去实现响应式

4. 项目分布: 由于产品功能较多，独立的功能被分到不同的 repo 部署，并且通过代理的方式访问
  - https://www.maxai.me/prompt/* 部署的是 maxai_www repo 下的 prod_prompt_library_ssg 分支
  - https://www.maxai.me/ai-tools/search 部署的是 maxai_search 的 prod 分支
  - https://www.maxai.me/ai-tools/chat-with-pdf/ 部署的是 maxai_doc_chat 的 prod 分支
