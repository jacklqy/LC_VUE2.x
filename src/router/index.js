import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
 
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
    meta:{
      title:'登录'
    }
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "login" */ '../views/Home.vue'),
  //   meta:{
  //     title:'登录'
  //   }
  // },
  {
    path: '/',
    name: 'Index',
    alias: '/xiaoming',
    redirect:'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Index,
    meta:{
      title:'主页'
    },
    children:[
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta:{
          title:'首页'
        },
        beforeEnter: (to, from, next) => {
          console.log('我是Home路由的守卫')
          console.log(to, from)
          next()
        }
      },
      {
        path: 'order',
        name: 'Order',
        meta:{
          title:'订单列表'
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "order" */ '../views/order.vue')
      },
      {
        path: 'userList',
        name: 'UserList',
        meta:{
          title:'用户列表'
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "userList" */ '../views/UserList.vue')
      },
      {
        path: 'roleList',
        name: 'RoleList',
        meta:{
          title:'角色列表'
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "roleList" */ '../views/RoleList.vue')
      },
      {
        path: 'tauthority',
        name: 'Tauthority',
        meta:{
          title:'权限列表'
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "tauthority" */ '../views/Tauthority.vue')
      },
      {
        path: 'about',
        name: 'About',
        meta:{
          title:'关于朝夕'
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
     
    ]
  },
  { path: '*',   component: () => import(/* webpackChunkName: "login" */ '../views/login.vue') }
]


const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    console.log(to, from, savedPosition)
    // return 期望滚动到哪个的位置
     return { x: 0, y: 0 }
  }
})

// 路由守卫 就是辅助处理路由跳转得时候需要处理的逻辑
/**
 * to 去哪里
 * from 你来自哪里
 * next 管道
 */
router.beforeEach((to, from, next) => {
  console.log(to,from)
  let token = localStorage.getItem('token')
  if(to.name==='Login'&&token){
    next('/')
  }else if(to.name!=='Login'&&!token){
    next('/login')
  }
  next()
})

export default router
