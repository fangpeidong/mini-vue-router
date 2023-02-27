import Base from './base'

function ensureSlash() {
  if (window.location.hash) {
    return
  }
  window.location.hash = '/'
}

function getHash() {
  return window.location.hash.slice(1)
}

class HashHistory extends Base {
  constructor(router) {
    super(router)
    ensureSlash()
  }
  setupListener() {
    window.addEventListener('hashchange', () => {
      this.transitionTo(getHash())
    })
  }
  getCurrentLocation() {
    return getHash()
  }
  push(location) {
    this.transitionTo(location, () => {
      window.location.hash = location
    })
  }
}

export default HashHistory
