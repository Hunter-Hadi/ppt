import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import AITranslatorPages from '@/page_components/FeaturesLandingPages/AITranslatorPages';

export default AITranslatorPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
