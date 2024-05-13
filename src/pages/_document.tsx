/* eslint-disable @next/next/next-script-for-ga */
import { Head, Html, Main, NextScript } from 'next/document';
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
import i18nextConfig from '../../next-i18next.config';

export default function Document(props: any) {
  const currentLocale =
    props.__NEXT_DATA__.query.locale || i18nextConfig.i18n.defaultLocale;
  return (
    <Html lang={currentLocale}>
      {/* @ts-ignore */}
      <Head>
        {/* clarity start */}
        {/* <script
          type='text/javascript'
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "mbdmb437kn");`,
          }}
        /> */}
        {/* clarity end */}

        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');`,
          }}
        />
        <script async src='https://r.wdfl.co/rw.js' data-rewardful='ee3709' />

        <script
          dangerouslySetInnerHTML={{
            __html: `
            _linkedin_partner_id = "5920796";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);})(window.lintrk);
            `,
          }}
        />
        <noscript>
          <img
            height='1'
            width='1'
            style={{
              display: 'none',
            }}
            alt=''
            src='https://px.ads.linkedin.com/collect/?pid=5920796&fmt=gif'
          />
        </noscript>
      </Head>
      <body>
        <Main />
        {/* @ts-ignore */}
        <NextScript />
      </body>
    </Html>
  );
}
