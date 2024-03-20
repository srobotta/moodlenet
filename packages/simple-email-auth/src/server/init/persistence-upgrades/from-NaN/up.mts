import assert from 'assert'
import { readFile } from 'fs/promises'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { kvStore } from '../../kvStore.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const [newUserRequestTemplate, recoverPasswordTemplate, passwordChangedTemplate] =
  await Promise.all(
    ['new-user-request', 'recover-password', 'password-changed'].map(tplName =>
      readFile(
        resolve(__dirname, '..', '..', '..', '..', '..', `email-templates/${tplName}.html`),
        'utf-8',
      ),
    ),
  )
assert(newUserRequestTemplate && recoverPasswordTemplate && passwordChangedTemplate)

kvStore.set('email-templates', '', {
  'new-user-request': newUserRequestTemplate,
  'recover-password': recoverPasswordTemplate,
  'password-changed': passwordChangedTemplate,
})

export default 1
