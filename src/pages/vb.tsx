import { makeStaticProps } from '@/i18n/utils/staticHelper';
const variantB = () => {
  return <h1>variant B</h1>;
};

export default variantB;

const getStaticProps = makeStaticProps();
export { getStaticProps };
