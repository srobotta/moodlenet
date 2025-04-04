/* eslint-disable prettier/prettier */
import { Card, InputTextField, PrimaryButton } from '@moodlenet/component-library'
import type { FormLanguageData } from '@moodlenet/core'
import type { useFormik } from 'formik'
import type { FC } from 'react'
//import { getLanguage } from '../../../../../../server/lib.mjs'

export type LanguageProps = {
  form: ReturnType<typeof useFormik<FormLanguageData>>
}
/*
const v = await getLanguage()
const lang = {
  available: v.data.languages.available.join(', ') ?? 'en',
  default: v.data.languages?.default ?? 'en'
}
*/
export const LanguageMenu = () => <abbr title="Language">Languages</abbr>

export const Language: FC<LanguageProps> = ({ form }) => {
  //form.setValues(lang)
  const canSubmit = form.dirty && form.isValid && !form.isSubmitting && !form.isValidating
  const shouldShowErrors = !!form.submitCount

  return (
    <div className="languages" key="languages">
      {/* {update}
      {updatedSuccessfully} */}
      <Card className="column">
        <div className="title">
          {/* <Trans> */}
          Languages
          {/* </Trans> */}
          <PrimaryButton onClick={form.submitForm} disabled={!canSubmit} className="save-btn">
            Save
          </PrimaryButton>
        </div>
      </Card>
      <Card className="column">
        <div className="parameter">
          <div className="name">Languages</div>
          <div className="actions">
            <InputTextField
              className="language-available"
              placeholder="All enabled languages"
              defaultValue={form.values.available}
              onChange={form.handleChange}
              name="available"
              error={shouldShowErrors && form.errors.available}
            />
          </div>
        </div>
        <div className="parameter">
          <div className="name">Default language</div>
          <div className="actions">
            <InputTextField
              className="language-default"
              placeholder="All enabled languages"
              value={form.values.default}
              onChange={form.handleChange}
              name="default"
              error={shouldShowErrors && form.errors.default}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
