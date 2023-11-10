import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import { PreferredLanguageAtom } from '@/i18n/store';

export const useLazyLoadI18nResources = () => {
  const preferredLanguage = useRecoilValue(PreferredLanguageAtom);
  const { i18n } = useTranslation();
  useEffect(() => {
    const newLanguage = preferredLanguage || i18n.language;
    if (!i18n?.hasResourceBundle?.(newLanguage, 'common')) {
      import(`../locales/${newLanguage}/index.json`)
        .then((module) => {
          const json = module.default;
          Object.keys(json).forEach((key) => {
            i18n.addResourceBundle(newLanguage, key, json[key], true, true);
          });
        })
        .catch((err) => {
          console.error('load i18n resources error', err);
        });
    }
  }, [i18n, preferredLanguage]);
};

export const useInitI18n = () => {
  const { i18n } = useTranslation();
  const preferredLanguage = useRecoilValue(PreferredLanguageAtom);
  useLazyLoadI18nResources();
  useEffect(() => {
    if (preferredLanguage) {
      i18n.changeLanguage(preferredLanguage, (err) => {
        if (err) {
          console.error('change language error', err);
        }
      });
    }
  }, [preferredLanguage]);
};
