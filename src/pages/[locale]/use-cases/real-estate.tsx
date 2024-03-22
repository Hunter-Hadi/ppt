import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import RealEstatePages from '@/page_components/UseCasePages/RealEstatePages';

export default RealEstatePages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
