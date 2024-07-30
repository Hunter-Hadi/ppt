import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import { makeStaticProps } from '@/i18n/utils/staticHelper'

const ChatgptToNotion = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(
      `https://www.maxai.me/partners/installed?name=ChatGPT+to+Notion&propRef=installed-chatgpt-to-notion&changelogText=To+get+started%2C+click+here.&changelogLink=https%3A%2F%2Fapi.notion.com%2Fv1%2Foauth%2Fauthorize%3Fclient_id%3D323a93e9-98a0-4f5a-a194-af728f1b817e%26response_type%3Dcode%26owner%3Duser%26redirect_uri%3Dhttps%253A%252F%252Ftheo-lartigau.notion.site%252FChatGPT-to-Notion-af29d9538dca4493a15bb4ed0fde7f91`,
    )
  }, [router])

  return <AppLoadingLayout loading />
}
export default ChatgptToNotion

const getStaticProps = makeStaticProps()
export { getStaticProps }
