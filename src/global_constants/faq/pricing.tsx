import ProLink from '@/components/ProLink';
import { IFAQItem } from '@/page_components/FAQList';

import { APP_PROJECT_LINK, WWW_PROJECT_LINK } from '..';

const FAQ_PRICING: IFAQItem[] = [
  {
    key: 'panel1',
    title: (t) => t('modules:faq_list__question1__title'),
    description: (t) => t('modules:faq_list__question1__desc'),
  },
  {
    key: 'panel2',

    title: (t) => t('modules:faq_list__question2__title'),
    description: (t) => (
      <>
        {t('modules:faq_list__question2__desc1')}{' '}
        <ProLink href='/my-plan' color='inherit' underline='always'>
          {t('modules:faq_list__my_plan')}
        </ProLink>{' '}
        {t('modules:faq_list__question2__desc2')}
      </>
    ),
  },
  {
    key: 'panel3',
    title: (t) => t('modules:faq_list__question3__title'),
    description: (t) => (
      <>
        {t('modules:faq_list__question3__desc')}{' '}
        <ProLink
          href={`${WWW_PROJECT_LINK}/terms`}
          color='inherit'
          underline='always'
        >
          {t('modules:faq_list__terms_of_service')}
        </ProLink>
        {`.`}
      </>
    ),
  },
  {
    key: 'panel4',
    title: (t) => t('modules:faq_list__question4__title'),
    description: (t) => t('modules:faq_list__question4__desc'),
  },
  {
    key: 'panel5',
    title: (t) => t('modules:faq_list__question5__title'),
    description: (t) => (
      <>
        {t('modules:faq_list__question5__desc__part1')}
        {` `}
        <ProLink
          href={`${APP_PROJECT_LINK}/pricing/team`}
          color='inherit'
          underline='always'
          target={'_blank'}
        >
          {t('modules:faq_list__question5__desc__part2')}
        </ProLink>
        {` `}
        {t('modules:faq_list__question5__desc__part3')}
      </>
    ),
  },
];
export { FAQ_PRICING };
