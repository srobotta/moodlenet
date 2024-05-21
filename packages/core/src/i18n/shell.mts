import { getMyShell } from '@moodlenet/core'
import type { LanguageConfig } from './types.mjs'

export const shell = await getMyShell<void, LanguageConfig>(import.meta)
