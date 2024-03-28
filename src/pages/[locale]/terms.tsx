import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import TermsPages from '@/page_components/TermsPages';
export default TermsPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
