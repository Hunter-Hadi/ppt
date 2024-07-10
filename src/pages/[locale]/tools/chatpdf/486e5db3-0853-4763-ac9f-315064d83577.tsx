import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import TestSyncLogin from '@/page_components/TestPages/TestSyncLogin';
export default TestSyncLogin;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
