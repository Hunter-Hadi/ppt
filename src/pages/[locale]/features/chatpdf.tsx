import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import ChatPDFPages from '@/page_components/FeaturesLandingPages/ChatPDFPages';

export default ChatPDFPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
