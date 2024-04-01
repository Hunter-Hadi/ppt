import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import ChatPDFPages from '@/page_components/FeaturesPages/ChatPDFPages';

export default ChatPDFPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
