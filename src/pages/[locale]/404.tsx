import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import Custom404 from '@/page_components/Custom404';

export default Custom404;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
