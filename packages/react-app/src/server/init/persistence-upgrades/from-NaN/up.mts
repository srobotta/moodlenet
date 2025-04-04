import { defaultLanguageConfig } from '@moodlenet/core/i18n'
import { defaultAppearanceData } from '../../../../common/exports.mjs'
import { kvStore } from '../../kvStore.mjs'

await kvStore.set('configs', '', {
  webIconSize: [256, 256],
  webImageSize: [1000, 1000],
})

await kvStore.set('appearanceData', '', defaultAppearanceData)
await kvStore.set('language', '', defaultLanguageConfig)

export default 1
