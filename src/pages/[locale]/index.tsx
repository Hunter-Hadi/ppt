import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import LandingPages from '@/page_components/LandingPages';
export default LandingPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
