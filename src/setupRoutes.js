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
  },
  {
    private: false,
    path: '/products',
    exact: true,
    component: Loadable({
      loader: () => import('pages/Products'),
      loading: () => <div>Loading...</div>
    })
  },
  {
    private: false,
    path: '/product/:id',
    exact: true,
    component: Loadable({
      loader: () => import('pages/ProductDetail'),
      loading: () => <div>Loading...</div>
    })
  },
  {
    private: true,
    path: '/product/:id/package/:package_id',
    exact: true,
    component: Loadable({
      loader: () => import('pages/ProductBooking'),
      loading: () => <div>Loading...</div>
    })
  },
  {
    private: true,
    path: '/booking/:id',
    exact: true,
    component: Loadable({
      loader: () => import('pages/BookingDetail'),
      loading: () => <div>Loading...</div>
    })
  }
]