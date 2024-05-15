import { makeStaticProps } from '@/i18n/utils/staticHelper';
const variantA = () => {
  return <h1>variant A</h1>;
};

export default variantA;

const getStaticProps = makeStaticProps();
export { getStaticProps };
