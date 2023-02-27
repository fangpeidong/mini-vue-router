import Base from './base'

class BrowserHistory extends Base {
  constructor(router) {
    super(router)
  }
  setupListener() {
    window.addEventListener('popstate', function () {
      this.transitionTo(window.location.pathnam)
    })
  }
  getCurrentLocation() {
    return window.location.pathname
  }
  push(location) {
    this.transitionTo(location, () => {
      history.pushState({}, '', location)
    })
  }
}

export default BrowserHistory
