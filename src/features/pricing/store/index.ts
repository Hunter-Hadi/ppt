import { atom } from 'recoil';

import { IPaymentType, IPricingPlanCategory } from '@/features/pricing/type';

export const CreateSessionLoadingAtom = atom<boolean>({
  key: 'CreateSessionLoadingAtom',
  default: false,
});

export const PricingPaymentTypeAtom = atom<IPaymentType>({
  key: 'PricingPaymentTypeAtom',
  default: 'yearly',
});

export const PricingPlanCategoryState = atom<IPricingPlanCategory>({
  key: 'PricingPlanCategoryState',
  default: 'individual',
});
