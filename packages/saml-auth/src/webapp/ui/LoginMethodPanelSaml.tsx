import { PrimaryButton } from '@moodlenet/component-library'
import { getCurrentLang } from '@moodlenet/react-app/common'
import type { FC } from 'react'

const label: Record<string, string> = {
  de: 'Anmeldung über Switch edu-ID',
  en: 'Log in using Switch edu-ID',
  fr: 'Connectez-vous avec Switch edu-ID',
}

const lang = getCurrentLang()

export const LoginButton: FC = () => {
  return <PrimaryButton color="blue">{label[lang] ?? label.en}</PrimaryButton>
}

export const LoginMethodPanelSaml: FC = () => {
  return (
    <div>
      <PrimaryButton color="blue">
        <a href="/.pkg/@citricity/saml-auth/login">{label[lang] ?? label.en}</a>
      </PrimaryButton>
    </div>
  )
}
