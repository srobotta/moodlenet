import { PrimaryButton, TertiaryButton } from '@moodlenet/component-library'
import { t } from '@moodlenet/core/i18n'
import type { Href } from '@moodlenet/react-app/common'
import { Link } from '@moodlenet/react-app/ui'
import { Person } from '@mui/icons-material'
import type { FC } from 'react'

export const LoginHeaderButton: FC<{ loginHref: Href }> = ({ loginHref }) => (
  <Link href={loginHref} key="login-button" className="login-button access-button">
    <PrimaryButton>
      <span>{t('login')}</span>
      <Person />
    </PrimaryButton>
  </Link>
)

export const SignupHeaderButton: FC<{ signupHref: Href }> = ({ signupHref }) => (
  <Link href={signupHref} key="signup-button" className="signup-button access-button">
    <TertiaryButton>{t('signup')}</TertiaryButton>
  </Link>
)
