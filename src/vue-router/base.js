function createRoute(record, location) {
  let matched = []
  if (record) {
    while (record) {
      matched.unshift(record)
      record = record.parent
    }
  }
  return {
    ...location,
    matched
  }
}

function runQuene(quene, from, to, cb) {
  function next(index) {
    if (index >= quene.length) {
      return cb()
    }
    const hook = quene[index]
    hook(from, to, () => {
      next(index + 1)
    })
  }
  next(0)
}

class Base {
  constructor(router) {
    this.router = router
    this.current = createRoute(null, { path: '/' })
  }
  transitionTo(location, listener) {
    const record = this.router.match(location)
    const route = createRoute(record, { path: location })

    if (
      location === this.current.path &&
      route.matched.length === this.current.matched.length
    ) {
      return
    }
    const quene = [...this.router.beforeEachHooks]

    runQuene(quene, this.current, route, () => {
      this.current = route
      listener && listener()
      this.cb && this.cb(route)
    })
  }
  listener(cb) {
    this.cb = cb
  }
}

export default Base
