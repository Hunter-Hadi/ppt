import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import FinancePages from '@/page_components/IndustriesPages/FinancePages';

export default FinancePages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
