import { ExtExpose } from '../types'

_throw()
const exp: Record<string, ExtExpose> = {}
export default exp

function _throw() {
  throw new Error('static exposedExtModules.ts should never be referenced runtime !')
}
