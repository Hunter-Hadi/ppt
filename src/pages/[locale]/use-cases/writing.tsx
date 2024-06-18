import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import WritingPages from '@/page_components/UseCasePages/WritingPages';
export default WritingPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
