import { t } from '@moodlenet/core/i18n'
import type { FC, SetStateAction } from 'react'
// import { FormikHandle } from '../../../../lib/formik'
import InputTextField from '../../../atoms/InputTextField/InputTextField.js'
import Modal from '../../../atoms/Modal/Modal.js'
import PrimaryButton from '../../../atoms/PrimaryButton/PrimaryButton.js'
import SecondaryButton from '../../../atoms/SecondaryButton/SecondaryButton.js'
import './ReportModal.scss'

export type ReportModalDirection = 'horizontal' | 'vertical'

export type ReportModalProps = {
  title: string
  // reportForm: FormikHandle<{
  //   comment: string
  // }>
  setIsReporting: (value: SetStateAction<boolean>) => void
  setShowReportedAlert: (value: SetStateAction<boolean>) => void
  className?: string
}

export const ReportModal: FC<ReportModalProps> = ({
  title,
  className,
  // reportForm,
  setIsReporting,
  setShowReportedAlert,
}) => {
  return (
    <Modal
      className={'report-modal ' + className}
      title={title}
      closeButton={false}
      actions={
        <>
          <SecondaryButton
            color="grey"
            onClick={() => {
              setIsReporting(false)
            }}
          >
            {t('cancel')}
          </SecondaryButton>
          <PrimaryButton
            onClick={() => {
              // reportForm.submitForm()
              setIsReporting(false)
              setShowReportedAlert(false)
              setTimeout(() => {
                setShowReportedAlert(true)
              }, 100)
            }}
            // disabled={!!reportForm.errors.comment}
          >
            {t('report')}
          </PrimaryButton>
        </>
      }
      onClose={() => setIsReporting(false)}
      style={{ maxWidth: '400px' }}
    >
      <InputTextField
        isTextarea={true}
        name="comment"
        edit
        placeholder={t('report_comment_placeholder')}
        // onChange={reportForm.handleChange}
      />
      <div className="required">{t('required_field')}</div>
    </Modal>
  )
}

ReportModal.defaultProps = {}

export default ReportModal
