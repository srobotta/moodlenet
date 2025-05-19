import { getMyShell } from '@moodlenet/core'
import type { I18nExposeType } from '../expose-def.mjs'

export const shell = await getMyShell<I18nExposeType>(import.meta)
