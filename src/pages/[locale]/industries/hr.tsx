import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import HRPages from '@/page_components/IndustriesPages/HRPages';

export default HRPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
