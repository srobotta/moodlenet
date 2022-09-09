import { ReactAppPluginMainModule, WebappPluginMainModule } from '@moodlenet/react-app'

import { TestExt } from '..'

export type TestExtensionWebappPluginX = WebappPluginMainModule<TestExt, { a: 1 }, [ReactAppPluginMainModule, void]>
export type TestExtensionWebappPlugin = WebappPluginMainModule<TestExt, { a: 1 }, [void, ReactAppPluginMainModule]>

const mainModule: TestExtensionWebappPlugin = {
  connect({ deps, http }) {
    const [a, reactApp] = deps
    reactApp.ui
    reactApp.uiasas
    http
      .fetch('testSub')({ paramIn1: 'xxx' })
      .then(resp => {
        console.log('testSub resp', JSON.stringify(resp, null, 2))
      })

    return {
      pkgLibFor(_) {
        return { a: 1 }
      },
    }
  },
}

export default mainModule
//<Route index element={<TestExtPage />} />
