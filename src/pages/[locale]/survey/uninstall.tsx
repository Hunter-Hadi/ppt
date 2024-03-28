import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import UninstallPages from '@/page_components/SurveyPages/UninstallPages';
export default UninstallPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
