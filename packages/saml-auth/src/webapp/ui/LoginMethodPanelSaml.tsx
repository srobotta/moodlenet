import { PrimaryButton } from '@moodlenet/component-library'
import type { FC } from 'react'

const label = 'Log in using Saml!'

export const LoginButton: FC = () => {
  return <PrimaryButton color="blue">{label}</PrimaryButton>
}

export const LoginMethodPanelSaml: FC = () => {
  return (
    <div>
      <PrimaryButton color="blue">
        <a href="/.pkg/@citricity/saml-auth/login">{label}</a>
      </PrimaryButton>
    </div>
  )
}
