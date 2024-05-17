import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import HomePageContent from '@/features/landing/components/HomePageContent';
import { makeStaticProps } from '@/i18n/utils/staticHelper';
// import LandingPages from '@/page_components/LandingPages';
function HomePage() {
  return (
    <>
      <AppDefaultSeoLayout />
      <HomePageContent testing />
    </>
  );
}
export default HomePage;

const getStaticProps = makeStaticProps();
export { getStaticProps };
