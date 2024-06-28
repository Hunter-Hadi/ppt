import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import PartnersUpdatePage from '@/page_components/PartnersPages/UpdatePage';

export default PartnersUpdatePage;

const getStaticPaths = makeStaticPaths();
const getStaticProps = makeStaticProps();
export { getStaticPaths, getStaticProps };
