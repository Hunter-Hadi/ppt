import { atom } from 'recoil';

import { IPaymentType } from '../type';

export const CreateSessionLoadingAtom = atom<boolean>({
  key: 'CreateSessionLoadingAtom',
  default: false,
});

export const PricingPaymentTypeAtom = atom<IPaymentType>({
  key: 'PricingPaymentTypeAtom',
  default: 'yearly',
});
