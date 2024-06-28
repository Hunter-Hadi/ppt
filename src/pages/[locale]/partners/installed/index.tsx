import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import PartnersInstallPage from '@/page_components/PartnersPages/InstalledPage';

export default PartnersInstallPage;

const getStaticPaths = makeStaticPaths();
const getStaticProps = makeStaticProps();
export { getStaticPaths, getStaticProps };
