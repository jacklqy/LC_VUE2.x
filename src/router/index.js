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
    },
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
    // alias: '/xiaoming',
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
  let token = localStorage.getItem('token')
  let routerList = JSON.parse(localStorage.getItem('router'))
  console.log(routerList);
  if(to.name==='Login'&&token){
    next('/')
  }else if(to.name!=='Login'&&!token){
    next('/login')
  }
  // console.log(router.getRoutes());
  // 有没有添加过动态路由
  if(router.getRoutes().length>4){
    next()
  }else{
    // 循环获取到权限的路由
  routerList.map(v=>{
    // console.log( `../views/${v.name}.vue`);
    // 动态添加

    // 添加成为一级路由
    // router.addRoute({
    //   ...v,
    //   component: () => import( /* webpackChunkName: "addRoute" */  `../views/${v.name}.vue`) 
    // })
    router.addRoute('Index',{
        ...v,
        component: () => import( /* webpackChunkName: "addRoute" */  `../views/${v.name}.vue`) 
      })
  })
  // console.log('路由注入了~~~');
  // console.log();
  console.log(router.getRoutes());
  router.replace(to.path)
  // next()
  // router.resolve()
}
  // if(to.name!=='Login'&&router.)
  // router.addRoute()
  
})

export default router
