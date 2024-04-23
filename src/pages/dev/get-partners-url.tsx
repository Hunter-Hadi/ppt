import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { makeStaticProps } from '@/i18n/utils/staticHelper';
import globalSnackbar from '@/utils/globalSnackbar';

const PartnersPageType = [
  {
    label: 'Updated',
    value: 'updated',
  },
  {
    label: 'Installed',
    value: 'installed',
  },
  {
    label: 'Uninstalled',
    value: 'uninstalled',
  },
];

const GetPartnersUrl = () => {
  const [outputLink, setOutputLink] = React.useState<string>('');

  const [formData, setFormData] = React.useState({
    pageType: 'updated',
    partnersName: '',
    partnersPropRef: '',
    changelogText: '',
    changelogLink: '',
  });

  const handleClear = () => {
    setFormData({
      pageType: 'updated',
      partnersName: '',
      partnersPropRef: '',
      changelogText: '',
      changelogLink: '',
    });
  };

  const handleGenerate = () => {
    const {
      partnersName,
      partnersPropRef,
      changelogText,
      changelogLink,
      pageType,
    } = formData;

    const searchParams = new URLSearchParams();

    if (!partnersName) {
      globalSnackbar.error('Partners name is required');
      return;
    }

    searchParams.append('name', partnersName);

    if (partnersPropRef) {
      searchParams.append('propRef', partnersPropRef);
    }
    if (changelogText) {
      searchParams.append('changelogText', changelogText);
    }
    if (changelogLink) {
      searchParams.append('changelogLink', changelogLink);
    }

    // const output = `${WWW_PROJECT_LINK}/partners/${pageType}?${searchParams.toString()}`;
    const output = `http://localhost:3001/partners/${pageType}?${searchParams.toString()}`;

    globalSnackbar.success('Generate success!');

    setOutputLink(output);
  };

  return (
    <Stack maxWidth={980} mx='auto' flex={1} py={8} width='100%'>
      <Typography variant='h2'>Get partners link quickly</Typography>

      <Stack pt={6} width={'100%'} spacing={4}>
        <FormControl>
          <FormLabel id='demo-controlled-radio-buttons-group'>
            Partners page type
          </FormLabel>
          <RadioGroup
            value={formData.pageType}
            onChange={(e, value) => {
              setFormData((pre) => ({
                ...pre,
                pageType: value,
              }));
            }}
          >
            <Stack direction={'row'} spacing={1}>
              {PartnersPageType.map((pageItem) => (
                <FormControlLabel
                  key={pageItem.value}
                  value={pageItem.value}
                  control={<Radio />}
                  label={pageItem.label}
                />
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl>
          <TextField
            label='Partners name'
            value={formData.partnersName}
            onChange={(e) => {
              const value = e.target.value;
              setFormData((pre) => ({
                ...pre,
                partnersName: value,
              }));
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            label='Partners prop ref'
            value={formData.partnersPropRef}
            onChange={(e) => {
              const value = e.target.value;
              setFormData((pre) => ({
                ...pre,
                partnersPropRef: value,
              }));
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            label='Changelog text'
            value={formData.changelogText}
            onChange={(e) => {
              const value = e.target.value;
              setFormData((pre) => ({
                ...pre,
                changelogText: value,
              }));
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            label='Changelog link'
            multiline
            rows={4}
            value={formData.changelogLink}
            onChange={(e) => {
              const value = e.target.value;
              setFormData((pre) => ({
                ...pre,
                changelogLink: value,
              }));
            }}
          />
        </FormControl>

        <Stack
          direction={'row'}
          alignItems='center'
          justifyContent='flex-end'
          spacing={2}
        >
          <Button
            variant='outlined'
            sx={{
              py: 1,
              minWidth: 120,
              fontSize: 18,
            }}
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            variant='contained'
            onClick={handleGenerate}
            sx={{
              py: 1,
              minWidth: 120,
              fontSize: 18,
            }}
          >
            Generate
          </Button>
        </Stack>
      </Stack>

      <Stack pt={6} spacing={2}>
        <Typography color={'primary.main'} fontWeight={700}>
          Output partners link:
        </Typography>

        <Box
          sx={{
            p: 1,
            overflow: 'auto',
            overflowWrap: 'break-word',
            maxHeight: 360,
            minHeight: 200,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          {outputLink}
        </Box>

        <CopyToClipboard
          text={outputLink}
          options={{
            message: 'Copied!',
            format: 'text/plain',
          }}
          onCopy={() => {
            globalSnackbar.success('Copy success!');
          }}
        >
          <Button
            variant='contained'
            sx={{
              py: 2,
            }}
          >
            Copy output partners link
          </Button>
        </CopyToClipboard>
      </Stack>
    </Stack>
  );
};

export default GetPartnersUrl;

const getStaticProps = makeStaticProps();
export { getStaticProps };
