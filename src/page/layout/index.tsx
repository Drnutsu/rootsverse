import { ReactChildren, ReactChild } from 'react'
import cx from 'classnames'

import Account from '@components/blockchain/account'
import FarmInfo from '@components/blockchain/farm-info'

export interface LayoutProps {
  children: ReactChildren | ReactChild
}

export const configTime = {
  '/': 'day',
  '/darkmode': 'night',
  '/rsk': 'day'
}

export default function Layout({ children }: LayoutProps) {
  const path = window.location.pathname
  return (
    <div className='App' data-theme='light h-full'>
      <div className='shadow bg-base-500 drawer h-full'>
        <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
        <div className='flex flex-col drawer-content'>
          <div className='w-full navbar bg-neutral text-neutral-content z-10'>
            <div className='flex-none lg:hidden'>
              <label htmlFor='my-drawer-3' className='btn btn-square btn-ghost'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='inline-block w-6 h-6 stroke-current'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  ></path>
                </svg>
              </label>
            </div>
            <div className='hidden lg:flex flex-1 px-2 mx-2'>
              <span className='text-lg font-bold'>ROOTSVERSE 🌱</span>
            </div>
            <div className='hidden lg:flex flex-none'>
              <Account />
            </div>
            <div className='hidden lg:flex flex-none'>
              <button className='btn btn-square btn-ghost'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='inline-block w-6 h-6 stroke-current'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  ></path>
                </svg>
              </button>
            </div>
            <div className='flex-none'>
              <button className='btn btn-square btn-ghost'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='inline-block w-6 h-6 stroke-current'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                  ></path>
                </svg>
              </button>
            </div>
            <div className='flex-none'>
              <div className='avatar'>
                <div className='rounded-full w-10 h-10 m-1'>
                  <img src='https://i.pravatar.cc/500?img=32' />
                </div>
              </div>
            </div>
          </div>
          <div
            className={cx('stage h-full flex justify-center', configTime[path])}
          >
            <div className='h-full w-full'>{children}</div>
          </div>
        </div>
        <div className='drawer-side'>
          <label htmlFor='my-drawer-3' className='drawer-overlay'></label>
          <ul className='p-4 overflow-y-auto w-80 bg-base-100 flex flex-col items-center'>
            <Account />
            <FarmInfo />
          </ul>
        </div>
      </div>
    </div>
  )
}
