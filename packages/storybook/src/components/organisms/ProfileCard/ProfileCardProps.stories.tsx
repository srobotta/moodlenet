// import { t } from '@lingui/macro'
import { overrideDeep } from '@moodlenet/component-library/common'
import type { ProfileFormValues } from '@moodlenet/web-user/common'
import type { MainProfileCardProps } from '@moodlenet/web-user/ui'
import { action } from '@storybook/addon-actions'
import {
  profileStoriesValidationSchema,
  useProfileStoryProps,
} from 'components/pages/Profile/props.stories.js'
import { useFormik } from 'formik'
import type { PartialDeep } from 'type-fest'

export const useMainProfileCardStoryProps = (
  overrides?: PartialDeep<MainProfileCardProps>,
): MainProfileCardProps => {
  const profileProps = useProfileStoryProps()
  const { access, actions, profileForm, mainProfileCardSlots } = profileProps
  const { editProfile } = actions
  const form = useFormik<ProfileFormValues>({
    initialValues: profileForm,
    validationSchema: profileStoriesValidationSchema,
    onSubmit: values => {
      return editProfile(values)
    },
  })
  return overrideDeep<MainProfileCardProps>(
    {
      access: access,
      form: form,
      isEditing: false,
      slots: mainProfileCardSlots,
      toggleIsEditing: action('toggle is editting'),
    },

    { ...overrides },
  )
}