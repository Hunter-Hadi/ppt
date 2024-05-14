import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import YoutubeSummaryPages from '@/page_components/FeaturesLandingPages/YoutubeSummaryPages';

export default YoutubeSummaryPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
