import { shell } from '../shell.mjs'

export const env = await getEnv()

type Env = {
  newUserNotPublisher: boolean
  disableRegistration: boolean
}
function getEnv(): Env {
  const config: Env = {
    newUserNotPublisher: !!shell.config.newUserNotPublisher,
    disableRegistration: !!shell.config.disableRegistration,
  }
  const env: Env = config
  return env
}
