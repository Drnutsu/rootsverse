import { QueryClient, QueryClientProvider } from 'react-query'
import { Router } from '@reach/router'
import { MobileView, BrowserView } from 'react-device-detect'
// import i18n from 'i18next'
// import { initReactI18next } from 'react-i18next'

import '@styles/App.scss'
import 'tailwindcss/tailwind.css'
import Layout from './layout'
import Game from '@components/game'
import { Dashboard } from '@components/blockchain/dashboard'
import BlockchainProvider from '@hooks/provider/blockchainProvider'
import StageProvider from '@hooks/provider/stageProvider'
// import en from '../lang/en.json'

// i18n.use(initReactI18next).init({
//   lng: 'en',
//   debug: true,
//   resources: {
//     en
//   },
//   fallbackLng: 'en',
//   interpolation: {
//     escapeValue: false
//   }
// })

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // refetch on focus is easy to make some component uselessly rerender
      // So enable it when you needed it.
      refetchOnWindowFocus: false
    }
  }
})

const terrain = {
  darkmode: {
    land: {
      floorColor: '#301748',
      highlightBorder: '#FDD520',
      wallColor: {
        left: '#4F336A',
        right: '#634A7B'
      }
    },
    sea: {
      floorColor: '#53CBC9',
      highlightBorder: '#FDD520',
      wallColor: {
        left: '#75D5D3',
        right: '#97DFDE'
      }
    }
  },
  rsk: {
    land: {
      floorColor: '#02bf69',
      highlightBorder: '#FDD520',
      wallColor: {
        left: '#006e3c',
        right: '#00b43c'
      }
    },
    sea: {
      floorColor: '#53CBC9',
      highlightBorder: '#FDD520',
      wallColor: {
        left: '#75D5D3',
        right: '#97DFDE'
      }
    }
  }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BlockchainProvider>
        <StageProvider>
          <Layout>
            <>
              <div className='hidden lg:flex h-full drawer flex-row'>
                <input
                  id='right-info-drawer'
                  type='checkbox'
                  className='drawer-toggle'
                />
                <div className='drawer-content flex justify-center flex-grow overflow-hidden'>
                  <label
                    htmlFor='right-info-drawer'
                    className='btn btn-circle btn-lg m-6 animate-bounce'
                  >
                    <div className='text-3xl'>🤵🏻‍♂️</div>
                  </label>
                  <div className='stage w-full h-full container'>
                    <Router>
                      <Game
                        path='/darkmode'
                        time='night'
                        themeColor={terrain.darkmode}
                      />
                      <Game path='/' themeColor={terrain.rsk} time='day' />
                    </Router>
                  </div>
                </div>
                <div className='drawer-side w-full'>
                  <label
                    htmlFor='right-info-drawer'
                    className='drawer-overlay'
                  ></label>
                  <div className=' bg-base-200 absolute h-full left-0 flex overflow-auto pb-24 no-scrollbar'>
                    <Dashboard />
                  </div>
                </div>
              </div>
              <div className='flex xl:hidden w-full h-full stage'>
                <BrowserView>
                  <div className='h-full flex px-12'>
                    <p className='flex self-center text-2xl text-bold'>
                      YOUR DEVICE RATIO IS NOT SUPPORTED TO REPRESENT THE MAP
                      RIGHT NOW, PLEASE SWITCH TO FULL SCREEN.
                    </p>
                  </div>
                </BrowserView>
                <MobileView>
                  <Router>
                    <Game
                      path='/darkmode'
                      themeColor={terrain.darkmode}
                      time='night'
                    />
                    <Game path='/' themeColor={terrain.rsk} time='day' />
                  </Router>
                </MobileView>
              </div>
            </>
          </Layout>
        </StageProvider>
      </BlockchainProvider>
    </QueryClientProvider>
  )
}

export default App
