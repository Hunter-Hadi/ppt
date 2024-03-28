import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import ContactUsPages from '@/page_components/ContactUsPages';
export default ContactUsPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
