import { useFormik } from 'formik'
import { useContext, useMemo } from 'react'
import type { FormLanguageData } from '../../../../../../common/i18n/types.mjs'
import { AdminSettingsCtx } from '../../../../../context/AdminSettingsContext.js'
import type { LanguageProps } from './Language.js'

export const useLanguageProps = (): LanguageProps => {
  const { language, saveLanguageData } = useContext(AdminSettingsCtx)

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
