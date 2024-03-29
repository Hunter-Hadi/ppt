import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import ToolBoxPages from '@/page_components/ToolBoxPages';

export default ToolBoxPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
