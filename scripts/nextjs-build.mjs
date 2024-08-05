import { execSync } from 'child_process'
import fs from 'fs'

import updateProjectAPISecurityKey from './api_key_gen.mjs'

const NODE_ENV =
  process.env.NODE_ENV === 'production' ? 'production' : 'development'

// const isProduction = NODE_ENV === 'production'

async function main() {
  try {
    // 网页版本号
    // 去获取 根目录下 package.json 的 version 字段
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'))
    const webVersion = `webpage_${packageJson.version}`
    const result = await updateProjectAPISecurityKey(webVersion)
    if (!result) {
      throw 'updateProjectAPISecurityKey failed'
    } else {
      process.env.SECURITY_KEYS = JSON.stringify(result)
      process.env.APP_VERSION = packageJson.version
    }
  } catch (error) {
    throw 'updateProjectAPISecurityKey failed'
  }

  // 运行 vite
  const viteRunScripts =
    NODE_ENV === 'development'
      ? 'next dev --port=3001'
      : 'next build && next export'
  execSync(viteRunScripts, { stdio: 'inherit' })
}

main()
