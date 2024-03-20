import { IFAQItem } from '@/page_components/FAQList';

const AFFILIATE_FAQ: IFAQItem[] = [
  {
    key: 'panel1',
    title: (t) => t('affiliate:faq__question1__title'),
    description: (t) => (
      <>
        {t('affiliate:faq__question1__description__part1')}
        <br />
        {t('affiliate:faq__question1__description__part2')}
      </>
    ),
  },
  {
    key: 'panel2',
    title: (t) => t('affiliate:faq__question2__title'),
    description: (t) => t('affiliate:faq__question2__description'),
  },
  {
    key: 'panel3',
    title: (t) => t('affiliate:faq__question3__title'),
    description: (t) => (
      <>
        {t('affiliate:faq__question3__description__part1')}
        <br />
        {t('affiliate:faq__question3__description__part2')}
      </>
    ),
  },
  {
    key: 'panel4',
    title: (t) => t('affiliate:faq__question4__title'),
    description: (t) => (
      <>
        {t('affiliate:faq__question4__description__part1')}
        <br />
        {t('affiliate:faq__question4__description__part2')}
      </>
    ),
  },
  {
    key: 'panel5',
    title: (t) => t('affiliate:faq__question5__title'),
    description: (t) => t('affiliate:faq__question5__description'),
  },
  {
    key: 'panel6',
    title: (t) => t('affiliate:faq__question6__title'),
    description: (t) => t('affiliate:faq__question6__description'),
  },
  {
    key: 'panel7',
    title: (t) => t('affiliate:faq__question7__title'),
    description: (t) => (
      <>
        {t('affiliate:faq__question7__description__part1')}
        <br />
        {t('affiliate:faq__question7__description__part2')}
      </>
    ),
  },
];
export default AFFILIATE_FAQ;
