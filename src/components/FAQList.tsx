import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionProps,
  AccordionSummary as MuiAccordionSummary,
  AccordionSummaryProps,
  Box,
  Paper,
  styled,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC, useId, useState } from 'react';

import AppPaperCardLayout from '@/app_layout/AppPaperCardLayout';
import { GaContent, gaEvent } from '@/utils/gtag';

const Accordion = styled((props: AccordionProps) => (
  <Paper variant='outlined' sx={{ mb: 1 }}>
    <MuiAccordion disableGutters elevation={0} square {...props} />
  </Paper>
))(({ theme }) => ({
  //   border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ExpandMoreIcon sx={{ fontSize: '1.4rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255,)' : 'rgba(0, 0, 0,)',
  //   flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  //   borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export type IFAQItem = {
  key: string;
  title: string;
  description: React.ReactNode;
};
export interface IFAQListProps {
  title?: React.ReactNode;
  footer?: React.ReactNode;
  faqList: IFAQItem[];
  defaultExpands?: string[];
  expandAll?: boolean;
  onChange?: (selectedKeys: string[]) => void;
}
const FAQList: FC<IFAQListProps> = ({
  title,
  footer,
  expandAll = false,
  faqList,
  defaultExpands,
  onChange,
}) => {
  const id = useId();
  const router = useRouter();
  const [expandKeys, setExpandKeys] = useState(() => {
    if (defaultExpands) {
      return defaultExpands;
    }
    if (expandAll) {
      return faqList.map((faq) => faq.key);
    }
    return [];
  });
  const handleChange = (newKey: string, title: string) => {
    gaEvent({
      eventName: `${router.pathname.split('/').join('')}_click_FAQ`,
      params: {
        value: title,
        page_path: router.pathname,
      },
    });
    let newKeys = expandKeys;
    if (expandKeys.includes(newKey)) {
      newKeys = expandKeys.filter((key) => key !== newKey);
    } else {
      newKeys = expandKeys.concat(newKey);
    }
    setExpandKeys(newKeys);
    onChange && onChange(newKeys);
  };
  return (
    <Box>
      {title && (
        <AppPaperCardLayout
          sx={{ mb: 1, border: '1px solid rgba(0, 0, 0, 0.12)' }}
        >
          {title}
        </AppPaperCardLayout>
      )}
      {faqList.map((item) => {
        return (
          <Accordion
            key={item.key}
            expanded={expandKeys.includes(item.key)}
            onChange={() => handleChange(item.key, item.title)}
          >
            <AccordionSummary aria-controls='panel1d-content' id={id}>
              <GaContent
                gaEvent={{
                  eventName: `${router.pathname.split('/').join('')}_click_FAQ`,
                  params: {
                    value: item.title,
                    page_path: router.pathname,
                  },
                }}
              >
                <Typography variant='h6' component={'h3'}>
                  {item.title}
                </Typography>
              </GaContent>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant={'body2'}
                component={'div'}
                color={'text.secondary'}
                sx={{ whiteSpace: 'pre-line' }}
              >
                {item.description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
      {footer && (
        <AppPaperCardLayout
          sx={{ mt: 1, border: '1px solid rgba(0, 0, 0, 0.12)' }}
        >
          {footer}
        </AppPaperCardLayout>
      )}
    </Box>
  );
};
export default FAQList;
