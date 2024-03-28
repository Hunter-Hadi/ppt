import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import PromptsPages from '@/page_components/PromptPages';
export default PromptsPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
