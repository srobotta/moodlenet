/* eslint-disable prettier/prettier */
import type { AddonItem } from '@moodlenet/component-library'
import { Card, Modal, PrimaryButton, SecondaryButton, Snackbar } from '@moodlenet/component-library'
import { t } from '@moodlenet/core/i18n'
import { useState, type FC } from 'react'
import './Advanced.scss'

export type AdvancedProps = {
  mainColumnItems: (AddonItem | null)[]
  deleteAccount: () => void
  deleteAccountSuccess: boolean
  instanceName: string
}

export const AdvancedMenu = () => <abbr title="Advanced">{t('advanced')}</abbr>

export const Advanced: FC<AdvancedProps> = ({
  mainColumnItems,
  deleteAccount,
  deleteAccountSuccess,
  instanceName,
}) => {
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false)

  const leaveSection = (
    <Card className="column">
      <div className="parameter">
        <div className="name">Leave {instanceName}</div>
        <div className="actions">
          <SecondaryButton onClick={() => setShowDeleteAccountModal(true)}>
            {t('advanced_delete_account')}
          </SecondaryButton>
        </div>
      </div>
    </Card>
  )

  const updatedMainColumnItems = [leaveSection, ...(mainColumnItems ?? [])].filter(
    (item): item is AddonItem => !!item,
  )

  const snackbars =
    // <SnackbarStack
    // snackbarList={
    [deleteAccountSuccess ? <Snackbar type="success">{t('advanced_check_email')}</Snackbar> : null]
  // }
  // ></SnackbarStack>

  const modals = (
    <>
      {showDeleteAccountModal && (
        <Modal
          title={`Alert`}
          actions={
            <PrimaryButton
              onClick={() => {
                deleteAccount()
                setShowDeleteAccountModal(false)
              }}
              color="red"
            >
              {t('advanced_delete_account')}
            </PrimaryButton>
          }
          onClose={() => setShowDeleteAccountModal(false)}
          style={{ maxWidth: '400px' }}
          className="delete-message"
        >
          {t('advanced_email_be_sent')}
        </Modal>
      )}
    </>
  )

  return (
    <div className="advanced" key="advanced">
      {modals}
      {snackbars}
      <Card className="column">
        <div className="title">
          {t('advanced')}
          {/* <PrimaryButton onClick={form.submitForm} disabled={!canSubmit} className="save-btn">
            Save
          </PrimaryButton> */}
        </div>
      </Card>
      {updatedMainColumnItems.map(i => ('Item' in i ? <i.Item key={i.key} /> : i))}
      {/* <Card className="column">
        <div className="parameter">
          <div className="name"> Platform name</div>
          <div className="actions">
            <InputTextField
              className="instance-name"
              placeholder="Enter name of your LMS platform"
              defaultValue={form.values.instanceName}
              onChange={form.handleChange}
              name="instanceName"
              key="instance-name"
              error={shouldShowErrors && form.errors.instanceName}
            />
          </div>
        </div>
      </Card> */}
    </div>
  )
}
