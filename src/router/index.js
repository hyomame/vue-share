import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/pages/Home'
import Profile from '@/components/pages/Profile'
import Signin from '@/components/pages/Signin'
import Processing from '@/components/pages/Processing'
import Signout from '@/components/pages/Signout'
import About from '@/components/pages/About'
import Help from '@/components/pages/Help'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: 'signin'
  },
  {
    path: '/',
    name: 'ホーム',
    component: Home,
    //meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'プロフィール',
    component: Profile,
    //meta: { requiresAuth: true }
  },
  {
    path: '/signin',
    name: 'サインイン',
    component: Signin
  },
  {
    path: '/processing',
    name: '処理中',
    component: Processing
  },
  {
    path: '/signout',
    name: 'サインアウト',
    component: Signout,
    //meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: '概要',
    component: About
  },
  {
    path: '/help',
    name: 'ヘルプ',
    component: Help
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next()
      } else {
        next({
          path: '/about',
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    next() // next() を常に呼び出すようにしてください!
  }
})

export default router
