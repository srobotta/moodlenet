/* eslint-disable prettier/prettier */
import { Card, PrimaryButton, SimpleDropdown } from '@moodlenet/component-library'
import type { useFormik } from 'formik'
import type { FC } from 'react'
import type { UserData } from '../../../../../../common/types.mjs'

const registerOptions = [
  {
    label: 'Yes',
    value: '1',
  },
  {
    label: 'No',
    value: '0',
  },
]

export type UserCfgProps = {
  form: ReturnType<typeof useFormik<UserData>>
}

export const UserCfgMenu = () => <abbr title="UserCfg">User</abbr>

export const UserCfg: FC<UserCfgProps> = ({ form }) => {
  const canSubmit = form.dirty && form.isValid && !form.isSubmitting && !form.isValidating

  const selectedVal = form.values.registerEnabled ? '1' : '0'

  return (
    <div className="user-cfg" key="user-cfg">
      <Card className="column">
        <div className="title">
          {/* <Trans> */}
          User
          {/* </Trans> */}
          <PrimaryButton onClick={form.submitForm} disabled={!canSubmit} className="save-btn">
            Save
          </PrimaryButton>
        </div>
      </Card>
      <Card className="column">
        <div className="parameter">
          <div className="name">Registration enabled</div>
          <div className="actions">
            <SimpleDropdown
              options={registerOptions}
              selected={[selectedVal]}
              label="Register enabled"
              onClick={key => {
                form.setFieldValue('registerEnabled', key === '1')
              }}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
