import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { atom, useRecoilState } from 'recoil';

import {
  IPartnerVariantType,
  PARTNERS_VARIANT,
  PARTNERS_VARIANT_TO_VERSION_MAP,
  TESTER_PARTNERS_CONTENT_PATH_TARGET_PATHNAME,
} from '@/features/ab_tester/constant/partnersVariant';
import HomePageContent from '@/features/landing/components/HomePageContent';
import { mixpanelTrack } from '@/features/mixpanel/utils';
import AIArtPages from '@/page_components/FeaturesLandingPages/AIArtPages';
import AIChatPages from '@/page_components/FeaturesLandingPages/AIChatPages';
import AIInstantReplyPages from '@/page_components/FeaturesLandingPages/AIInstantReplyPages';
import AIPromptsPages from '@/page_components/FeaturesLandingPages/AIPromptsPages';
import AIReaderPages from '@/page_components/FeaturesLandingPages/AIReaderPages';
import AIRewriterPages from '@/page_components/FeaturesLandingPages/AIRewriterPages';
import AISearchPages from '@/page_components/FeaturesLandingPages/AISearchPages';
import AISummaryPages from '@/page_components/FeaturesLandingPages/AISummaryPages';
import AITranslatorPages from '@/page_components/FeaturesLandingPages/AITranslatorPages';
import AIVisionPages from '@/page_components/FeaturesLandingPages/AIVisionPages';
import ChatPDFPages from '@/page_components/FeaturesLandingPages/ChatPDFPages';
import TranslatePages from '@/page_components/FeaturesLandingPages/TranslatePages';
import VisionPages from '@/page_components/FeaturesLandingPages/VisionPages';
import YoutubeSummaryPages from '@/page_components/FeaturesLandingPages/YoutubeSummaryPages';

import { isTargetTestPathname } from '../utils';

const PartnersABTestVariantAtom = atom<IPartnerVariantType | null>({
  key: 'PartnersABTestVariantAtom',
  default: null,
});

const usePartnersABTester = (autoSendEvent = false) => {
  const { isReady, pathname } = useRouter();
  const [variant, setVariant] = useRecoilState(PartnersABTestVariantAtom);
  const testPartnerPageViewedSendOnce = useRef(false);

  const enabled = useMemo(() => {
    return isTargetTestPathname(
      pathname,
      TESTER_PARTNERS_CONTENT_PATH_TARGET_PATHNAME,
    );
  }, [pathname]);

  useEffect(() => {
    if (enabled) {
      // 每次 加载都随机一个 variant
      const randomIndex = Date.now() % PARTNERS_VARIANT.length;
      const randomVariant = PARTNERS_VARIANT[randomIndex];

      setVariant(randomVariant);
    }
  }, [enabled]);

  useEffect(() => {
    if (!autoSendEvent || !isReady || !enabled) {
      return;
    }
    if (variant && !testPartnerPageViewedSendOnce.current) {
      testPartnerPageViewedSendOnce.current = true;
      // 当存在 variant 并且没有发送过一次的时候
      // 发送一次 mixpanelTrack
      mixpanelTrack('test_partner_page_viewed', {
        testVersion: PARTNERS_VARIANT_TO_VERSION_MAP[variant],
        testFeature: 'Partner page',
      });
    }
  }, [variant, autoSendEvent, isReady, enabled]);

  const renderPartnersContent = useCallback(
    (propRef?: string) => {
      if (!enabled) {
        return <HomePageContent propRef={propRef} />;
      }

      if (!variant) return null;

      if (variant) {
        switch (variant) {
          case 'partners_content_home': {
            return <HomePageContent propRef={propRef} />;
            break;
          }
          case 'partners_content_ai_chat': {
            return <AIChatPages propRef={propRef} />;
            break;
          }
          case 'partners_content_ai_rewriter': {
            return <AIRewriterPages propRef={propRef} />;
            break;
          }
          case 'partners_content_ai_summary': {
            return <AISummaryPages propRef={propRef} />;
            break;
          }
          case 'partners_content_ai_instant_reply': {
            return <AIInstantReplyPages propRef={propRef} />;
            break;
          }
          case 'partners_content_ai_reader': {
            return <AIReaderPages propRef={propRef} />;
            break;
          }
          case 'partners_content_ai_prompts': {
            return <AIPromptsPages propRef={propRef} />;
            break;
          }
          case 'partners_content_ai_search': {
            return <AISearchPages propRef={propRef} />;
            break;
          }
          case 'partners_content_ai_art': {
            return <AIArtPages propRef={propRef} />;
            break;
          }
          case 'partners_content_ai_translator': {
            return <AITranslatorPages propRef={propRef} />;
            break;
          }
          case 'partners_content_ai_vision': {
            return <AIVisionPages propRef={propRef} />;
            break;
          }
          case 'partners_content_youtubesummary': {
            return <YoutubeSummaryPages propRef={propRef} />;
            break;
          }
          case 'partners_content_chatpdf': {
            return <ChatPDFPages propRef={propRef} />;
            break;
          }
          case 'partners_content_translate': {
            return <TranslatePages propRef={propRef} />;
            break;
          }
          case 'partners_content_vision': {
            return <VisionPages propRef={propRef} />;
            break;
          }
          default: {
            return null;
          }
        }
      }
    },
    [variant, enabled],
  );

  return {
    variant,
    renderPartnersContent,
  };
};

export default usePartnersABTester;
