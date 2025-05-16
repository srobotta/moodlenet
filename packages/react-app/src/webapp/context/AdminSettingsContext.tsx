import { createContext } from 'react'
import type { FormLanguageData, LanguageConfig } from '../../common/i18n/types.mjs'
import type { AppearanceData, UserData } from '../../common/types.mjs'
// import lib from '../../../../main-lib'

export type AdminSettingsCtxT = {
  saveAppearanceData(data: AppearanceData): Promise<void>
  appearanceData: AppearanceData
  language: { rawData: FormLanguageData; data: LanguageConfig }
  saveLanguageData(data: FormLanguageData): Promise<void>
  userCfg: UserData
  saveUserCfg(data: UserData): Promise<void>
  devMode: boolean
  toggleDevMode(): void
  // updateAllPackages(): Promise<void>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AdminSettingsCtx = createContext<AdminSettingsCtxT>(null as any)
