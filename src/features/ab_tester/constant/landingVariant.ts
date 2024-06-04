export type ILandingVariantType =
  | 'features_with_point__hero_section_embed_youtube'
  | 'features_with_scene__hero_section_embed_youtube'
  | 'features_with_point__hero_section_autoplay_video'
  | 'features_with_scene__hero_section_autoplay_video'
  | 'features_with_point__hero_section_autoplay_video_on_bottom'
  | 'features_with_scene__hero_section_autoplay_video_on_bottom';

export const TESTER_LANDING_PATH_TARGET_PATHNAME = [
  '/',
  '/partners/updated',
  '/partners/installed',
  '/partners/uninstalled',
];

export const TEST_LANDING_COOKIE_NAME = 'maxai-lpv-v2';

export const LANDING_VARIANT: ILandingVariantType[] = [
  'features_with_point__hero_section_embed_youtube',
  'features_with_scene__hero_section_embed_youtube',
  'features_with_point__hero_section_autoplay_video',
  'features_with_scene__hero_section_autoplay_video',
  'features_with_point__hero_section_autoplay_video_on_bottom',
  'features_with_scene__hero_section_autoplay_video_on_bottom',
];

export const LANDING_VARIANT_TO_VERSION_MAP: Record<
  ILandingVariantType,
  string
> = {
  features_with_point__hero_section_embed_youtube: '2-1',
  features_with_scene__hero_section_embed_youtube: '2-2',
  features_with_point__hero_section_autoplay_video: '2-3',
  features_with_scene__hero_section_autoplay_video: '2-4',
  features_with_point__hero_section_autoplay_video_on_bottom: '2-5',
  features_with_scene__hero_section_autoplay_video_on_bottom: '2-6',
};
