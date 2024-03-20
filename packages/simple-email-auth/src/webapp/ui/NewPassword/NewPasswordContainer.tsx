import type { FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { NewPassword } from './NewPassword.js'
import { useNewPasswordProps } from './NewPasswordHook.mjs'

export const NewPasswordContainer: FC = () => {
  const [q] = useSearchParams()
  const token = q.get('token') ?? ''
  const props = useNewPasswordProps({ token })
  return <NewPassword {...props} />
}
