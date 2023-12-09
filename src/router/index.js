import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () => import('@/views/home/Home.vue')

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: '首页',
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        top: 0,
      }
    }
  },
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  next()
})

export default router
