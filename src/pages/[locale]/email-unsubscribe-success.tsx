import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import EmailUnsubscribeSuccessPages from '@/page_components/EmailUnsubscribeSuccessPages';
export default EmailUnsubscribeSuccessPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
