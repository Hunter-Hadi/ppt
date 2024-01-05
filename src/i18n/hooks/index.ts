import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';

import { PreferredLanguageAtom } from '@/i18n/store';

import { LANGUAGE_CODE_MAP } from '../types';

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
  }, [preferredLanguage, i18n]);
};

export const usePreferredLanguage = () => {
  const [preferredLanguage, setPreferredLanguage] = useRecoilState(
    PreferredLanguageAtom,
  );

  const changeLanguage = useCallback(
    (newLang: string) => setPreferredLanguage(newLang),
    [setPreferredLanguage],
  );

  const languageLabel = useMemo(() => {
    return LANGUAGE_CODE_MAP[preferredLanguage].label;
  }, [preferredLanguage]);

  return {
    languageLabel,
    currentLanguage: preferredLanguage,
    changeLanguage,
  };
};
