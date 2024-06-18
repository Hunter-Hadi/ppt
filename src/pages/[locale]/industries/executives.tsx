import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import ExecutivesPages from '@/page_components/IndustriesPages/ExecutivesPages';

export default ExecutivesPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
