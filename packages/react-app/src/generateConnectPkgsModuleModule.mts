import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { inspect } from 'util'
import { WebappPluginItem } from './types.mjs'
import { fixModuleLocForWebpackByOS } from './util.mjs'
function ___dirname(import_meta_url: string) {
  return fileURLToPath(new URL('.', import_meta_url))
}
const __dirname = ___dirname(import.meta.url)

export function generateConnectPkgModulesModule({ plugins }: { plugins: WebappPluginItem[] }) {
  // const reversedExtPlugins = extPlugins.slice().reverse()
  console.log(inspect({ plugins }, false, 5, true))
  return `// - generated ConnectPkgsModule for ${plugins.map(_ => _.guestPkgInfo.pkgId.name).join(',')} -

  //@ts-ignore
  //import {pluginMainComponents} from '${fixModuleLocForWebpackByOS(
    resolve(__dirname, '..', 'src', 'webapp', 'mainContextProviders.tsx'),
  )}'
 import {pluginMainComponents} from '${fixModuleLocForWebpackByOS(
   resolve(__dirname, '..', 'lib', 'webapp', 'mainContextProviders.js'),
 )}'

  ${plugins
    .map(
      (pluginItem, index) => `
import pkg_main_component_${index} from '${resolve(
        pluginItem.guestPkgInfo.pkgRootDir,
        ...pluginItem.mainComponentLoc,
      )}' // ${pluginItem.guestPkgInfo.pkgId.name}
    `,
    )
    .join('')}

  ${plugins
    .map(
      (pluginItem, index) => `


// connect ${pluginItem.guestPkgInfo.pkgId.name} (pkg_main_component_${index})
pluginMainComponents.push({
  //@ts-ignore
  MainComponent:pkg_main_component_${index},
  pkgId:${JSON.stringify(pluginItem.guestPkgInfo.pkgId)},
  usesPkgs: ${JSON.stringify(pluginItem.usesPkgs.map(({ pkgInfo: { pkgId } }) => ({ pkgId })))}
})

`,
    )
    .join('')}
console.log('\\n--------- all pkgs connected ---------\\n\\n')
`
}
