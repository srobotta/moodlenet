import { env } from './init/env.mjs'

export {
  getAppearance,
  getUserCfg,
  getWebappUrl,
  plugin,
  setAppearance,
  setUserCfg,
  webImageResizer,
} from './lib.mjs'
export { registerOpenGraphProvider } from './opengraph.mjs'
export const defaultImageUploadMaxSize = env.defaultImageUploadMaxSize
