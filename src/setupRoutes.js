import React from 'react'
import Loadable from 'react-loadable'

export const ROUTES = [
  {
    private: false,
    path: '/',
    exact: true,
    component: Loadable({
      loader: () => import('pages/Home'),
      loading: () => <div>Loading...</div>
    })
  },
  {
    private: false,
    path: '/about',
    exact: true,
    component: Loadable({
      loader: () => import('pages/About'),
      loading: () => <div>Loading...</div>
    })
  }
]