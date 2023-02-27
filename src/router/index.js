import Vue from 'vue'
import VueRouter from '../vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'a',
        component: {
          render: (h) => <div>a</div>
        }
      },
      {
        path: 'b',
        component: {
          render: (h) => <div>b</div>
        }
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
    children: [
      {
        path: 'a',
        component: {
          render: (h) => <div>a</div>
        }
      },
      {
        path: 'b',
        component: {
          render: (h) => <div>b</div>
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// router.matcher.addRoutes([
//   {
//     path: '/',
//     name: 'Home',
//     component: Home,
//     children: [
//       {
//         path: 'c',
//         component: {
//           render: (h) => <div>c</div>
//         }
//       }
//     ]
//   }
// ])

// router.matcher.addRoute({
//   path: '/xxx',
//   name: 'xxx'
// })

// router.beforeEach((from, to, next) => {
//   setTimeout(() => {
//     console.log(1)
//     next()
//   }, 1000)
// })

// router.beforeEach((from, to, next) => {
//   setTimeout(() => {
//     console.log(2)
//     next()
//   }, 1000)
// })

export default router
