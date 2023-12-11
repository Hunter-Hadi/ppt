import { useQuery } from '@tanstack/react-query';
import { uniqBy } from 'lodash-es';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { IOptionType } from '@/components/select/BaseSelect';
import {
  IPromptCategoryApiData,
  IPromptListType,
} from '@/features/prompt/types';
import { PROMPT_API } from '@/utils/api';
import { list2Options } from '@/utils/dataHelper/arrayHelper';
import { get } from '@/utils/request';

const usePromptCategories = ({
  defaultCategory,
  defaultUseCase,
}: {
  defaultCategory?: string;
  defaultUseCase?: string;
} = {}) => {
  const router = useRouter();
  const [tabActive] = useState<IPromptListType>('Public');
  const [categoryOptions, setCategoryOptions] = useState<IOptionType[]>([]);
  const [useCaseOptions, setUseCaseOptions] = useState<IOptionType[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<IOptionType | null>(
    null,
  );
  const [currentUseCase, setCurrentUseCase] = useState<IOptionType | null>(
    null,
  );
  const [searchKeyword, setSearchKeyword] = useState<string | null>(null);
  const { isFetching, data } = useQuery({
    queryKey: [PROMPT_API.PROMPT_CATEGORY],
    queryFn: () =>
      get<{
        status: string;
        data: IPromptCategoryApiData[];
        msg: string;
      }>(PROMPT_API.PROMPT_CATEGORY, {}),
    refetchOnWindowFocus: false,
  });
  const setCategoryAndUseCase = (
    category: IOptionType,
    useCaseValue?: string,
  ) => {
    setCurrentCategory(category);
    const newUseCaseOptions = [
      {
        label: 'All',
        value: 'All',
      },
    ].concat(list2Options(category?.origin?.use_cases || []));
    setUseCaseOptions(uniqBy(newUseCaseOptions, 'value'));
    let useCaseOption: IOptionType = newUseCaseOptions[0];
    if (useCaseValue) {
      const findUseCaseOption = newUseCaseOptions.find(
        (item) => item.value === useCaseValue,
      );
      if (findUseCaseOption) {
        useCaseOption = findUseCaseOption;
      }
    }
    setCurrentUseCase(useCaseOption);
  };
  useEffect(() => {
    if (router.isReady && !loaded) {
      const query = router.query;
      const prevCategory =
        decodeURIComponent(query.category as string) || defaultCategory;
      const preUseCase =
        decodeURIComponent(query.use_case as string) || defaultUseCase;
      const preKeyword = query.keyword
        ? decodeURIComponent(query.keyword as string)
        : undefined;
      if (!isFetching && data?.data) {
        const newCategoryOptions = list2Options(data.data, {
          labelKey: 'category',
          valueKey: 'category',
        });
        setCategoryOptions(uniqBy(newCategoryOptions, 'value'));
        if (prevCategory) {
          const categoryOption = newCategoryOptions.find(
            (item) => item.value === prevCategory,
          );
          if (categoryOption) {
            setCategoryAndUseCase(categoryOption, preUseCase);
          } else {
            setCategoryAndUseCase(newCategoryOptions[0]);
          }
        } else {
          setCategoryAndUseCase(newCategoryOptions[0]);
        }
        if (preKeyword) {
          setSearchKeyword(preKeyword);
        }
        setLoaded(true);
      }
    }
  }, [router.isReady, isFetching, data, loaded]);
  useEffect(() => {
    if (loaded) {
      const useCaseOptions = [
        {
          label: 'All',
          value: 'All',
        },
      ].concat(list2Options(currentCategory?.origin?.use_cases || []));
      setUseCaseOptions(uniqBy(useCaseOptions, 'value'));
      if (useCaseOptions.find((item) => item.value === currentUseCase?.value)) {
        //
      } else {
        setCurrentUseCase(useCaseOptions[0]);
      }
    }
  }, [loaded, currentCategory, currentUseCase]);
  return {
    loaded,
    tabActive,
    categoryOptions,
    useCaseOptions,
    currentCategory,
    currentUseCase,
    searchKeyword,
    setSearchKeyword,
    setCurrentCategory,
    setCurrentUseCase,
  };
};
export { usePromptCategories };
