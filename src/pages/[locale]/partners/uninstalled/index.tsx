import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import PartnersUnInstallPage from '@/page_components/PartnersPages/UninstalledPage';

export default PartnersUnInstallPage;

const getStaticPaths = makeStaticPaths();
const getStaticProps = makeStaticProps();
export { getStaticPaths, getStaticProps };
