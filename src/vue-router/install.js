export let Vue

export default function install(_Vue) {
  Vue = _Vue
  Vue.mixin({
    // mergeOptions 所有组件初始化都会采用这个方法
    beforeCreate() {
      if (this.$options.router) {
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this)
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    }
  })

  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot && this._routerRoot._router
    }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return this._routerRoot && this._routerRoot._route
    }
  })

  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true
      },
      tag: {
        type: String,
        default: 'a'
      }
    },
    methods: {
      handler() {
        this.$router.push(this.to)
      }
    },
    render() {
      const tag = this.tag
      return <tag onClick={this.handler}>{this.$slots.default}</tag>
    }
  })

  Vue.component('router-view', {
    functional: true,
    render(h, { parent, data }) {
      data.routerView = true
      const route = parent.$route
      let depth = 0
      while (parent) {
        if (parent.$vnode && parent.$vnode.data.routerView) {
          depth++
        }
        parent = parent.$parent
      }
      const record = route.matched[depth]
      if (!record) {
        return h()
      }
      return h(record.component, data)
    }
  })
}
