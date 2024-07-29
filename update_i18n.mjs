import { buildI18n } from './scripts/build-i18n-script.mjs'

const forceUpdateKeys = []
const retryLanguageCodes = ['th', 'el', 'hi']

buildI18n(forceUpdateKeys, retryLanguageCodes).then().catch()
