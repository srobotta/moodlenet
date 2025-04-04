import type { FormLanguageData } from '@moodlenet/core'
import { useFormik } from 'formik'
import { useContext, useMemo } from 'react'
import { AdminSettingsCtx } from '../../../../../context/AdminSettingsContext.js'
import type { LanguageProps } from './Language.js'
//import { getLanguage } from '../../../../../../server/lib.mjs'

/*
const v = await getLanguage()
const lang = {
  available: v.data.languages.available.join(', ') ?? 'en',
  default: v.data.languages?.default ?? 'en'
}
  */
export const useLanguageProps = (): LanguageProps => {
  const { language, saveLanguageData } = useContext(AdminSettingsCtx)

  console.log(language)

  const form = useFormik<FormLanguageData>({
    initialValues: language.rawData,
    async onSubmit(data) {
      await saveLanguageData(data)
    },
    enableReinitialize: true,
  })

  const generalProps = useMemo<LanguageProps>(() => {
    return {
      form,
      updateSuccess: false,
    }
  }, [form])

  return generalProps
}
