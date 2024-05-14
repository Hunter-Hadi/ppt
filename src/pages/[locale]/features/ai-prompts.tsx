import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import AIPromptsPages from '@/page_components/FeaturesLandingPages/AIPromptsPages';

export default AIPromptsPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
