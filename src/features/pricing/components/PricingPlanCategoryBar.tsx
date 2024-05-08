import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, useEffect, useMemo } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import {
  PricingPaymentTypeAtom,
  PricingPlanCategoryState,
} from '@/features/pricing/store';
import { IPricingPlanCategory } from '@/features/pricing/type';

interface IPricingPlanCategoryBarProps {
  onlyRenderCategory?: IPricingPlanCategory;
}

const PricingPlanCategoryBar: FC<IPricingPlanCategoryBarProps> = ({
  onlyRenderCategory,
}) => {
  const { t } = useTranslation();

  const [pricingPlanCategory, setPricingPlanCategory] = useRecoilState(
    PricingPlanCategoryState,
  );

  const setPaymentType = useSetRecoilState(PricingPaymentTypeAtom);

  const PRICING_CATEGORY = useMemo<
    {
      label: string;
      value: IPricingPlanCategory;
    }[]
  >(() => {
    return [
      {
        label: t('pages:pricing__plan_category__individual__label'),
        value: 'individual',
      },
      {
        label: t('pages:pricing__plan_category__team__label'),
        value: 'team',
      },
    ];
  }, [t]);

  const renderCategory = useMemo(() => {
    if (onlyRenderCategory) {
      setPricingPlanCategory(onlyRenderCategory);
      return PRICING_CATEGORY.filter(
        (item) => item.value === onlyRenderCategory,
      );
    }

    return PRICING_CATEGORY;
  }, [PRICING_CATEGORY, onlyRenderCategory]);

  useEffect(() => {
    // 每次切换到team plan之后，再切回 individual plan，都默认选中yearly - @huangsong - 2024-05-02
    if (pricingPlanCategory === 'individual') {
      setPaymentType('yearly');
    }
  }, [pricingPlanCategory]);

  return (
    <Stack
      direction='row'
      justifyContent='center'
      spacing={1}
      pt={1}
      sx={{
        bgcolor: '#E9D7FE',
      }}
    >
      {renderCategory.map((pricingCategoryItem) => {
        const isActive = pricingPlanCategory === pricingCategoryItem.value;
        return (
          <Stack
            component={'button'}
            key={pricingCategoryItem.value}
            justifyContent={'center'}
            alignItems='center'
            sx={{
              minWidth: {
                xs: 120,
                sm: 220,
              },
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              bgcolor: isActive ? 'background.paper' : '#FFFFFF52',
              color: isActive ? 'primary.main' : 'text.secondary',
              px: 3,
              py: 2,
              cursor: 'pointer',
              outline: 'none',
              border: 'none',
              transition: 'all 0.3s ease',
            }}
            onClick={() => {
              setPricingPlanCategory(pricingCategoryItem.value);
              // 因为现在 team plan 只有月付，所以在改变为 team plan 时需要将，paymentType 改为 monthly
              if (pricingCategoryItem.value === 'team') {
                setPaymentType('monthly');
              }
            }}
          >
            <Typography
              variant='custom'
              fontSize={16}
              lineHeight={1.5}
              fontWeight={500}
            >
              {pricingCategoryItem.label}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default PricingPlanCategoryBar;
