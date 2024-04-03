import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import VisionPages from '@/page_components/FeaturesPages/VisionPages';

export default VisionPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
