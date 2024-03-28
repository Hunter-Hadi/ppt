import { Box, Stack, SvgIcon, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import ContactUsPanel from '@/components/ContactUsPanel';

const ContactUsPages = () => {
  // const isSmScreen = useMediaQuery('(min-width:600px)');
  const { t } = useTranslation();
  return (
    <AppContainer sx={{ bgcolor: '#fff' }}>
      <AppDefaultSeoLayout title='Contact Us | MaxAI.me' />

      <Box
        sx={{
          maxWidth: 800,
          margin: '0 auto',
          py: 4,
        }}
      >
        <Stack direction={'row'} alignItems='center' mb={4} gap={1}>
          <ContactUsIcon />
          <Typography variant='h2' pt={1}>
            {t('common:contact_us')}
          </Typography>
        </Stack>

        <ContactUsPanel />
      </Box>
    </AppContainer>
  );
};
export default ContactUsPages;

const ContactUsIcon = () => (
  <SvgIcon viewBox='0 0 60 40' sx={{ width: 60, height: 40 }}>
    <g>
      <path
        d='M58.6553 0.0165491C58.8612 -0.0452074 59.0786 0.0712357 59.1406 0.276631C60.3674 4.34419 60.142 8.98755 59.0118 13.3688C57.8813 17.7515 55.8374 21.9035 53.3905 24.9979C53.2572 25.1662 53.0122 25.1951 52.8433 25.0623C52.6742 24.9295 52.6454 24.6854 52.7784 24.5169C55.1527 21.5146 57.1512 17.4625 58.2571 13.1753C59.3634 8.88658 59.5687 4.39388 58.3943 0.500272C58.3323 0.294876 58.4492 0.0783056 58.6553 0.0165491Z'
        fill='#202124'
      />
      <path
        d='M2.80905 9.54311C2.71512 9.35014 2.48203 9.26964 2.28844 9.36327C2.09486 9.45692 2.01409 9.68925 2.10803 9.88222C3.10736 11.9348 5.97906 16.7736 9.4951 19.6942C9.66039 19.8315 9.90608 19.8092 10.0438 19.6445C10.1816 19.4796 10.1592 19.2348 9.99394 19.0975C6.60179 16.2799 3.78863 11.5551 2.80905 9.54311Z'
        fill='#202124'
      />
      <path
        d='M4.23501 26.3792C4.27769 26.2516 4.335 26.1238 4.3987 26.0032L0.114114 21.7324C-0.0380381 21.5807 -0.0380381 21.3349 0.114114 21.1832C0.266266 21.0316 0.512953 21.0316 0.665106 21.1832L4.88423 25.3887C5.87793 24.386 7.2898 23.0493 8.60445 21.9896C9.32343 21.4102 10.0277 20.9019 10.6262 20.578C10.9241 20.4168 11.2145 20.291 11.4793 20.2308C11.7354 20.1728 12.0382 20.1603 12.2938 20.3242C12.613 20.5287 12.8195 20.7978 12.873 21.124C12.9243 21.437 12.8219 21.7285 12.6852 21.9625C12.4162 22.4232 11.924 22.8178 11.5727 23.0407C11.3912 23.1559 11.1504 23.1025 11.0348 22.9215C10.9193 22.7405 10.9728 22.5005 11.1544 22.3854C11.4627 22.1898 11.8341 21.8761 12.0118 21.5718C12.0985 21.4232 12.1152 21.318 12.104 21.2493C12.0949 21.1935 12.0571 21.0959 11.8725 20.9776C11.8686 20.9759 11.8146 20.9514 11.6524 20.9881C11.4864 21.0258 11.2672 21.1149 10.9979 21.2607C10.4619 21.5506 9.80116 22.024 9.0944 22.5937C7.69792 23.7192 6.17784 25.1749 5.19374 26.1834C5.10105 26.3295 5.02044 26.4867 4.97423 26.6248C4.94531 26.7114 4.93763 26.7667 4.93595 26.798C4.95676 26.8003 4.98756 26.8017 5.03172 26.7996C5.22431 26.7896 5.55538 26.7083 6.08147 26.4811C6.2789 26.3959 6.50831 26.4862 6.59386 26.683C6.67942 26.8797 6.58872 27.1085 6.39129 27.1937C5.83798 27.4328 5.40446 27.5582 5.0714 27.5753C4.7341 27.5924 4.39262 27.4949 4.23282 27.1658C4.10102 26.8941 4.16511 26.5883 4.23501 26.3792ZM4.89808 26.7883C4.89857 26.7879 4.90202 26.7889 4.90701 26.7924C4.90009 26.7904 4.8976 26.7887 4.89808 26.7883Z'
        fill='#202124'
      />
      <path
        d='M49.5557 4.23938C49.484 4.03719 49.2614 3.93127 49.0586 4.00282C48.8558 4.07436 48.7494 4.29628 48.8213 4.49847C48.8523 4.58608 48.8842 4.67546 48.9169 4.76663L48.9173 4.76746C49.6073 6.69496 50.5841 9.42366 49.4951 13.2931C49.4371 13.4997 49.5579 13.714 49.7651 13.772C49.9722 13.8299 50.1873 13.7094 50.2455 13.5029C51.4021 9.393 50.353 6.46503 49.6545 4.51548C49.6206 4.42117 49.5877 4.32913 49.5557 4.23938Z'
        fill='#202124'
      />
      <path
        d='M18.3421 32.9902L18.02 15.0938H49.5027V32.9519C49.5027 34.1315 48.5433 35.0878 47.3598 35.0878H20.4845C19.3161 35.0878 18.363 34.1546 18.3421 32.9902Z'
        fill='#E9D6F8'
      />
      <path
        d='M23.2733 36.2321L23.5068 22.175L47.6136 21.8164L47.2992 36.3137C47.2738 37.475 46.3222 38.4034 45.1567 38.4034H25.4157C24.2184 38.4034 23.2534 37.4255 23.2733 36.2321Z'
        fill='#9065B0'
      />
      <path
        d='M18.02 14.7051C17.9154 14.7051 17.8153 14.747 17.742 14.8213C17.6688 14.8956 17.6286 14.9962 17.6304 15.1004L17.9525 32.9968C17.9772 34.373 19.1036 35.4759 20.4845 35.4759H22.8963L22.8838 36.2264C22.8603 37.6368 24.0009 38.7924 25.4158 38.7924H45.1568C46.5342 38.7924 47.6589 37.6953 47.6888 36.3228L47.7077 35.4522C48.9417 35.2832 49.8923 34.228 49.8923 32.9516V15.0934C49.8923 14.8789 49.7178 14.7051 49.5026 14.7051H18.02ZM47.7248 34.6612C48.5179 34.4938 49.113 33.7919 49.113 32.9516V15.8494L41.1655 21.5246L47.6079 21.4288C47.7137 21.4272 47.8155 21.4686 47.8901 21.5434C47.9647 21.6182 48.0055 21.7201 48.0032 21.8255L47.7248 34.6612ZM39.7991 21.545L48.2898 15.4818H18.9838L25.4987 21.7577L39.7991 21.545ZM24.3945 21.7742L18.4264 16.025L18.7316 32.9829C18.7487 33.9356 19.5285 34.6992 20.4845 34.6992H22.9092L23.1174 22.1693C23.1209 21.9596 23.2907 21.7906 23.5011 21.7874L24.3945 21.7742ZM33.7882 31.1674L24.483 22.5497L46.5495 22.2214L36.1288 31.2087C35.4524 31.7922 34.4436 31.7745 33.7882 31.1674ZM23.882 23.0532L33.2578 31.7363C34.2045 32.6131 35.6616 32.6389 36.6387 31.796L47.2052 22.6829L46.9446 34.6991L46.9278 35.4758L46.9097 36.3059C46.889 37.2562 46.1104 38.0157 45.1568 38.0157H25.4158C24.4362 38.0157 23.6467 37.2157 23.6629 36.2393L23.882 23.0532Z'
        fill='#202124'
      />
      <path
        d='M17.2235 31.9266C17.1582 31.874 17.1008 31.8278 17.0536 31.7889L17.0303 31.7695C17.0377 31.7757 17.0455 31.7822 17.0536 31.7889C17.1702 31.8853 17.3063 31.9965 17.4567 32.1156C17.3719 32.0462 17.2933 31.9829 17.2235 31.9266Z'
        fill='white'
      />
      <path
        d='M19.4493 30.7753C19.2827 30.6483 19.1333 30.5279 19.0093 30.4238C19.1035 30.4943 19.2193 30.5846 19.3473 30.6902C19.3805 30.7176 19.4146 30.746 19.4493 30.7753Z'
        fill='white'
      />
      <path
        d='M42.1697 8.07029C40.7618 6.92885 39.9906 8.02075 39.5505 8.86533C39.3463 7.41069 37.913 6.01479 36.5626 7.01341C34.3192 8.67236 38.1315 10.9774 38.0834 12.6623C41.58 12.0731 43.3755 9.04778 42.1697 8.07029Z'
        fill='#F54A45'
      />
      <path
        d='M37.0016 11.7673C36.365 11.2512 36.0163 11.7449 35.8174 12.1268C35.7251 11.469 35.077 10.8378 34.4664 11.2894C33.4521 12.0395 35.1757 13.0817 35.1539 13.8436C36.735 13.5772 37.5469 12.2092 37.0016 11.7673Z'
        fill='#FF9895'
      />
      <path
        d='M15.7329 35.8319C10.4207 35.6883 7.71676 28.9524 7.02881 25.6024L10.4386 22.7309C10.7078 22.7309 11.6052 22.6592 13.0409 22.372C15.1583 22.1073 16.8615 22.1454 18.0766 22.372V25.1494C17.4022 25.2797 16.7934 25.3575 16.6302 25.6024C19.053 27.397 23.0909 31.0761 22.3731 31.7939C21.7652 32.4018 20.3208 31.502 19.4021 30.7996C20.2539 31.5216 21.5073 32.8096 20.7579 33.4091C19.9864 34.0263 18.3955 32.9191 17.4144 32.1401C18.214 32.7958 19.551 33.9716 18.9632 34.4859C18.2454 35.114 16.4507 34.0372 15.3739 33.2296C16.4507 34.127 17.1686 35.8319 15.7329 35.8319Z'
        fill='white'
      />
      <path
        d='M44.1483 23.9587C43.5022 24.6766 44.5969 25.2748 45.225 25.4842C44.4174 26.0226 41.1015 27.3253 39.8383 27.4583C39.0156 27.5449 36.7299 27.907 36.729 30.1503C36.7282 32.1821 39.5475 31.0755 41.7403 30.2149C41.7956 30.1932 41.8505 30.1716 41.905 30.1503C40.4094 32.4534 37.6516 37.2391 38.5849 37.957C39.1412 38.385 39.9166 37.8774 40.5915 37.1758C40.1651 37.9282 39.9908 38.7123 40.6487 39.1235C41.4488 39.6236 42.4405 38.6141 43.181 37.5208C42.8132 38.2949 42.5926 39.0901 42.9817 39.3927C44.2097 40.115 44.9143 38.9186 45.5637 37.816C45.721 37.5488 45.8751 37.2872 46.0326 37.0597C45.225 38.4057 45.225 39.5722 46.571 39.3927C50.4295 37.6036 51.0883 31.1672 50.7892 27.4583C51.3874 27.548 52.7446 27.5121 53.0318 27.0096C53.3907 26.3815 51.866 25.1254 49.4432 24.4076L49.3403 24.3771C46.9621 23.6722 44.9444 23.0742 44.1483 23.9587Z'
        fill='white'
      />
      <path
        d='M38.8521 31.6505C39.6026 31.5507 40.4931 31.2534 41.3374 30.936C40.6859 31.9978 39.9454 33.2909 39.3728 34.4772C38.9895 35.2714 38.6721 36.0363 38.5118 36.6594C38.4596 36.8624 38.4213 37.0606 38.4049 37.2466C38.3964 37.3444 38.3939 37.4388 38.3989 37.5288C38.4125 37.7857 38.4913 38.0743 38.7365 38.2631C39.1737 38.5994 39.6766 38.5348 40.0957 38.3407C40.135 38.3226 40.1741 38.303 40.213 38.2822C40.2001 38.735 40.3754 39.1662 40.8315 39.4512C41.4372 39.8298 42.0713 39.5902 42.5573 39.2299C42.6345 39.1727 42.711 39.1104 42.7866 39.044C42.8145 39.2859 42.9093 39.5244 43.1318 39.6975L43.15 39.7109L43.1733 39.7258C43.5364 39.9393 43.8943 40.0295 44.2437 39.9904C44.5902 39.9517 44.8836 39.7909 45.129 39.5837C45.2861 39.4513 45.4321 39.2918 45.5685 39.1184C45.6484 39.3223 45.7866 39.5009 45.9953 39.6252C46.2756 39.792 46.6275 39.8271 47.011 39.776C47.0499 39.7708 47.0877 39.7598 47.1232 39.7433C49.2102 38.7756 50.3836 36.5786 51.0036 34.2432C51.5782 32.0784 51.7001 29.7152 51.5965 27.8806C51.8679 27.8894 52.1749 27.8786 52.4676 27.8393C52.5983 27.8217 52.7312 27.7978 52.86 27.7654C52.9712 27.7375 53.0794 27.7035 53.1806 27.6619C53.3918 27.5753 53.6237 27.4353 53.7579 27.2005C53.9482 26.8676 53.849 26.5102 53.6852 26.2372C53.5189 25.9599 53.243 25.6863 52.9033 25.43C52.2186 24.9133 51.1869 24.4017 49.9424 24.033L49.8393 24.0024L49.8158 23.9955C48.645 23.6485 47.5238 23.3161 46.5939 23.185C45.6873 23.0572 44.7912 23.0932 44.248 23.6968C44.0283 23.9409 43.919 24.2227 43.959 24.5204C43.9968 24.8002 44.1577 25.0237 44.3257 25.1881C44.449 25.3086 44.5944 25.4153 44.746 25.5077C44.2721 25.7329 43.6324 26.0022 42.9543 26.2576C41.8635 26.6683 40.762 27.0092 40.1864 27.0698C39.7641 27.1142 38.9198 27.2324 38.1727 27.6553C37.402 28.0916 36.7296 28.8595 36.729 30.1481C36.7288 30.7556 36.9486 31.2196 37.4008 31.475C37.8123 31.7072 38.3387 31.7188 38.8521 31.6505ZM44.8257 24.2168C45.0787 23.9358 45.5896 23.8285 46.4853 23.9547C47.3517 24.0769 48.4196 24.3924 49.6186 24.7478L49.7215 24.7782C50.8996 25.1273 51.8417 25.6026 52.4351 26.0505C52.7348 26.2765 52.9242 26.4795 53.0185 26.6369C53.0475 26.6851 53.064 26.7234 53.0733 26.7519C53.0788 26.7693 53.0817 26.7831 53.083 26.7935C53.0847 26.8062 53.0838 26.8123 53.0834 26.8134L53.083 26.8148C53.0735 26.8313 53.0284 26.8842 52.8854 26.9428C52.8295 26.9658 52.7661 26.9866 52.6962 27.005C52.597 27.0311 52.485 27.0525 52.3639 27.0689C51.9498 27.1247 51.4978 27.1113 51.2355 27.072C51.1182 27.0543 50.9992 27.0913 50.9125 27.1723C50.8258 27.2532 50.7808 27.3693 50.7905 27.4875C50.9374 29.3093 50.848 31.7998 50.2523 34.0437C49.6592 36.2776 48.5902 38.177 46.851 39.0122C46.5985 39.0381 46.4611 38.9977 46.3929 38.9572C46.3345 38.9223 46.2866 38.8642 46.2671 38.7371C46.2214 38.4397 46.3618 37.9122 46.7546 37.2576C46.8624 37.0778 46.8082 36.8448 46.632 36.7311C46.4557 36.6174 46.2212 36.664 46.1018 36.8365C45.9361 37.0757 45.776 37.3476 45.6217 37.6096L45.6175 37.6168C45.2818 38.1868 44.9772 38.6948 44.6276 38.9896C44.4623 39.1292 44.3086 39.2009 44.1573 39.2179C44.0154 39.2338 43.8343 39.2059 43.5988 39.0738C43.5743 39.044 43.5293 38.9507 43.5702 38.6921C43.614 38.413 43.7429 38.0599 43.9207 37.6856C44.008 37.5019 43.9389 37.2822 43.7626 37.1813C43.5861 37.0805 43.3618 37.1325 43.2479 37.3009C42.8862 37.8347 42.4825 38.3178 42.0944 38.6054C41.6995 38.8982 41.4376 38.9134 41.2433 38.792C41.0491 38.6705 40.981 38.5139 40.9905 38.2923C41.0013 38.0411 41.1169 37.7208 41.3184 37.3655C41.4148 37.1951 41.3697 36.9794 41.2125 36.8623C41.0556 36.7452 40.836 36.7632 40.7001 36.9043C40.3752 37.2421 40.0522 37.5041 39.7691 37.6354C39.4937 37.7629 39.3309 37.7388 39.2119 37.648C39.2068 37.6419 39.1813 37.6051 39.1751 37.4871C39.169 37.3766 39.1825 37.2303 39.2197 37.0476C39.232 36.9868 39.247 36.922 39.2646 36.8531C39.4056 36.305 39.6964 35.595 40.0727 34.8151C40.8229 33.2611 41.8768 31.5038 42.6195 30.36C42.6668 30.2874 42.6871 30.2035 42.6814 30.1213C42.6759 30.0431 42.6469 29.9664 42.5949 29.9026C42.488 29.7718 42.3091 29.7248 42.1517 29.7864L41.9918 29.8492L41.987 29.8511C40.8745 30.2877 39.671 30.7573 38.7494 30.88C38.2839 30.942 37.9686 30.903 37.783 30.7981C37.6384 30.7165 37.5061 30.5568 37.5063 30.1484C37.5067 29.1937 37.9776 28.6589 38.5556 28.3317C39.1572 27.9913 39.8672 27.885 40.2676 27.8429C40.9552 27.7705 42.1434 27.3935 43.2282 26.9851C44.3131 26.5765 45.3837 26.1027 45.8293 25.8056C45.9528 25.7232 46.0187 25.5778 45.9989 25.4306C45.9792 25.2835 45.8775 25.1604 45.7367 25.1135C45.4461 25.0167 45.0797 24.8381 44.8692 24.6323C44.7658 24.5311 44.735 24.4574 44.7295 24.4166C44.7263 24.3936 44.7225 24.3315 44.8257 24.2168Z'
        fill='#202124'
      />
      <path
        d='M18.1151 21.9568C16.8491 21.7206 15.1035 21.6852 12.96 21.9532L12.9321 21.9577C11.5078 22.2426 10.6388 22.3091 10.4059 22.3091C10.2721 22.3091 10.0084 22.4458 10.1056 22.8345C10.1784 23.126 10.4422 23.0824 10.5526 23.0824C10.9542 23.0635 11.815 22.9732 13.0704 22.7228C14.9722 22.4861 16.517 22.4994 17.6553 22.668V24.7936C17.4346 24.8345 17.2161 24.8758 17.0319 24.9234C16.8928 24.9594 16.7523 25.0037 16.6284 25.0635C16.5083 25.1216 16.3697 25.2104 16.2741 25.3536C16.1593 25.526 16.1997 25.7582 16.3661 25.8815C17.5634 26.7683 19.1633 28.1239 20.3706 29.3424C20.9766 29.9539 21.4687 30.516 21.7631 30.9583C21.9122 31.1823 21.9936 31.3506 22.0238 31.4631C22.0295 31.4844 22.0327 31.5006 22.0344 31.5124C21.9802 31.5517 21.8989 31.5779 21.7651 31.5723C21.5964 31.5652 21.3795 31.5071 21.1248 31.3978C20.6198 31.1812 20.0626 30.8065 19.6132 30.4635C19.5206 30.3852 19.4326 30.3132 19.3515 30.2491C19.2832 30.1948 19.22 30.1461 19.1638 30.1039C18.9955 29.9776 18.7571 30.0082 18.6262 30.1731C18.4954 30.3378 18.5194 30.5768 18.6805 30.7122C18.8065 30.8182 18.9574 30.9404 19.1255 31.0692C19.5423 31.4231 20.0311 31.8946 20.3249 32.3333C20.4745 32.5568 20.5485 32.7356 20.5633 32.8622C20.5748 32.9608 20.5534 33.0157 20.4824 33.0724C20.3938 33.1434 20.263 33.1831 20.0568 33.1611C19.8457 33.1385 19.5893 33.0537 19.3007 32.9148C18.7256 32.6379 18.1115 32.1899 17.6259 31.8045C17.5355 31.7304 17.4592 31.6687 17.3923 31.6146C17.3304 31.5645 17.2765 31.5211 17.2271 31.4802L17.2053 31.4621C17.0396 31.3246 16.7948 31.3473 16.6576 31.5122C16.5204 31.6772 16.5428 31.9221 16.7077 32.0594L16.7324 32.0798C16.8489 32.1765 16.9859 32.2889 17.1378 32.4094C17.5374 32.7373 18.0428 33.1728 18.3759 33.5792C18.5457 33.7866 18.6421 33.9528 18.6754 34.0685C18.6905 34.1217 18.6865 34.1449 18.6856 34.1488L18.6835 34.1514C18.682 34.1532 18.6791 34.1562 18.6746 34.1602C18.6048 34.2214 18.4803 34.2679 18.2525 34.2478C18.025 34.2278 17.743 34.1441 17.4251 34.0064C16.7918 33.732 16.1016 33.2808 15.5746 32.8856C15.4058 32.7591 15.1671 32.7901 15.0363 32.9554C14.9058 33.1207 14.9306 33.3601 15.0925 33.495C15.5858 33.9061 15.9763 34.4902 16.0858 34.9283C16.141 35.1492 16.1078 35.2584 16.0796 35.3003C16.0615 35.3267 15.9894 35.409 15.7053 35.41C13.2325 35.3409 11.3292 33.7403 9.9366 31.6695C8.60777 29.6932 7.78907 27.35 7.42507 25.7161C7.3848 25.3608 7.2572 25.2636 6.99622 25.2636C6.8019 25.2636 6.60747 25.458 6.61547 25.6474C6.96694 27.3591 7.83082 29.9309 9.29155 32.1033C10.75 34.2722 12.8529 36.1106 15.6897 36.1872L15.7002 36.1874C16.1298 36.1874 16.5054 36.0575 16.7231 35.7363C16.9301 35.4305 16.9193 35.0574 16.84 34.7398C16.8258 34.6827 16.8087 34.625 16.7889 34.5668C16.8983 34.6214 17.0076 34.6726 17.1159 34.7196C17.4712 34.8735 17.8398 34.9917 18.1842 35.0222C18.5285 35.0525 18.8976 34.9981 19.1866 34.7452C19.3191 34.6292 19.4083 34.4825 19.4453 34.3144C19.4808 34.1521 19.4626 33.994 19.4227 33.8545L19.4132 33.8236L19.4056 33.8C19.5954 33.8661 19.7865 33.914 19.974 33.934C20.3135 33.9703 20.6711 33.917 20.9681 33.6794C21.2717 33.4365 21.3746 33.1054 21.3353 32.7714C21.3233 32.6695 21.2985 32.5682 21.2641 32.4685C21.2379 32.3922 21.2061 32.317 21.17 32.2433C21.3579 32.3019 21.5478 32.3412 21.7327 32.349C22.0413 32.3619 22.3645 32.2863 22.6153 32.0355C22.8499 31.801 22.8359 31.4895 22.7746 31.2613C22.7118 31.0282 22.5764 30.7773 22.4102 30.5275C22.0737 30.022 21.5395 29.4175 20.9229 28.7953C19.8516 27.7141 18.4863 26.5341 17.3439 25.6477C17.4847 25.6157 17.6418 25.5867 17.8166 25.5545L17.8234 25.5531C17.9164 25.5359 18.0145 25.5178 18.1176 25.4978C18.3005 25.4625 18.4326 25.3025 18.4326 25.1163V22.3389C18.4326 22.1517 18.2992 21.9911 18.1151 21.9568Z'
        fill='#202124'
      />
    </g>
    <defs>
      <clipPath id='clip0_2699_3565'>
        <rect width='60' height='40' fill='white' />
      </clipPath>
    </defs>
  </SvgIcon>
);
