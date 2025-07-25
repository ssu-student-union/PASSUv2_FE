/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as LoginIndexRouteImport } from './routes/login/index'
import { Route as LoginCallbackRouteImport } from './routes/login/callback'
import { Route as EventCreateRouteImport } from './routes/event/create'
import { Route as EventIdResultRouteImport } from './routes/event/$id/result'
import { Route as EventIdProgressRouteImport } from './routes/event/$id/progress'

const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const LoginIndexRoute = LoginIndexRouteImport.update({
  id: '/login/',
  path: '/login/',
  getParentRoute: () => rootRouteImport,
} as any)
const LoginCallbackRoute = LoginCallbackRouteImport.update({
  id: '/login/callback',
  path: '/login/callback',
  getParentRoute: () => rootRouteImport,
} as any)
const EventCreateRoute = EventCreateRouteImport.update({
  id: '/event/create',
  path: '/event/create',
  getParentRoute: () => rootRouteImport,
} as any)
const EventIdResultRoute = EventIdResultRouteImport.update({
  id: '/event/$id/result',
  path: '/event/$id/result',
  getParentRoute: () => rootRouteImport,
} as any)
const EventIdProgressRoute = EventIdProgressRouteImport.update({
  id: '/event/$id/progress',
  path: '/event/$id/progress',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/event/create': typeof EventCreateRoute
  '/login/callback': typeof LoginCallbackRoute
  '/login': typeof LoginIndexRoute
  '/event/$id/progress': typeof EventIdProgressRoute
  '/event/$id/result': typeof EventIdResultRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/event/create': typeof EventCreateRoute
  '/login/callback': typeof LoginCallbackRoute
  '/login': typeof LoginIndexRoute
  '/event/$id/progress': typeof EventIdProgressRoute
  '/event/$id/result': typeof EventIdResultRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/event/create': typeof EventCreateRoute
  '/login/callback': typeof LoginCallbackRoute
  '/login/': typeof LoginIndexRoute
  '/event/$id/progress': typeof EventIdProgressRoute
  '/event/$id/result': typeof EventIdResultRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/event/create'
    | '/login/callback'
    | '/login'
    | '/event/$id/progress'
    | '/event/$id/result'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/event/create'
    | '/login/callback'
    | '/login'
    | '/event/$id/progress'
    | '/event/$id/result'
  id:
    | '__root__'
    | '/'
    | '/event/create'
    | '/login/callback'
    | '/login/'
    | '/event/$id/progress'
    | '/event/$id/result'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  EventCreateRoute: typeof EventCreateRoute
  LoginCallbackRoute: typeof LoginCallbackRoute
  LoginIndexRoute: typeof LoginIndexRoute
  EventIdProgressRoute: typeof EventIdProgressRoute
  EventIdResultRoute: typeof EventIdResultRoute
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
    '/login/': {
      id: '/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginIndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/login/callback': {
      id: '/login/callback'
      path: '/login/callback'
      fullPath: '/login/callback'
      preLoaderRoute: typeof LoginCallbackRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/event/create': {
      id: '/event/create'
      path: '/event/create'
      fullPath: '/event/create'
      preLoaderRoute: typeof EventCreateRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/event/$id/result': {
      id: '/event/$id/result'
      path: '/event/$id/result'
      fullPath: '/event/$id/result'
      preLoaderRoute: typeof EventIdResultRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/event/$id/progress': {
      id: '/event/$id/progress'
      path: '/event/$id/progress'
      fullPath: '/event/$id/progress'
      preLoaderRoute: typeof EventIdProgressRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  EventCreateRoute: EventCreateRoute,
  LoginCallbackRoute: LoginCallbackRoute,
  LoginIndexRoute: LoginIndexRoute,
  EventIdProgressRoute: EventIdProgressRoute,
  EventIdResultRoute: EventIdResultRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
