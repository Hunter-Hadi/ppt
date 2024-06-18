import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import EducationPages from '@/page_components/IndustriesPages/EducationPages';

export default EducationPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
