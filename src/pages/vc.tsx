import { makeStaticProps } from '@/i18n/utils/staticHelper';
const variantC = () => {
  return <h1>variant C</h1>;
};

export default variantC;

const getStaticProps = makeStaticProps();
export { getStaticProps };
