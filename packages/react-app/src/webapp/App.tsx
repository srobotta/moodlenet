import { SnackbarCtxProvider } from '@moodlenet/component-library'
import type { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MainApp } from './MainApp.js'
import AppRoutes from './app-routes.js'
import { ProviderLanguageCtx } from './context/LanguageCtx.js'
import { ProvideLinkComponentCtx, ProvideViewport } from './exports/ui.mjs'
import { MainSearchBoxCtxProviderContainer } from './ui/components/atoms/MainSearchBox/MainSearchBoxProviderContainer.js'

const App: FC = () => {
  return (
    <ProvideViewport>
      <BrowserRouter>
        <ProviderLanguageCtx>
          <ProvideLinkComponentCtx>
            <SnackbarCtxProvider>
              <MainSearchBoxCtxProviderContainer>
                <MainApp>
                  <AppRoutes />
                </MainApp>
              </MainSearchBoxCtxProviderContainer>
            </SnackbarCtxProvider>
          </ProvideLinkComponentCtx>
        </ProviderLanguageCtx>
      </BrowserRouter>
    </ProvideViewport>
  )
}

export default App
