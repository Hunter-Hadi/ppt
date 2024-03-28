import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import PrivacyPages from '@/page_components/PrivacyPages';
export default PrivacyPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
