import { InputTextField, PrimaryButton, TertiaryButton } from '@moodlenet/component-library'
import { t } from '@moodlenet/core/i18n'
import type { Href } from '@moodlenet/react-app/common'
import { Link } from '@moodlenet/react-app/ui'
import type { useFormik } from 'formik'
import type { FC } from 'react'

/*** TEST  IS LINT REACT WORK --> this give error missing display name

const Hello = React.memo(({ a }: { a: string }) => {
  return <>{a}</>
})
 */

export type LoginFormValues = { email: string; password: string }

export const LoginIcon: FC = () => {
  return <PrimaryButton color="blue">{t('login_using_email')}</PrimaryButton>
}

export type LoginProps = {
  form: ReturnType<typeof useFormik<LoginFormValues>>
  recoverPasswordHref: Href
  wrongCreds: boolean
}

export const LoginPanel: FC<LoginProps> = ({ wrongCreds, form, recoverPasswordHref }) => {
  /* const { pkgs } = useContext(MainContext)
  const [authPkgApis] = pkgs

  const auth = useContext(AuthCtx)
  const [wrongCreds, setWrongCreds] = useState(false)
*/
  const shouldShowErrors = !!form.submitCount
  const canSubmit = !form.isSubmitting && !form.isValidating
  return (
    <>
      <form onSubmit={form.handleSubmit}>
        <InputTextField
          className="email"
          placeholder={t('email')}
          type="email"
          name="email"
          edit
          value={form.values.email}
          onChange={form.handleChange}
          error={shouldShowErrors && form.errors.email}
        />
        <InputTextField
          className="password"
          placeholder={t('password')}
          type="password"
          name="password"
          edit
          value={form.values.password}
          onChange={form.handleChange}
          error={shouldShowErrors && form.errors.password}
        />
        {wrongCreds && <div className="error">{t('login_error_email_password')}</div>}
        <button type="submit" style={{ display: 'none' }} />
      </form>
      <div className="bottom">
        <div className="content">
          <div className="left">
            <PrimaryButton onClick={canSubmit ? form.submitForm : undefined}>
              {t('login')}
            </PrimaryButton>
            <Link href={recoverPasswordHref}>
              <TertiaryButton>{t('recover_password')}</TertiaryButton>
            </Link>
          </div>
          {/* <div className="right" hidden>
                    <div className="icon">
                      <img
                        alt="apple login"
                        src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                      />
                    </div>
                    <div className="icon">
                      <img
                        alt="google login"
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                      />
                    </div>
                  </div> */}
        </div>
      </div>
    </>
  )
}
