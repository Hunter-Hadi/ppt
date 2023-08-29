import styled from '@emotion/styled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  Tab,
  Tabs,
  TabsProps,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useRef } from 'react';

import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import { BaseSelect } from '@/components/select/BaseSelect';
import { usePromptCategories } from '@/features/prompt';
import { APP_PROJECT_LINK } from '@/global_constants';
import snackNotifications from '@/utils/globalSnackbar';

export const GrayTabs = styled(({ ...props }: TabsProps) => (
  <Tabs {...props} />
))(() => ({
  '&': {
    // background: '#f00',
  },
  '.MuiTab-root': {
    padding: '6px 16px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    color: 'rgba(0, 0, 0, 0.6)',
    minHeight: 52,
  },
  '.MuiTab-root.Mui-selected': {
    background: 'rgba(0, 0, 0, 0.08)',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  '.MuiTabs-indicator': {
    backgroundColor: '#d8d8d8',
  },
}));

const PromptTagSelector: FC<{
  onLoaded?: () => void;
}> = (props) => {
  const { onLoaded } = props;
  const router = useRouter();
  const {
    loaded,
    tabActive,
    categoryOptions,
    currentCategory,
    useCaseOptions,
    currentUseCase,
    searchKeyword,
    setSearchKeyword,
    setCurrentUseCase,
    setCurrentCategory,
  } = usePromptCategories();

  const inputTimer = useRef<number | null>(null);
  const searchValue = useRef<string | null>(null);

  useEffect(() => {
    if (!loaded) return;
    searchValue.current = searchKeyword;

    onLoaded && onLoaded();
  }, [loaded, onLoaded, searchKeyword]);
  useEffect(() => {
    if (loaded && currentUseCase && currentCategory) {
      router.replace({
        pathname: '/prompts',
        query: {
          ...router.query,
          category: encodeURIComponent(currentCategory.value),
          use_case: encodeURIComponent(currentUseCase.value),
          keyword: encodeURIComponent(searchKeyword || ''),
        },
      });
    }
  }, [loaded, currentUseCase, currentCategory, searchKeyword]);

  const handleDoSearch = useCallback(() => {
    const value = searchValue.current;
    if (value !== null && value !== '' && value.length <= 2) {
      // 解析失败报错显示错误提示
      snackNotifications.warning('Enter at least 3 characters to search.', {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
      return;
    }
    setSearchKeyword(value);
  }, [setSearchKeyword]);

  const startInputSearchTimer = useCallback(() => {
    if (inputTimer.current) {
      clearTimeout(inputTimer.current);
    }
    inputTimer.current = window.setTimeout(() => {
      if (searchValue.current && searchValue.current?.length >= 3) {
        handleDoSearch();
      }
    }, 600);
  }, [handleDoSearch]);

  return (
    <Stack
      width={'100%'}
      direction={'row'}
      alignItems={'center'}
      flexWrap={'wrap'}
      gap={2}
    >
      <AppLoadingLayout loading={!loaded}>
        <Box flex={1} flexBasis={'100%'}>
          <GrayTabs value={tabActive} variant='fullWidth'>
            <Tab
              icon={<FavoriteIcon />}
              iconPosition='start'
              value={'Favorites'}
              label='Favorites'
              onClick={() =>
                (location.href = `${APP_PROJECT_LINK}/prompts?tab_active=Favorites`)
              }
            />
            <Tab value={'Public'} label='Public' />
            <Tab
              value={'Own'}
              label='Own'
              onClick={() =>
                (location.href = `${APP_PROJECT_LINK}/prompts?tab_active=Own`)
              }
            />
          </GrayTabs>
        </Box>
        <BaseSelect
          sx={{ height: 44 }}
          label={'Category'}
          options={categoryOptions}
          value={currentCategory?.value}
          onChange={async (value: any, option: any) => {
            setCurrentCategory(option);
          }}
        />
        <BaseSelect
          sx={{ height: 44 }}
          label={'Use case'}
          options={useCaseOptions}
          value={currentUseCase?.value}
          onChange={async (value, option) => {
            setCurrentUseCase(option);
          }}
        />
        <TextField
          defaultValue={searchKeyword}
          label='Search...'
          variant='outlined'
          size='small'
          sx={{
            width: 220,
            ml: 'auto',
          }}
          onChange={(event: any) => {
            const value = event.target.value;
            searchValue.current = value;
            if (value === '' || value.length > 2) {
              startInputSearchTimer();
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleDoSearch();
            }
          }}
          onBlur={handleDoSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleDoSearch} edge='end'>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </AppLoadingLayout>
    </Stack>
  );
};
export { PromptTagSelector };
