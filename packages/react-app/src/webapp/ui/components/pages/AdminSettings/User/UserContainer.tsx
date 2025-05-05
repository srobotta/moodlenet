import type { FC } from 'react'
import { UserCfg } from './User.js'
import { useUserCfgProps } from './UserHooks.js'

export const UserContainer: FC = () => {
  const userProps = useUserCfgProps()
  return <UserCfg {...userProps} />
}
