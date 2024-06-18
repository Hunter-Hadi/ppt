import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import TechPages from '@/page_components/IndustriesPages/TechPages';

export default TechPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
