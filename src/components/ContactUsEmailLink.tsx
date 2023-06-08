import React, { FC } from 'react';

import ProLink, { IProLinkProps } from '@/components/ProLink';
import { SIMPLY_TRENDS_APP_EMAIL } from '@/global_constants';
import { GaContent, gaEvent, generateGaEvent } from '@/utils/gtag';
import { getLocalStorage } from '@/utils/localStorage';

interface IContactUsEmailLinkProps extends Omit<IProLinkProps, 'href'> {
  text?: string;
}

const ContactUsEmailLink: FC<IContactUsEmailLinkProps> = ({
  text = 'hello@maxai.me',
  ...props
}) => {
  const ga = generateGaEvent('click', 'contact_us_email_link', {
    link: (typeof window !== 'undefined' && window.location.href) || '',
    email: getLocalStorage('email') ?? '',
  });
  return (
    <ProLink
      href={SIMPLY_TRENDS_APP_EMAIL}
      underline='hover'
      muiLinkProps={{ title: 'hello@maxai.me' }}
      onClick={() => {
        gaEvent(ga);
      }}
      {...props}
    >
      <GaContent gaEvent={ga}>{text}</GaContent>
    </ProLink>
  );
};

export default ContactUsEmailLink;
