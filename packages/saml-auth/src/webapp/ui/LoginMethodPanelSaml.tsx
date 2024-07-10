import { PrimaryButton } from '@moodlenet/component-library'
import { getCurrentLang } from '@moodlenet/core/i18n'
import { useRef, useState } from 'react'
import type { LocalSamlConfig } from '../../server/types.mjs'
import { shell } from '../shell.mjs'
export const LoginButton = () => {
  return <PrimaryButton color="blue">{LoginMethodPanelSaml()}</PrimaryButton>
}

export const LoginMethodPanelSaml = () => {
  const configSet = useRef(false)
  const [config, setConfig] = useState<LocalSamlConfig>()

  const requestAndApplyConfig = async () => {
    if (configSet.current) {
      return
    }
    const res = await shell.rpc.me('config')()
    setConfig(res)
    configSet.current = true
  }

  requestAndApplyConfig()
  const lang = getCurrentLang()

  return (
    <div>
      {!config ? (
        <div>Loading</div>
      ) : (
        <div>
          <a href="/.pkg/@citricity/saml-auth/login">
            {config.linkText[lang] ?? 'Log in using Saml!'}
          </a>
        </div>
      )}
    </div>
  )
}
