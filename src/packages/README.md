# MaxAI 公共仓库

> 原本需要单独用package.json管理的各个公共项目，现在临时统一放在这里，方便管理。

## 前置步骤


### 1. 环境变量

#### Next.js

next.config.js 需要暴露4个环境变量, 如果项目是需要单独部署的，则还需要配置一下`basePath`。
```javascript
const { getHostConfig } = require('./scripts/host.js');
const { WWW_PROJECT_HOST, APP_PROJECT_HOST, API_PROJECT_HOST } =
  getHostConfig();

const basePath = undefined;
const nextConfig = {
  // ...
  basePath,
  env: {
    NEXT_PUBLIC_WWW_PROJECT_HOST: WWW_PROJECT_HOST,
    NEXT_PUBLIC_APP_PROJECT_HOST: APP_PROJECT_HOST,
    NEXT_PUBLIC_API_PROJECT_HOST: API_PROJECT_HOST,
    NEXT_PUBLIC_BASE_PATH: String(basePath || ''),
  }
}
```

#### Vite

vite.config.ts 需要暴露3个环境变量

```typescript
const { WWW_PROJECT_HOST, APP_PROJECT_HOST, API_PROJECT_HOST } =
  getHostConfig(mode);
export default defineConfig(async ({ mode }) => {
  define: {
    ENV_DEFINE__SEO__DEFAULT_TITLE: `"${DEFAULT_TITLE}"`,
      ENV_DEFINE__LINKS__WWW_PROJECT_LINK: `"${WWW_PROJECT_HOST}"`,
      ENV_DEFINE__LINKS__APP_PROJECT_LINK: `"${APP_PROJECT_HOST}"`,
      ENV_DEFINE__LINKS__API_HOST: `"${API_PROJECT_HOST}"`,
  },
})
```

### 2. i18n

#### 2.1 配置i18n依赖库

在`@/packages/common/hooks/useMaxAII18n.ts`中配置i18n依赖库，

如果用的是next-i18next，配置如下：

```typescript
import { useTranslation as useMaxAITranslation, } from 'next-i18next';
export { useMaxAITranslation };
```

如果用的是react-i18next，配置如下：

```typescript
import { useTranslation as useMaxAITranslation, } from 'react-i18next';
export { useMaxAITranslation };
```


#### 2.2 更新packages的所有项目用到的i18n key到当前的项目

需要手动在根目录执行一次脚本，将所有项目的i18n key更新到当前项目中

```bash
node ./src/packages/common/scripts/packagesI18nGenerator.mjs
```

### 3. packages 使用指南

#### 3.1 配置根组件

需要将 MaxAICommonRoot 组件放到你项目的根容器并包住全部组件，类似于 RecoilRoot 的用法
```typescript
<MaxAICommonRoot>
  // your components
</MaxAICommonRoot>
```

#### 3.2 components 使用方法
具体的 components 和 hooks 的使用方法可以参考 ```src/page_components/TestPages/TestSyncLogin.tsx``` 组件


## 常见问题

### 1. 配置好了环境变量，但是登陆没有反应

请检查是否在`getHostConfig()`里的www和app和api的host配置正确，是否是`http://localhost:3000`这种格式, 和本地的开发环境一致

```javascript
function getHostConfig() {
  // 是否是本地开发环境
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment) {
    return {
      WWW_PROJECT_HOST: 'http://localhost:3001',
      APP_PROJECT_HOST: 'http://localhost:3000',
      API_PROJECT_HOST: 'https://dev.maxai.me',
    };
  }
  // ...
}

```