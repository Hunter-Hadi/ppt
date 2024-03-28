import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper';
import LearningCenterPages from '@/page_components/LearningCenterPages';
export default LearningCenterPages;

const getStaticProps = makeStaticProps();
const getStaticPaths = makeStaticPaths();
export { getStaticPaths, getStaticProps };
