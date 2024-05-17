import Title1Desc2FeaturesCarousel from '@/features/ab_tester/pages/landing/Title1Desc2FeaturesCarousel';
import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';

export default Title1Desc2FeaturesCarousel;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
