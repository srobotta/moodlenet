import { PrimaryButton, SecondaryButton } from '@moodlenet/component-library'
import { t } from '@moodlenet/react-app/webapp'
import type { FC } from 'react'
import type { ProfileAccess, ProfileActions, ProfileState } from '../../../../../common/types.mjs'
import { ReactComponent as ApprovedIcon } from '../../../assets/icons/approved.svg'
import './ApproveButton.scss'

export type ApprovalButtonProps = {
  access: ProfileAccess
  state: ProfileState
  actions: ProfileActions
}

export const ApprovalButton: FC<ApprovalButtonProps> = ({ access, state, actions }) => {
  const { canApprove } = access
  const { isPublisher } = state
  const { approveUser, unapproveUser } = actions

  const approveButton = (
    <PrimaryButton className="approve-button" onClick={approveUser} color="green">
      {t('approve')}
    </PrimaryButton>
  )

  const unapproveButton = (
    <SecondaryButton className="unapprove-button" onClick={unapproveUser} color="red">
      {t('unapprove')}
    </SecondaryButton>
  )

  return canApprove ? (isPublisher ? unapproveButton : approveButton) : null
}

export type ApprovalInfoProps = {
  isWaitingApproval: boolean
  isPublisher: boolean
  isElegibleForApproval: boolean
  isCreator: boolean
}

export type ApprovalBadgeProps = {
  isPublisher: boolean
  isEditing: boolean
  canEdit: boolean
  showAccountApprovedSuccessAlert: boolean
}

export const ApprovalBadge: FC<ApprovalBadgeProps> = ({
  isPublisher,
  canEdit,
  isEditing,
  showAccountApprovedSuccessAlert,
}) => {
  return !isEditing && canEdit && isPublisher ? (
    <abbr className={`approved-badge`} title={t('approved_badge')}>
      <ApprovedIcon
        className={`approved-icon ${
          showAccountApprovedSuccessAlert ? 'zooom-in-enter-animation' : ''
        }`}
      />
    </abbr>
  ) : null
}
