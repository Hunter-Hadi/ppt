import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import ResearchPages from '@/page_components/UseCasePages/ResearchPages';
export default ResearchPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
