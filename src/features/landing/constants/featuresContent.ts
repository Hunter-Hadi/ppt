import {
  abTestVideoPosterUrlObject,
  abTestVideoUrlObject,
} from '@/features/ab_tester/constant/landingVariant'

export const FEATURES_CONTENT = [
  {
    key: 'Summary assistant',
    icon: 'summary',
    label:
      'pages:home_page__features_content__ab_test_v4__content2__summary__label',
    title:
      'pages:home_page__features_content__ab_test_v4__content2__summary__title',
    image: '/assets/landing/feature-carousel/summary.png',
    videoUrl: abTestVideoUrlObject.summaryAssistant,
    videoPosterUrl: abTestVideoPosterUrlObject.summaryAssistant,
    descriptionList: [
      'pages:home_page__features_content__ab_test_v4__content2__summary__description1',
      'pages:home_page__features_content__ab_test_v4__content2__summary__description2',
      'pages:home_page__features_content__ab_test_v4__content2__summary__description3',
      'pages:home_page__features_content__ab_test_v4__content2__summary__description4',
    ],
    tagBgColor: '#FFEBEB',
    tagColor: '#DB4437',
  },

  {
    key: 'Reading assistant',
    icon: 'chat',
    label:
      'pages:home_page__features_content__ab_test_v4__content2__reading__label',
    title:
      'pages:home_page__features_content__ab_test_v4__content2__reading__title',
    image: '/assets/features-landing/ai-summary/2.png',
    videoUrl: abTestVideoUrlObject.readingAssistant,
    videoPosterUrl: abTestVideoPosterUrlObject.readingAssistant,

    descriptionList: [
      'pages:home_page__features_content__ab_test_v4__content2__reading__description1',
      'pages:home_page__features_content__ab_test_v4__content2__reading__description2',
      'pages:home_page__features_content__ab_test_v4__content2__reading__description3',
    ],
    tagBgColor: '#F4EBFF',
    tagColor: '#9065B0',
  },
  {
    key: 'Writing assistant',
    icon: 'rewriter',
    label:
      'pages:home_page__features_content__ab_test_v4__content2__writing__label',
    title:
      'pages:home_page__features_content__ab_test_v4__content2__writing__title',
    image: '/assets/landing/feature-carousel/rewriter.png',
    videoUrl: abTestVideoUrlObject.writingAssistant,
    videoPosterUrl: abTestVideoPosterUrlObject.writingAssistant,
    descriptionList: [
      'pages:home_page__features_content__ab_test_v4__content2__writing__description1',
      'pages:home_page__features_content__ab_test_v4__content2__writing__description2',
      'pages:home_page__features_content__ab_test_v4__content2__writing__description3',
      'pages:home_page__features_content__ab_test_v4__content2__writing__description4',
    ],
    tagBgColor: '#D3F8DF',
    tagColor: '#16B364',
  },
  {
    key: 'Drafting assistant',
    icon: 'prompts',
    label:
      'pages:home_page__features_content__ab_test_v4__content2__drafting__label',
    title:
      'pages:home_page__features_content__ab_test_v4__content2__drafting__title',
    image: '/assets/features-landing/ai-prompts/1.png',
    videoUrl: abTestVideoUrlObject.draftingAssistant,
    videoPosterUrl: abTestVideoPosterUrlObject.draftingAssistant,
    descriptionList: [
      'pages:home_page__features_content__ab_test_v4__content2__drafting__description1',
      'pages:home_page__features_content__ab_test_v4__content2__drafting__description2',
      'pages:home_page__features_content__ab_test_v4__content2__drafting__description3',
      'pages:home_page__features_content__ab_test_v4__content2__drafting__description4',
    ],
    tagBgColor: '#F4EBFF',
    tagColor: '#9065B0',
  },
  {
    key: 'Email assistant',
    icon: 'reply',
    label:
      'pages:home_page__features_content__ab_test_v4__content2__email__label',
    title:
      'pages:home_page__features_content__ab_test_v4__content2__email__title',
    image: '/assets/features-landing/ai-reply/1.png',
    videoUrl: abTestVideoUrlObject.emailAssistant,
    videoPosterUrl: abTestVideoPosterUrlObject.emailAssistant,
    descriptionList: [
      'pages:home_page__features_content__ab_test_v4__content2__email__description1',
      'pages:home_page__features_content__ab_test_v4__content2__email__description2',
      'pages:home_page__features_content__ab_test_v4__content2__email__description3',
      'pages:home_page__features_content__ab_test_v4__content2__email__description4',
    ],
    tagBgColor: '#E6F0FF',
    tagColor: '#2080F1',
  },
  {
    key: 'Search assistant',
    icon: 'search',
    label:
      'pages:home_page__features_content__ab_test_v4__content2__search__label',
    title:
      'pages:home_page__features_content__ab_test_v4__content2__search__title',
    image: '/assets/landing/feature-carousel/chat.png',
    videoUrl: abTestVideoUrlObject.searchAssistant,
    videoPosterUrl: abTestVideoPosterUrlObject.searchAssistant,

    descriptionList: [
      'pages:home_page__features_content__ab_test_v4__content2__search__description1',
      'pages:home_page__features_content__ab_test_v4__content2__search__description2',
      'pages:home_page__features_content__ab_test_v4__content2__search__description3',
    ],
    tagBgColor: '#FFF6D6',
    tagColor: '#FAA700',
  },
  {
    key: 'Translation assistant',
    icon: 'translator',
    label:
      'pages:home_page__features_content__ab_test_v4__content2__translation__label',
    title:
      'pages:home_page__features_content__ab_test_v4__content2__translation__title',
    image: '/assets/landing/feature-carousel/translator.png',
    videoUrl: abTestVideoUrlObject.translationAssistant,
    videoPosterUrl: abTestVideoPosterUrlObject.translationAssistant,
    descriptionList: [
      'pages:home_page__features_content__ab_test_v4__content2__translation__description1',
      'pages:home_page__features_content__ab_test_v4__content2__translation__description2',
      'pages:home_page__features_content__ab_test_v4__content2__translation__description3',
    ],
    tagBgColor: '#EAEAEA',
    tagColor: '#202124',
  },

  {
    key: 'Browser extension',
    icon: 'extension',
    label:
      'pages:home_page__features_content__ab_test_v4__content2__browser__label',
    title:
      'pages:home_page__features_content__ab_test_v4__content2__browser__title',
    image: '/assets/landing/feature-carousel/works-where-you-work.png',
    descriptionList: [
      'pages:home_page__features_content__ab_test_v4__content2__browser__description1',
      'pages:home_page__features_content__ab_test_v4__content2__browser__description2',
      'pages:home_page__features_content__ab_test_v4__content2__browser__description3',
    ],
    tagBgColor: '#F4EBFF',
    tagColor: '#9065B0',
  },
]
