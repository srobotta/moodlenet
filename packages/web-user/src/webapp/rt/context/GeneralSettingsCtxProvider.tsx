import type { FormLanguageData, LanguageConfig } from '@moodlenet/core'
import { defaultLanguageConfig, defaultLanguageData } from '@moodlenet/core/i18n'
import type { OrganizationData } from '@moodlenet/organization/common'
import type { AppearanceData } from '@moodlenet/react-app/common'
import { defaultAppearanceData } from '@moodlenet/react-app/common'
import type { AdminSettingsCtxT, TOrganizationCtx } from '@moodlenet/react-app/webapp'
import { AdminSettingsCtx, OrganizationCtx } from '@moodlenet/react-app/webapp'
import type { FC, PropsWithChildren } from 'react'
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { shell } from '../shell.mjs'
// import lib from '../../../../main-lib'

const ProvideAdminSettingsContext: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [appearanceData, setAppareanceData] = useState<AppearanceData>(defaultAppearanceData)

  const saveAppearanceData = useCallback(async (newAppearanceData: AppearanceData) => {
    await shell.rpc.me('webapp/admin/general/set-appearance')({ appearanceData: newAppearanceData })

    setAppareanceData(newAppearanceData)
  }, [])

  const [language, setLanguageData] = useState<{ rawData: FormLanguageData; data: LanguageConfig }>(
    { rawData: defaultLanguageData, data: defaultLanguageConfig },
  )
  const saveLanguageData = useCallback(async (data: FormLanguageData) => {
    const dataToSave = {
      languages: {
        available: data.available.split(',').map(e => e.trim()),
        default: data.default.trim(),
      },
    }
    await shell.rpc.me('webapp/admin/language/set-language')({ language: dataToSave })
    setLanguageData({ rawData: data, data: dataToSave })
  }, [])

  const [devMode, toggleDevMode] = useReducer(prev => !prev, false)

  // const updateAllPackages = useCallback(async () => {
  //   await shell.rpc.me('webapp/admin/packages/update-all-pkgs')()
  // }, [])
  useEffect(() => {
    shell.rpc
      .me('webapp/react-app/get-appearance')()
      .then(({ data: appearanceData }) => setAppareanceData(appearanceData))
    shell.rpc
      .me('webapp/react-app/get-language')()
      .then(v => {
        const rawData = {
          available: v.data.languages.available.join(', '),
          default: v.data.languages.default.trim(),
        }
        setLanguageData({ rawData: rawData, data: v.data })
      })
  }, [])

  const ctx = useMemo<AdminSettingsCtxT>(() => {
    return {
      saveAppearanceData,
      appearanceData,
      language,
      saveLanguageData,
      devMode,
      toggleDevMode,
      // updateAllPackages,
    }
  }, [
    /* updateAllPackages, */ saveAppearanceData,
    appearanceData,
    language,
    saveLanguageData,
    devMode,
  ])

  return <AdminSettingsCtx.Provider value={ctx}>{children}</AdminSettingsCtx.Provider>
}
const EmptyOrganizationData: OrganizationData = {
  instanceName: '',
  landingTitle: '',
  landingSubtitle: '',
  copyright: '',
  locationAddress: '',
  locationUrl: '',
}
const ProvideOrganizationContext: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [organizationData, setDataOrg] = useState<{
    data: OrganizationData
    rawData: OrganizationData
  }>({ rawData: EmptyOrganizationData, data: EmptyOrganizationData })

  const saveOrganization = useCallback(
    // WE CAN NOT USE IT IS CALLED 1 TIME ONLY
    async (rawData: OrganizationData) => {
      const respData = await shell.rpc.me('webapp/admin/general/set-org-data')({ rawData })
      setDataOrg(respData)
    },
    [],
  )

  useEffect(() => {
    shell.rpc
      .me('webapp/react-app/get-org-data')()
      .then(resp => setDataOrg(resp))
  }, [])

  const ctx: TOrganizationCtx = {
    saveOrganization,
    organization: organizationData,
  }

  return <OrganizationCtx.Provider value={ctx}>{children}</OrganizationCtx.Provider>

  /*{
    logo: organizationData.logo,
    smallLogo : organizationData.smallLogo,
    url: '/',
  } */
}

export function GeneralSettingsCtxProvider({ children }: PropsWithChildren<unknown>) {
  return (
    <ProvideOrganizationContext>
      <ProvideAdminSettingsContext>{children}</ProvideAdminSettingsContext>
    </ProvideOrganizationContext>
  )
}
