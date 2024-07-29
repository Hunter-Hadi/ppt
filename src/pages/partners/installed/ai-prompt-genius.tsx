import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import { makeStaticProps } from '@/i18n/utils/staticHelper'

const AIPromptGenius = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(
      `https://www.maxai.me/partners/installed?name=AI+Prompt+Genius&propRef=installed-ai-prompt-genius&changelogLink=https%3A%2F%2Fdocs.aipromptgenius.app%2Ftutorial%2F01-create-edit-and-use-prompts%2F`,
    )
  }, [router])

  return <AppLoadingLayout loading />
}
export default AIPromptGenius

const getStaticProps = makeStaticProps()
export { getStaticProps }
