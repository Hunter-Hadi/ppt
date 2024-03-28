import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import UsechatgptPages from '@/page_components/UsechatgptPages';
export default UsechatgptPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
