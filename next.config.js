// const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */

const SAFE_ON = process.env.NEXT_PUBLIC_SAFE_ON === 'true'

const obfuscatorOptions = {
  compact: true,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  debugProtection: SAFE_ON,
  debugProtectionInterval: SAFE_ON ? 0 : 4000,
  disableConsoleOutput: process.env.NODE_ENV === 'production',
  identifierNamesGenerator: 'hexadecimal',
  log: false,
  numbersToExpressions: false,
  renameGlobals: false,
  selfDefending: true,
  simplify: true,
  splitStrings: false,
  stringArray: true,
  stringArrayCallsTransform: false,
  stringArrayEncoding: [],
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 1,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 2,
  stringArrayWrappersType: 'variable',
  stringArrayThreshold: 0.75,
  unicodeEscapeSequence: false,
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getHostConfig } = require('./scripts/host.js')
const { WWW_PROJECT_HOST, APP_PROJECT_HOST, API_PROJECT_HOST } = getHostConfig()

const getSecurityKeysInEnv = () => {
  try {
    const securityKeys = JSON.parse(process.env.SECURITY_KEYS)
    return securityKeys
  } catch (e) {
    return {
      aes_key: '',
      sign_key: '',
    }
  }
}

const securityKeys = getSecurityKeysInEnv()
const basePath = undefined

const nextConfig = {
  basePath,
  // i18n,
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: [
      'cdn.shopify.com',
      'product.hstatic.net',
      'www.google.com',
      'images.simplytrends.co',
      'images.unsplash.com',
    ],
  },
  webpack: (config) => {
    // TODO - enable can slow page load.
    // config.plugins.push(
    //   new WebpackObfuscatorPlugin(obfuscatorOptions, ['bundles/**/**.js']),
    // );
    return config
  },
  experimental: {
    // Defaults to 50MB
    // isrMemoryCacheSize: 0,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  env: {
    NEXT_PUBLIC_WWW_PROJECT_HOST: WWW_PROJECT_HOST,
    NEXT_PUBLIC_APP_PROJECT_HOST: APP_PROJECT_HOST,
    NEXT_PUBLIC_API_PROJECT_HOST: API_PROJECT_HOST,
    NEXT_PUBLIC_BASE_PATH: String(basePath || ''),
    NEXT_PUBLIC__SECURITY_KEYS__AES_KEY: `${securityKeys.aes_key}`,
    NEXT_PUBLIC__SECURITY_KEYS__SIGN_KEY: `${securityKeys.sign_key}`,
    NEXT_PUBLIC__APP_VERSION: `${process.env.APP_VERSION}`,
  },
}

module.exports = nextConfig
