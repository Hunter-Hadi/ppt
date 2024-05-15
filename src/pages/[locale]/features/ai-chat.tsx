import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import AIChatPages from '@/page_components/FeaturesLandingPages/AIChatPages';

export default AIChatPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
