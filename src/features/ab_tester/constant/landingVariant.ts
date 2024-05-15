type ILandingVariantType = 'landing1' | 'landing2' | 'landing3';

export type ILandingVariantData = {
  variant: ILandingVariantType;
  pathname: string;
};

export const LANDING_VARIANT: ILandingVariantData[] = [
  {
    variant: 'landing1',
    pathname: '/landing/variant-1',
  },
  {
    variant: 'landing2',
    pathname: '/landing/variant-2',
  },
  {
    variant: 'landing3',
    pathname: '/landing/variant-3',
  },
];
