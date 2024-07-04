# MaxAI 公共仓库

> 原本需要单独用package.json管理的各个公共项目，现在临时统一放在这里，方便管理。

## 前置步骤

### 1. i18n

#### 1.1 配置i18n依赖库

在`@/packages/common/hooks/useMaxAII18n.ts`中配置i18n依赖库

如果用的是next-i18next，配置如下：

```typescript
import { useTranslation as useMaxAITranslation } from 'next-i18next';
export { useMaxAITranslation };
```

如果用的是react-i18next，配置如下：

```typescript
import { useTranslation as useMaxAITranslation } from 'react-i18next';
export { useMaxAITranslation };
```


#### 1.2 更新packages的所有项目用到的i18n key到当前的项目

需要手动在根目录执行一次脚本，将所有项目的i18n key更新到当前项目中

```bash
node ./src/packages/common/scripts/packagesI18nGenerator.mjs
```