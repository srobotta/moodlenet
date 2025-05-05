import { defaultUserCfg } from '../../../../common/exports.mjs'
import { kvStore } from '../../kvStore.mjs'

await kvStore.set('userCfg', '', defaultUserCfg)

export default 2
