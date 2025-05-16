import { useFormik } from 'formik'
import { useContext, useMemo } from 'react'
import type { UserData } from '../../../../../../common/types.mjs'
import { AdminSettingsCtx } from '../../../../../context/AdminSettingsContext.js'
import type { UserCfgProps } from './User.js'

export const useUserCfgProps = (): UserCfgProps => {
  const { userCfg, saveUserCfg } = useContext(AdminSettingsCtx)

  const form = useFormik<UserData>({
    initialValues: userCfg,
    async onSubmit(data) {
      await saveUserCfg(data)
    },
    enableReinitialize: true,
  })

  const userCfgProps = useMemo<UserCfgProps>(() => {
    return {
      form,
      updateSuccess: false,
    }
  }, [form])

  return userCfgProps
}
