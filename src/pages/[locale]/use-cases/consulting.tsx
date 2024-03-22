import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import ConsultingPages from '@/page_components/UseCasePages/ConsultingPages';

export default ConsultingPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
