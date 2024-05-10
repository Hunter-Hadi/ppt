import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import DpPages from '@/page_components/DpPages';
export default DpPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
