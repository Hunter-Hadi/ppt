import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import AIInstantReplyPages from '@/page_components/FeaturesLandingPages/AIInstantReplyPages';

export default AIInstantReplyPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
