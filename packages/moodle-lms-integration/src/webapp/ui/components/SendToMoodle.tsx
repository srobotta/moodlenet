import {
  InputTextField,
  Modal,
  PrimaryButton,
  Snackbar,
  TertiaryButton,
  useSnackbar,
} from '@moodlenet/component-library'
import { t } from '@moodlenet/core/i18n'
import { useFormik } from 'formik'
import type { FC } from 'react'
import { useState } from 'react'
import type { SchemaOf } from 'yup'
import { object, string } from 'yup'
import './SendToMoodle.scss'

export type SendToMoodleForm = { site: string | undefined }

export type SendToMoodleProps = {
  site: string | undefined
  userId: string | undefined
  canSendToMoodle: boolean
  sendToMoodle: (site: string | undefined) => void
}

export const lmsValidationSchema: SchemaOf<SendToMoodleForm> = object({
  site: string().url().required(),
})

export const SendToMoodle: FC<SendToMoodleProps> = ({
  site,
  userId,
  canSendToMoodle,
  sendToMoodle,
}) => {
  const [isAddingToMoodleLms, setIsAddingToMoodleLms] = useState<boolean>(false)
  const [shouldShowSendToMoodleLmsError, setShouldShowSendToMoodleLmsError] =
    useState<boolean>(false)
  const { addSnackbar } = useSnackbar()

  const form = useFormik<SendToMoodleForm>({
    initialValues: { site: site },
    validationSchema: lmsValidationSchema,
    onSubmit: async ({ site }, { setErrors }) => {
      try {
        await sendToMoodle(site)
      } catch (e) {
        setErrors({ site: t('lms_site_error') })
      }
    },
  })

  const handleOnSendToMoodleClick = () => {
    if (form.isValid) {
      form.submitForm()
      setIsAddingToMoodleLms(false)
      setShouldShowSendToMoodleLmsError(false)
    } else {
      setShouldShowSendToMoodleLmsError(true)
    }
  }

  const copyId = () => {
    if (userId) {
      navigator.clipboard.writeText(userId)
      addSnackbar(
        <Snackbar type="success" position="bottom" autoHideDuration={5000} showCloseButton={false}>
          {t('lms_user_id_copied')}
        </Snackbar>,
      )
    }
  }

  const copyIdButton = (
    <abbr className={`user-id`} title={t('lms_user_id_copy')}>
      <TertiaryButton className="copy-id" onClick={copyId}>
        {t('lms_user_id_btn')}
      </TertiaryButton>
    </abbr>
  )

  const showSendSuccess = () => {
    addSnackbar(
      <Snackbar type="success" position="bottom" autoHideDuration={3000} showCloseButton={false}>
        {t('lms_resource_sent', [form.values.site])}
      </Snackbar>,
    )
  }

  const modal = isAddingToMoodleLms && (
    <Modal
      className="send-to-moodle-modal"
      title={t('lms_modal_title')}
      actions={
        <PrimaryButton
          onClick={() => {
            handleOnSendToMoodleClick()
            showSendSuccess()
          }}
        >
          {t('lms_btn_send')}
        </PrimaryButton>
      }
      onPressEnter={() => {
        handleOnSendToMoodleClick()
        showSendSuccess()
      }}
      onClose={() => {
        setIsAddingToMoodleLms(false)
        setShouldShowSendToMoodleLmsError(false)
      }}
      style={{ maxWidth: '350px', width: '100%' }}
    >
      <div className="lms-url-div">{t('lms_modal_desc')}</div>
      <InputTextField
        placeholder={t('lms_site_placeholder')}
        value={form.values.site}
        name="site"
        edit
        onChange={form.handleChange}
        disabled={form.isSubmitting}
        error={shouldShowSendToMoodleLmsError && form.errors.site}
      />
      <div className="user-id-div">
        {userId ? (
          <>{t('lms_user_id_required')} {copyIdButton}</>
        ) : (
          <>{t('lms_user_id_login')}</>
        )}
      </div>
    </Modal>
  )

  return (
    <>
      {canSendToMoodle ? modal : null}
      <PrimaryButton
        onClick={() => canSendToMoodle && setIsAddingToMoodleLms(true)}
        disabled={!canSendToMoodle}
      >
        {t('send_to_moodle')}
      </PrimaryButton>
    </>
  )
}

SendToMoodle.defaultProps = {}

export default SendToMoodle
