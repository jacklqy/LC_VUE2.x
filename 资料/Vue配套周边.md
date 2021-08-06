

## Vue配套周边

## 一、vue-router

vue-router 里的三个核心对象：

-  **route**：单条路由对象 
- **routes** ：路由集合
- **router** ：路由机制对象，管理路由集合以及单条路由对象，实现路由切换

**安装：**

```
npm install vue-router --save
```



### 1、创建路由实例

```js
const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/home', component: Home }
  ]
})
```



### 2、挂载路由

```js
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```



### 3、路由渲染

- `<router-view>` 组件是一个 functional 组件，渲染路径匹配到的视图组件

​	**name** : 如果 `<router-view>`设置了名称，则会渲染对应的路由配置中 `components` 下的相应组件



- `<router-link>` 组件支持用户在具有路由功能的应用中 (点击) 跳转到指定路由

    **`<router-link>` Props**：

    **(1) to** : 目标路由的链接

    **(2) replace** : 当点击时，会调用 `router.replace()` 而不是 `router.push()`，于是导航后不会留下 history 记录

    **(3) append** : 在当前 (相对) 路径前添加基路径。例如，我们从 `/a` 导航到一个相对路径 `b`，如果没有配置 `append`，则路径为 `/b`，如果配了，则为 `/a/b`

    **(4) tag** : 有时候想要 `<router-link>` 渲染成某种标签，例如 `<li>`。 于是我们使用 `tag` prop 类指定何种标签，同样它还是会监听点击，触发导航

    **(5) active** : 设置链接激活时使用的 CSS 类名

    

### 4、路由匹配

**默认匹配优先级**: 按照路由的定义顺序：谁先定义的，谁的优先级就最高

#### （1）路由参数匹配

```js
//路由地址上指定了一个id参数
//user/foo 和 /user/bar 都将映射到相同的路由 
// 从 /user/foo 到 /user/bar组件会被复用，不会重新渲染
{ path: '/user/:id', component: User }
```

#### （2）通配符路由

```js
// 会匹配所有路径，如果都无法匹配，则渲染User组件
//用途：放在路由配置最后，，不管输入什么地址都是不在范围内，需要转到该组件
{ path: '*', component: User }
```

#### （3）路由别名

```js
// 组件User的路径定义为 '/user'，通过alias设定别命 '/b'
//当路由为  '/user'或者'/b'都会渲染组件 User
{ path: '/user', component: User, alias: '/b' }
```



### 5、重定向

```js
//重定向到路由 '/b'
{ path: '/user', component: User, redirect: '/b' }

//重定向到路由名为'home'的组件
{ path: '/user', component: User, redirect:{name: 'home'} }

//通过函数return出的路由对象或者路由地址作为重定向目标 
{ path: '/user', redirect: to => {
      // 方法接收目标路由作为参数
      // return  '/b' 重定向的 字符串路径/路径对象
    }}
```



### 6、路由嵌套

如果需要在某个路由组件内渲染一些路由，那就需要用**路由嵌套**来完成

```js
//给'/'路由设定children属性承接一个数组来定义index路由的子路由
//当路由匹配到'/user'路由时，可以在index.vue页面渲染User路由
new Router({
  path: '/',
  name: 'index',
  component: Index,
  children: [
    {
      path: 'home',
      component: Home
    },
    {
      path: 'user',
      component: User
    }
  ]
})

// index.vue
<template>
  <div id="app">
    <h1>index路由页面信息</h1>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
```

设定默认子路由：

- 设定子路的path为空 
- 父级路由设定redirect 重定向到子路由



### 7、路由守卫

`vue-router` 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的

#### （1）全局前置守卫

使用 `router.beforeEach` 注册一个全局前置守卫：

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

当一个导航触发时，全局前置守卫按照创建顺序调用。

每个守卫方法接收三个参数：

- **`to: Route`**: 即将要进入的目标
- **`from: Route`**: 当前导航正要离开的路由
- **`next: Function`**: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 `next` 方法的调用参数。
    - **`next()`**: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是确认的。
    - **`next(false)`**: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
    - **`next('/')` 或者 `next({ path: '/' })`**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象
    - **`next(error)`**: (2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给`router.onError()`注册过的回调。



#### （2）全局后置钩子

也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身：

```js
router.afterEach((to, from) => {
  // ...
})
```

#### （3）路由独享的守卫

可以在路由配置上直接定义 `beforeEnter` 守卫：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

这些守卫与全局前置守卫的方法参数是一样的

#### （4）组件内的守卫

可以在路由组件内直接定义以下路由导航守卫：

- `beforeRouteEnter`
- `beforeRouteUpdate` (2.2 新增)
- `beforeRouteLeave`

```js
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被加载前调用
    // 不能获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

`beforeRouteEnter` 守卫 **不能** 访问 `this`，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。

不过，你可以通过传一个回调给 `next`来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

注意 `beforeRouteEnter` 是支持给 `next` 传递回调的唯一守卫。对于 `beforeRouteUpdate` 和 `beforeRouteLeave` 来说，`this` 已经可用了，所以**不支持**传递回调，因为没有必要了。

```js
beforeRouteUpdate (to, from, next) {
  // just use `this`
  this.name = to.params.name
  next()
}
```

这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 `next(false)` 来取消。

```js
beforeRouteLeave (to, from, next) {
  if (true) {
    next()
  } else {
    next(false)
  }
}
```

### 8、路由元信息

定义路由的时候可以配置 `meta` 字段：

```js
new Router({
  path: '/',
  name: 'index',
  component: Index,
  children: [
    {
      path: 'home',
      component: Home,
      meta:{
      	title:'主页'
      }
    },
    {
      path: 'user',
      component: User
    }
  ]
})
```

后续可以在路由对象上通过`meta`属性访问到配置在`meta`上的数据



### 9、滚动行为

使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 `vue-router` 可以自定义路由切换时页面如何滚动

```js
//注意: 这个功能只在支持 history.pushState 的浏览器中可用。
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
     return { x: 0, y: 0 }
  }
})
```



### 10、路由懒加载

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。路由拦截可以把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了

```js
new Router({
  path: '/',
  name: 'index',
  component: Index,
  children: [
    {
      path: 'home',
      component: import(/* webpackChunkName: "home" */ './home.vue'),
      meta:{
      	title:'主页'
      }
    },
    {
      path: 'user',
      component: User
    }
  ]
})
```



## 二、Axios

demo模拟接口：https://www.fastmock.site/mock/323354e56ef21147c3f550e18435baa1/api



Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中

**安装:**

```
npm install axios
npm i axios
```

### 1、get请求

```js
axios.get(url,data)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```



### 2、post请求

```js
axios.post(url,data)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```



### 3、并发请求

```js
function getUserAccount() {
  return axios.get(url);
}

function getUserPermissions() {
  return axios.get(url);
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  }));
```



### 4、配置性请求

##### axios(config)

```js
// 发送 POST 请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
}).then(function(response) {
	console.log(response)
});;
```



### 5、请求方法的别名

为方便起见，为所有支持的请求方法提供了别名

##### axios.request(config)

##### axios.get(url[, config])

##### axios.delete(url[, config])

##### axios.head(url[, config])

##### axios.options(url[, config])

##### axios.post(url[, data[, config]])

##### axios.put(url[, data[, config]])

##### axios.patch(url[, data[, config]])

###### 注意

在使用别名方法时， `url`、`method`、`data` 这些属性都不必在配置中指定



### 6、创建axios实例

##### axios.create([config])

```js
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

instance.get('getList')
```



### 7.全局默认值

```js
axios.defaults.baseURL = 'xxx';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```



### 8、自定义实例默认值

```js

const instance = axios.create({
  baseURL: 'xxx'
});

instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```



### 9、配置的优先顺序

配置会以一个优先顺序进行合并。这个顺序是：默认值《 实例的 `defaults` 属性《请求的 `config` 参数。后者将优先于前者。

```js
// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 `0`
var instance = axios.create();

// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒
instance.defaults.timeout = 2500;

// 为已知需要花费很长时间的请求覆写超时设置
instance.get('/longRequest', {
  timeout: 5000
});
```



### 10、拦截器

在请求或响应被 `then` 或 `catch` 处理前拦截它们。

```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

如果你想在稍后移除拦截器，可以这样：

```js
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

可以为自定义 axios 实例添加拦截器

```js
const instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
instance.interceptors.response.use(function () {/*...*/});
```



### 11、取消请求

使用 *cancel token* 取消请求

```js
const CancelToken = axios.CancelToken;
//创建取消对象
const source = CancelToken.source();

axios.get('/user/12345', {
    //给请求绑定取消token
  cancelToken: source.token
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
     // 处理错误
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
    //给请求绑定取消token
  cancelToken: source.token
})

// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.');
```

还可以通过传递一个 executor 函数到 `CancelToken` 的构造函数来创建 cancel token：

```js
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
    通过CancelToken构造一个取消token,构造器接受一个函数作为回调，回调接受一个取消对象
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// 通过取消对象取消请求
cancel();
```

> 注意: 可以使用同一个 cancel token 取消多个请求



## 三、vuex

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化

**安装：**

```bash
npm install vuex --save
```

**注入：**

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```

### 1、state

Vuex 使用**单一状态树**，用一个对象就包含了全部的应用层级状态。至此它便作为一个唯一数据源而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照

```js
export default new Vuex.Store({
  state: {
      name:'朝夕'
  }
})
```

由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在**计算属性**中返回某个状态：

```js
//每当 store.state.name 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM
computed: {
    userName () {
      return this.$store.state.name
    }
  }
```



### 2、`mapState` 辅助函数

 `mapState` 辅助函数可以生成多个计算属性

```js
computed: {
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```



### 3、Getter

Vuex 允许我们在 store 中定义“getter”，就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
   doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
   doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
  }
})
```

Getter 会暴露为 `store.getters` 对象，你可以以属性的形式访问这些值：

```js
store.getters.doneTodosCount // -> 1

//组件内获取
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```



### 4、`mapGetters` 辅助函数

`mapGetters` 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：

```js
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

如果你想将一个 getter 属性另取一个名字，使用对象形式：

```js
...mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```



### 5、Mutation

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。

每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```

你不能直接调用一个 mutation handler。这个选项更像是事件注册：“当触发一个类型为 `increment` 的 mutation 时，调用此函数。”要唤醒一个 mutation handler，你需要以相应的 type 调用 **store.commit** 方法：

```js
store.commit('increment')
```



### 6、Mutation传参

你可以向 `store.commit` 传入额外的参数：

```js
// ...
mutations: {
  increment (state, n) {
    state.count += n
  }
}
store.commit('increment', 10)
```

在大多数情况下，参数应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读：

```js
// 定义
mutations: {
  increment (state, data) {
    state.count += data.amount
  }
}
//调用
store.commit({
  type: 'increment',
  amount: 10,
  cont:'1111'
})
```

Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：

1. 提前初始化好store中所有所需属性。
2. Mutation 必须是同步函数
3. 当需要在对象上添加新属性时，你应该：

- 使用 `Vue.set(obj, 'newProp', 123)`, 或者`state.obj = { ...state.obj, newProp: 123 }`



### 7、Action

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

注册一个 action：

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters

```js
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
```

Action 通过 `store.dispatch` 方法触发：

```js
store.dispatch('increment')
```

可以在 action 内部执行**异步**操作：

```js
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```

Actions 支持同样参数传递：

```js
// 第一种方式
store.dispatch('incrementAsync', {
  amount: 10
})

// 第二种方式
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

在组件中使用 `this.$store.dispatch('xxx')` 分发 action，或者使用 `mapActions` 辅助函数将组件的 methods 映射为 `store.dispatch` 调用（需要先在根节点注入 `store`）：

```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
      'incrementBy' 
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

`store.dispatch` 可以处理被触发的 action 的处理函数返回的 Promise，并且 `store.dispatch` 仍旧返回 Promise：

```js
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```

现在你可以：

```js
store.dispatch('actionA').then(() => {
  // ...
})
```

在另外一个 action 中也可以：

```js
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```

利用 `async / await`组合 action：

```js
// 假设 getData() 和 getOtherData() 返回的是 Promise
actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```



### 8、Module

Vuex 允许将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

对于模块内部的 mutation 和 getter，接收的第一个参数是**模块的局部状态对象**。

```js
const moduleA = {
  state: () => ({
    count: 0
  }),
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```

同样，对于模块内部的 action，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`：

```js
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```

对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：

```js
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```



### 9、命名空间

默认情况下，模块内部的 action、mutation 和 getter 是注册在**全局命名空间**的，这样使得多个模块能够对同一 mutation 或 action 作出响应

可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块

```js
const moduleA ={
    namespaced:true,  //开启namespace:true，该模块就成为命名空间模块了
    state:{
        name:"Tina",
        age:18
    },
    getters:{...},
    mutations:{...},
    actions:{...}
}
const moduleB ={
    namespaced:true,  //开启namespace:true，该模块就成为命名空间模块了
    state:{
        name:"Ace",
        age:20
    },
    getters:{...},
    mutations:{...},
    actions:{...}
}
               
 //注入
export default new Vuex.Store({
  modules: { moduleA, moduleB }
}); 
```

**获取数据：**

```js
//获取数据

//基本方式：
    this.$store.state.moduleA.countA
//mapState辅助函数方式：
    ...mapState({
        userName:state=>state.moduleB.name
    })
//mapState辅助函数命名空间获取：
 ...mapState("moduleB", {
      userName: "name",
    }),
```

**getters使用：**

```js
//组件中调用命名空间模块中的getters
//基本方式
this.$store.getters['moduleA/name']
//2.命名空间获取
...mapGetters('moduleA',{userName：'name'}]),
//3.路径获取
...mapGetters({
    userName:'moduleA/name'
}),

```

**Mutations使用:**

```js

//1.正常使用
this.$store.commit('moduleA/moduleAMutation');
//2.命名空间
...mapMutations('moduleA',['moduleAMutation']),
//3.路径
...mapMutations({
    changeNameMutation:'moduleA/moduleAMutation'
})

```

**Actions使用：**

```js

//1.正常使用
commonAction(){
    this.$store.dispatch('moduleA/moduleAAction')
},
//2.命名空间
...mapActions('moduleA',['moduleAAction']),
//3.路径
...mapActions({
    changeNameAction:'moduleA/moduleAAction'
})
```



$$

$$