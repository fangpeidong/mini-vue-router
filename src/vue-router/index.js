import install, { Vue } from './install'
import HashHistory from './hash'
import BrowserHistory from './history'

function createRouteMap(routes, pathMap = {}) {
  routes.forEach((route) => {
    addRouteRecord(route, pathMap)
  })

  return {
    pathMap
  }
}

function addRouteRecord(route, pathMap, parentRecord) {
  console.log(parentRecord)
  console.log(parentRecord?.path)
  const path = parentRecord
    ? `${parentRecord.path === '/' ? '/' : `${parentRecord.path}/`}${
        route.path
      }`
    : route.path
  const record = {
    path,
    component: route.component,
    props: route.props,
    meta: route.meta,
    parent: parentRecord
  }
  if (!pathMap[path]) {
    pathMap[path] = record
  }
  route.children &&
    route.children.forEach((childRoute) => {
      addRouteRecord(childRoute, pathMap, record)
    })
}

function createMatcher(routes) {
  const { pathMap } = createRouteMap(routes)
  function addRoutes(routes) {
    createRouteMap(routes, pathMap)
  }
  function addRoute(route) {
    createRouteMap([route], pathMap)
  }
  function match(location) {
    return pathMap[location]
  }

  return {
    addRoutes,
    addRoute,
    match
  }
}

class VueRouter {
  constructor(options) {
    const routes = options.routes
    this.matcher = createMatcher(routes)
    this.beforeEachHooks = []
    const mode = options.mode || 'hash'
    if (mode === 'hash') {
      this.history = new HashHistory(this)
    } else if (mode === 'history') {
      this.history = new BrowserHistory(this)
    }
  }
  match(location) {
    return this.matcher.match(location)
  }
  push(location) {
    return this.history.push(location)
  }
  beforeEach(cb) {
    this.beforeEachHooks.push(cb)
  }
  init(app) {
    const history = this.history
    history.transitionTo(history.getCurrentLocation(), () => {
      history.setupListener()
    })
    history.listener((newRoute) => {
      app._route = newRoute
    })
  }
}

VueRouter.install = install

export default VueRouter
