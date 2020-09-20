import React from 'react'
import Loadable from 'react-loadable'
import Preloader from 'services/Preloader'

export const ROUTES = [
  {
    private: false,
    path: '/',
    exact: true,
    component: Loadable({
      loader: () => import('pages/Home'),
      loading: () => <Preloader />
    })
  },
  {
    private: false,
    path: '/about',
    exact: true,
    component: Loadable({
      loader: () => import('pages/About'),
      loading: () => <Preloader />
    })
  },
  {
    private: false,
    path: '/products',
    exact: true,
    component: Loadable({
      loader: () => import('pages/Products'),
      loading: () => <Preloader />
    })
  },
  {
    private: false,
    path: '/product/:id',
    exact: true,
    component: Loadable({
      loader: () => import('pages/ProductDetail'),
      loading: () => <Preloader />
    })
  },
  {
    private: true,
    path: '/product/:id/package/:package_id',
    exact: true,
    component: Loadable({
      loader: () => import('pages/ProductBooking'),
      loading: () => <Preloader />
    })
  },
  {
    private: true,
    path: '/booking/:id',
    exact: true,
    component: Loadable({
      loader: () => import('pages/BookingDetail'),
      loading: () => <Preloader />
    })
  },
  {
    private: true,
    path: '/booking-history',
    exact: true,
    component: Loadable({
      loader: () => import('pages/BookingHistory'),
      loading: () => <Preloader />
    })
  },
  {
    private: false,
    path: '/booking/:product_id/:index',
    exact: true,
    component: Loadable({
      loader: () => import('callbacks/BookingUpdateIdentity'),
      loading: () => <Preloader />
    })
  },
  {
    private: false,
    path: '/assign_passport/:product_id/:index',
    exact: true,
    component: Loadable({
      loader: () => import('callbacks/BookingUpdatePassport'),
      loading: () => <Preloader />
    })
  }
]