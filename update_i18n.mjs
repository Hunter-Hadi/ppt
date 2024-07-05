import { buildI18n } from './scripts/build-i18n-script.mjs';

const forceUpdateKeys = [];
const retryLanguageCodes = [];

buildI18n(forceUpdateKeys, retryLanguageCodes).then().catch();
