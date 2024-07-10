import { makeStaticPaths, makeStaticProps } from '@/i18n/utils/staticHelper'
import PartnersEmbedPage from '@/page_components/PartnersPages/EmbedPage'

export default PartnersEmbedPage

const getStaticPaths = makeStaticPaths()
const getStaticProps = makeStaticProps()
export { getStaticPaths, getStaticProps }
