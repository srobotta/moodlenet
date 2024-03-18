import { PrimaryButton, SecondaryButton, TertiaryButton } from '@moodlenet/component-library'
import { t, tn } from '@moodlenet/core/i18n'
import { PermIdentity, Person } from '@mui/icons-material'
import type { FC } from 'react'
import './FollowButton.scss'

export type FollowButtonProps = {
  followed: boolean
  canFollow: boolean
  isCreator: boolean
  isAuthenticated: boolean
  toggleFollow: () => void
}

export const FollowButton: FC<FollowButtonProps> = ({
  followed,
  canFollow,
  isCreator,
  isAuthenticated,
  toggleFollow,
}) => {
  return followed && !isCreator ? (
    <SecondaryButton
      disabled={!canFollow}
      onClick={toggleFollow}
      className="following-button"
      key="follow-button"
      color="orange"
    >
      {t('following')}
    </SecondaryButton>
  ) : (
    <PrimaryButton
      disabled={!canFollow || !isAuthenticated || isCreator}
      onClick={toggleFollow}
      key="follow-button"
      className="follow-button"
      abbr={
        isCreator
          ? t('follow_own_content')
          : !isAuthenticated
          ? t('follow_needs_login')
          : followed
          ? t('follow_remove_user')
          : t('follow_user')
      }
    >
      {t('follow')}
    </PrimaryButton>
  )
}
export type SmallFollowButtonProps = FollowButtonProps & { numFollowers: number }
export const SmallFollowButton: FC<SmallFollowButtonProps> = ({
  numFollowers,
  followed,
  canFollow,
  isCreator,
  isAuthenticated,
  toggleFollow,
}) => {
  return (
    <TertiaryButton
      className={`small-follow-button ${followed ? 'followed' : ''} `}
      disabled={!canFollow || isCreator}
      onClick={canFollow ? toggleFollow : () => undefined}
      abbr={
        isCreator
          ? tn('followers_cnt_sing', 'followers_cnt_pl', numFollowers)
          : !isAuthenticated
          ? t('follow_needs_login')
          : followed
          ? t('follow_remove_user')
          : t('follow_user')
      }
      key="followers-button"
    >
      {followed ? <Person /> : <PermIdentity />}
      <span>{numFollowers}</span>
    </TertiaryButton>
  )
}
