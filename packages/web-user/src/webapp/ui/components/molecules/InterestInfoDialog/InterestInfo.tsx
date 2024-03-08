import type { Href } from '@moodlenet/component-library'
import {
  PrimaryButton,
  Snackbar,
  SnackbarStack,
  TertiaryButton,
} from '@moodlenet/component-library'
import { Link } from '@moodlenet/react-app/ui'
import { t } from '@moodlenet/react-app/webapp'
import { useState, type FC } from 'react'
import './InterestInfo.scss'

export type InterestInfoProps = {
  userSettingHref: Href
  doNotShowAgain: () => void
}

export const InterestInfo: FC<InterestInfoProps> = ({ userSettingHref, doNotShowAgain }) => {
  const [showSnackbar, setShowSnackar] = useState(false)
  const [showDialog, setShowDialog] = useState(true)
  const snackbars = (
    <SnackbarStack
      snackbarList={[
        <Snackbar
          key="interest-info-snackbar"
          type="info"
          autoHideDuration={99999999}
          showCloseButton={true}
        >{`Click 'Profile menu > Settings' to set them anytime`}</Snackbar>,
      ]}
    />
  )

  return (
    <>
      {showSnackbar && snackbars}
      {showDialog && (
        <div className="interest-info">
          <div className="content">
            <div className="title">{t('interest_title')}</div>
            <div className="description">
              {t('interest_description')}
              <br />
            </div>
            <div className="actions">
              <Link href={userSettingHref}>
                <PrimaryButton>{t('goto_settings')}</PrimaryButton>
              </Link>
              <TertiaryButton
                onClick={() => {
                  setShowDialog(false)
                  setShowSnackar(true)
                  doNotShowAgain()
                }}
              >
                {t('dont_show_again')}
              </TertiaryButton>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
