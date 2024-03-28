import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import ReleaseNotesPages from '@/page_components/ReleaseNotesPages';
export default ReleaseNotesPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
