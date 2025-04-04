import { env } from './init/env.mjs'

export {
  getAppearance,
  getLanguage,
  getWebappUrl,
  plugin,
  setAppearance,
  setLanguage,
  webImageResizer,
} from './lib.mjs'
export { registerOpenGraphProvider } from './opengraph.mjs'
export const defaultImageUploadMaxSize = env.defaultImageUploadMaxSize
