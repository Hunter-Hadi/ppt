import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import ProLink from '@/components/ProLink';

const TermsPages: FC = () => {
  return (
    <AppContainer sx={{ wordBreak: 'break-word', py: 4 }}>
      <AppDefaultSeoLayout
        title={'Terms of Service | MaxAI.me'}
        description={'Read the MaxAI.me terms of service.'}
      />
      <Box>
        <Typography variant='h1' gutterBottom sx={{ mb: 2 }}>
          Terms of Service
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mb: 2 }}>
          Please note that your use of and access to our services (defined
          below) are subject to the following terms; if you do not agree to all
          of the following, you may not use or access the services in any
          manner.
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mb: 2 }}>
          {`These Terms of Use (the "Terms") are a binding contract between you and MaxAI.me ("MaxAI.me", "we" and "us"). If you have any questions, comments, or concerns regarding these Terms or the Services, please contact us at `}
          <ProLink href={'mailto:hello@maxai.me'}>hello@maxai.me</ProLink>.
        </Typography>
        <Typography variant='body2' gutterBottom>
          {`You must agree to and accept all of the Terms, or you don't have the right to use the Services. Your using the Services in any way means that you agree to all of these Terms, and these Terms will remain in effect while you use the services. These Terms include the provisions in this document, as well as those in the Privacy Policy.`}
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant='h2' gutterBottom sx={{ mb: 2 }}>
          Will these Terms ever change?
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mb: 2 }}>
          We are constantly improving our Services, so these Terms may need to
          change along with the Services. We reserve the right to change the
          Terms at any time, but if we do, we will bring it to your attention by
          placing a notice on the MaxAI.me website, and/or by sending you an
          email, and/or by some other means.
        </Typography>
        <Typography variant='body2' gutterBottom>
          If you don’t agree with the new Terms, you are free to reject them;
          unfortunately, that means you will no longer be able to use the
          Services. If you use the Services in any way after a change to the
          Terms is effective, that means you agree to all of the changes.
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant='h2' sx={{ mb: 2 }}>
          General Philosophy
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mb: 2 }}>
          We strive to make MaxAI.me as easy-to-use as possible and as ethical a
          business operation as possible. The terms will ensure a good
          experience for you, our users, and us, the creators of MaxAI.me. You
          must agree to these terms before using MaxAI.me.
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant='h2' sx={{ mb: 2 }}>
          Content
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mb: 2 }}>
          You understand and agree that the content and information you use on
          the MaxAI.me Services are your responsibility. You represent that you
          either own or have the necessary rights and permissions to use the
          content and information you make available through the Services. You
          agree that you will not use the Services to upload, post, transmit, or
          otherwise make available any content that:
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ textIndent: '16px' }}>
          - Infringes any patent, trademark, trade secret, copyright, or other
          proprietary rights of any party;
        </Typography>
        <Typography variant={'body2'} gutterBottom sx={{ textIndent: '16px' }}>
          - Is fraudulent, false, misleading, or deceptive;
        </Typography>
        <Typography variant={'body2'} gutterBottom sx={{ textIndent: '16px' }}>
          - Is defamatory, obscene, pornographic, vulgar, or offensive;
        </Typography>
        <Typography variant={'body2'} gutterBottom sx={{ textIndent: '16px' }}>
          - Promotes discrimination, bigotry, racism, hatred, harassment, or
          harm against any individual or group;
        </Typography>
        <Typography variant={'body2'} gutterBottom sx={{ textIndent: '16px' }}>
          - Is violent or threatening or promotes violence or actions that are
          threatening to any other person;
        </Typography>
        <Typography
          variant={'body2'}
          gutterBottom
          sx={{ textIndent: '16px', mb: 2 }}
        >
          - Promotes illegal or harmful activities or substances;
        </Typography>
        <Typography variant={'body2'} gutterBottom>
          MaxAI.me reserves the right to remove any content or information you
          make available through the Services if it believes it violates these
          Terms.
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant='h2' sx={{ mb: 2 }}>
          Warranties and Disclaimers
        </Typography>

        <Typography variant='body2' gutterBottom sx={{ mb: 2 }}>
          THE MAXAI.ME SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE” AND
          WITHOUT WARRANTIES OF ANY KIND EITHER EXPRESS OR IMPLIED, INCLUDING
          WITHOUT LIMITATION WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mb: 2 }}>
          MAXAI.ME DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR
          ERROR-FREE, AND MAXAI.ME DOES NOT WARRANT THAT ANY ERRORS WILL BE
          CORRECTED. MAXAI.ME DISCLAIMS ANY AND ALL LIABILITY FOR THE ACTS,
          OMISSIONS, AND CONDUCT OF ANY THIRD PARTIES IN CONNECTION WITH OR
          RELATED TO YOUR USE OF THE SERVICES.
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mb: 0 }}>
          YOU ASSUME TOTAL RESPONSIBILITY FOR YOUR USE OF THE SERVICES AND YOUR
          RELIANCE THEREON. YOUR USE OF THE SERVICES IS AT YOUR OWN RISK.
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant='h2' sx={{ mb: 2 }}>
          Liability Limitation
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mt: 2 }}>
          MAXAI.ME SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO
          DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA OR OTHER INTANGIBLE
          LOSSES (EVEN IF MAXAI.ME HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH
          DAMAGES), RESULTING FROM YOUR USE OF THE SERVICES.
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mt: 2 }}>
          THE TOTAL LIABILITY OF MAXAI.ME FOR ALL CLAIMS ARISING FROM OR
          RELATING TO THE USE OF THE SERVICES IS LIMITED TO THE AMOUNT, IF ANY,
          ACTUALLY PAID BY YOU FOR USE OF THE SERVICES DURING THE 12 MONTHS
          IMMEDIATELY PRECEDING THE DATE THE CLAIM AROSE.
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant='h2' sx={{ mb: 2 }}>
          Usage Requirements
        </Typography>
        <Typography variant='body2' gutterBottom>
          {`(a) Use of Services. You may access, and we grant you a non-exclusive
          right to use, the Services in accordance with these Terms. You will
          comply with these Terms and all applicable laws when using the
          Services. We and our affiliates own all rights, title, and interest in
          and to the Services.`}
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mt: 2 }}>
          {`(b) Feedback. We appreciate feedback, comments, ideas, proposals and
          suggestions for improvements. If you provide any of these things, we
          may use it without restriction or compensation to you.`}
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mt: 2 }}>
          {`(c) Restrictions. The Services are intended for human use only. By
          using the Services, you agree to the following restrictions: `}
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mt: 2, pl: 2 }}>
          {`(i) You shall not use the Services in any manner that infringes, misappropriates, or violates the intellectual property rights or other rights of any third party.`}
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mt: 2, pl: 2 }}>
          {`(ii) You shall not reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code, underlying components, or algorithms of the Services, except to the extent such restrictions are expressly prohibited by applicable law.`}
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mt: 2, pl: 2 }}>
          {`(iii) You shall not share your account with multiple individuals or entities to circumvent or exceed the limitations set forth by us.`}
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mt: 2, pl: 2 }}>
          {`(iv) You shall not employ any automated or programmatic methods, including but not limited to scraping, web harvesting, or data extraction, to access the Services, extract data, or bypass the official user interface.`}
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mt: 2, pl: 2 }}>
          {`(v) You shall not provide us with any personal information of children under the age of 13 or the applicable age of digital consent in your jurisdiction.`}
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mt: 2 }}>
          {`You agree to adhere to any rate limits and other requirements specified in our documentation. The Services may only be accessed and used in geographies currently supported by us.`}
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mt: 2 }}>
          {`In the event that you violate these terms of normal usage, we reserve the right, at our sole discretion, to suspend or terminate your account. Furthermore, if your violation results in actual losses or damages, we reserve the right to pursue legal action and seek appropriate compensation to the fullest extent permitted by law.`}
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant='h2' sx={{ mb: 2 }}>
          Paid Accounts
        </Typography>
        <Typography variant='body2' gutterBottom>
          {`Billing: You can enjoy our premium features and services by upgrading
          to a Paid Account. We'll automatically bill you from the date you
          convert to a Paid Account and on each periodic renewal until
          cancellation. You're responsible for all applicable taxes, and we'll
          charge tax when required to do so. Some countries have mandatory local
          laws regarding your cancellation rights, and this paragraph doesn't
          override these laws.`}
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mt: 2 }}>
          {`Cancellation: You may cancel your Paid Account at any time. However, please be aware that we practice a no-refund policy.`}
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mt: 2 }}>
          Changes: We may change the fees in effect on renewal of your
          subscription, to reflect factors such as changes to our product
          offerings, changes to our business, or changes in economic conditions.
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant='h2' sx={{ mb: 2 }}>
          Miscellaneous
        </Typography>
        <Typography variant='body2' gutterBottom>
          These Terms and the relationship between you and MaxAI.me shall be
          governed by the laws of the State of California without regard to its
          conflict of law provisions. You and MaxAI.me agree to submit to the
          personal jurisdiction of a state court located in Santa Clara County,
          California or the United States District Court for the Northern
          District of California.
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mt: 2 }}>
          If any provision of these Terms is found to be invalid or
          unenforceable, the remaining provisions shall be enforced to the
          fullest extent possible, and the remaining Terms shall remain in full
          force and effect.
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ mt: 2 }}>
          These Terms constitute the entire agreement between you and MaxAI.me
          with respect to the use of the Services and supersedes all prior or
          contemporaneous communications, understandings, and agreements,
          whether written or oral, between you and MaxAI.me.
        </Typography>
      </Box>
    </AppContainer>
  );
};

export default TermsPages;
