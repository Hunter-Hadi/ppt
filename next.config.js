// const { i18n } = require('./next-i18next.config');

const WebpackObfuscatorPlugin = require('webpack-obfuscator');
/** @type {import('next').NextConfig} */

const SAFE_ON = process.env.NEXT_PUBLIC_SAFE_ON === 'true';

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
};
const nextConfig = {
  // i18n,
  trailingSlash: false,
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
    return config;
  },
  experimental: {
    // Defaults to 50MB
    // isrMemoryCacheSize: 0,
  },
};

module.exports = nextConfig;
