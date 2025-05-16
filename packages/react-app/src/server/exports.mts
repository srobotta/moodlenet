import { env } from './init/env.mjs'

export {
  getAppearance,
  getLanguage,
  getUserCfg,
  getWebappUrl,
  plugin,
  setAppearance,
  setLanguage,
  setUserCfg,
  webImageResizer,
} from './lib.mjs'
export { registerOpenGraphProvider } from './opengraph.mjs'
export const defaultImageUploadMaxSize = env.defaultImageUploadMaxSize
