/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as AuthCallbackRouteImport } from './routes/auth/callback'
import { Route as EventIdIndexRouteImport } from './routes/event/$id/index'
import { Route as EventIdEnrolledRouteImport } from './routes/event/$id/enrolled'
import { Route as EventIdEnrollRouteImport } from './routes/event/$id/enroll'
import { Route as EventIdDetailRouteImport } from './routes/event/$id/detail'

const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const AuthCallbackRoute = AuthCallbackRouteImport.update({
  id: '/auth/callback',
  path: '/auth/callback',
  getParentRoute: () => rootRouteImport,
} as any)
const EventIdIndexRoute = EventIdIndexRouteImport.update({
  id: '/event/$id/',
  path: '/event/$id/',
  getParentRoute: () => rootRouteImport,
} as any)
const EventIdEnrolledRoute = EventIdEnrolledRouteImport.update({
  id: '/event/$id/enrolled',
  path: '/event/$id/enrolled',
  getParentRoute: () => rootRouteImport,
} as any)
const EventIdEnrollRoute = EventIdEnrollRouteImport.update({
  id: '/event/$id/enroll',
  path: '/event/$id/enroll',
  getParentRoute: () => rootRouteImport,
} as any)
const EventIdDetailRoute = EventIdDetailRouteImport.update({
  id: '/event/$id/detail',
  path: '/event/$id/detail',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/auth/callback': typeof AuthCallbackRoute
  '/event/$id/detail': typeof EventIdDetailRoute
  '/event/$id/enroll': typeof EventIdEnrollRoute
  '/event/$id/enrolled': typeof EventIdEnrolledRoute
  '/event/$id': typeof EventIdIndexRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/auth/callback': typeof AuthCallbackRoute
  '/event/$id/detail': typeof EventIdDetailRoute
  '/event/$id/enroll': typeof EventIdEnrollRoute
  '/event/$id/enrolled': typeof EventIdEnrolledRoute
  '/event/$id': typeof EventIdIndexRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/auth/callback': typeof AuthCallbackRoute
  '/event/$id/detail': typeof EventIdDetailRoute
  '/event/$id/enroll': typeof EventIdEnrollRoute
  '/event/$id/enrolled': typeof EventIdEnrolledRoute
  '/event/$id/': typeof EventIdIndexRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/auth/callback'
    | '/event/$id/detail'
    | '/event/$id/enroll'
    | '/event/$id/enrolled'
    | '/event/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/auth/callback'
    | '/event/$id/detail'
    | '/event/$id/enroll'
    | '/event/$id/enrolled'
    | '/event/$id'
  id:
    | '__root__'
    | '/'
    | '/auth/callback'
    | '/event/$id/detail'
    | '/event/$id/enroll'
    | '/event/$id/enrolled'
    | '/event/$id/'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthCallbackRoute: typeof AuthCallbackRoute
  EventIdDetailRoute: typeof EventIdDetailRoute
  EventIdEnrollRoute: typeof EventIdEnrollRoute
  EventIdEnrolledRoute: typeof EventIdEnrolledRoute
  EventIdIndexRoute: typeof EventIdIndexRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/auth/callback': {
      id: '/auth/callback'
      path: '/auth/callback'
      fullPath: '/auth/callback'
      preLoaderRoute: typeof AuthCallbackRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/event/$id/': {
      id: '/event/$id/'
      path: '/event/$id'
      fullPath: '/event/$id'
      preLoaderRoute: typeof EventIdIndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/event/$id/enrolled': {
      id: '/event/$id/enrolled'
      path: '/event/$id/enrolled'
      fullPath: '/event/$id/enrolled'
      preLoaderRoute: typeof EventIdEnrolledRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/event/$id/enroll': {
      id: '/event/$id/enroll'
      path: '/event/$id/enroll'
      fullPath: '/event/$id/enroll'
      preLoaderRoute: typeof EventIdEnrollRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/event/$id/detail': {
      id: '/event/$id/detail'
      path: '/event/$id/detail'
      fullPath: '/event/$id/detail'
      preLoaderRoute: typeof EventIdDetailRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthCallbackRoute: AuthCallbackRoute,
  EventIdDetailRoute: EventIdDetailRoute,
  EventIdEnrollRoute: EventIdEnrollRoute,
  EventIdEnrolledRoute: EventIdEnrolledRoute,
  EventIdIndexRoute: EventIdIndexRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
