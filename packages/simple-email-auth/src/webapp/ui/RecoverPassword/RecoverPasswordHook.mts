import { useFooterProps, useMinimalisticHeaderProps } from '@moodlenet/react-app/webapp'
import { useCallback, useMemo, useState } from 'react'
import { shell } from '../../shell.mjs'
import type { RecoverPasswordProps } from './RecoverPassword.js'

export function useRecoverPasswordProps() {
  const [requestSent, setRequestSent] = useState(false)
  const footerProps = useFooterProps()
  const headerProps = useMinimalisticHeaderProps()
  const requestPasswordChange = useCallback<RecoverPasswordProps['requestPasswordChange']>(
    email => {
      shell.rpc
        .me('webapp/request-password-change-by-email-link')({ email })
        .then(() => {
          setRequestSent(true)
        })
    },
    [],
  )
  const props = useMemo(() => {
    const props: RecoverPasswordProps = {
      footerProps,
      headerProps,
      requestPasswordChange,
      requestSent,
    }
    return props
  }, [footerProps, headerProps, requestPasswordChange, requestSent])
  return props
}
