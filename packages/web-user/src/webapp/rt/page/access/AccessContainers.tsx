import { Card } from '@moodlenet/component-library'
import { defaultUserCfg, href, t } from '@moodlenet/react-app/common'
import { Link } from '@moodlenet/react-app/ui'
import { CallMade } from '@mui/icons-material'
import type { FC } from 'react'
import {
  SIGNUP_PAGE_ROUTE_BASE_PATH,
  useLoginPageRoutePathRedirectToCurrent,
} from '../../../../common/webapp-routes.mjs'
import {
  LoginHeaderButton,
  SignupHeaderButton,
} from '../../../ui/components/molecules/AccessButtons/AccessButtons.js'
import { shell } from '../../shell.mjs'

let registerEnabled = defaultUserCfg.registerEnabled
shell.rpc
  .me('webapp/react-app/get-user-cfg')()
  .then(({ data: userCfg }) => (registerEnabled = userCfg.registerEnabled))

export const LoginButtonContainer: FC = () => {
  return <LoginHeaderButton loginHref={href(useLoginPageRoutePathRedirectToCurrent())} />
}
export const SignupButtonContainer: FC = () => {
  return registerEnabled ? (
    <SignupHeaderButton signupHref={href(SIGNUP_PAGE_ROUTE_BASE_PATH)} />
  ) : (
    ''
  )
}
export const SignupCard: FC = () => {
  return registerEnabled ? (
    <Card hover={true}>
      <Link href={href(SIGNUP_PAGE_ROUTE_BASE_PATH)}>
        {t('sign_up')}
        <CallMade />
      </Link>
    </Card>
  ) : (
    ''
  )
}
