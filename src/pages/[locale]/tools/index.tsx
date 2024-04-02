import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import ToolsPages from '@/page_components/ToolsPages';

export default ToolsPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
