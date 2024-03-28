import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import LanguagesPages from '@/page_components/LanguagesPages';
export default LanguagesPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
