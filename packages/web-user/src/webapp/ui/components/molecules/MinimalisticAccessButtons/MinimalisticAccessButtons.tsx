import { SecondaryButton } from '@moodlenet/component-library'
import { t } from '@moodlenet/core/i18n'
import type { Href } from '@moodlenet/react-app/common'
import { Link } from '@moodlenet/react-app/ui'

import type { FC } from 'react'
import './MinimalisticAccessButtons.scss'

export const SignupButtonMini: FC<{ signupHref: Href }> = ({ signupHref }) => (
  <Link href={signupHref}>
    <SecondaryButton color="orange">{t('signup')}</SecondaryButton>
  </Link>
)

export const LoginButtonMini: FC<{ loginHref: Href }> = ({ loginHref }) => (
  <Link href={loginHref}>
    <SecondaryButton color="orange">{t('login')}</SecondaryButton>
  </Link>
)
