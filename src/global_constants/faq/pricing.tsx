import ProLink from '@/components/ProLink';
import { IFAQItem } from '@/page_components/FAQList';

import { WWW_PROJECT_LINK } from '..';

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
];
export { FAQ_PRICING };
