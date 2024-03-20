import type { FC } from 'react'
import { RecoverPassword } from './RecoverPassword.js'
import { useRecoverPasswordProps } from './RecoverPasswordHook.mjs'

export const RecoverPasswordContainer: FC = () => {
  const props = useRecoverPasswordProps()
  return <RecoverPassword {...props} />
}
