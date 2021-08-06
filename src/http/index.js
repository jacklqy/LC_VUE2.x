import axios from 'axios'
import router from '../router/index'
const $http = axios.create({
    baseURL: 'https://www.fastmock.site/mock/323354e56ef21147c3f550e18435baa1/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });



  const url = ['/login','..','....']

  //请求拦截，请求发送之前拦截请求，做数据处理

  // 拦截请求，配置请求需要的特殊数据
  $http.interceptors.request.use(config=>{
    //   console.log(config)
    if(url.indexOf(config.url)!=-1){
      config.headers.token = localStorage.getItem('token')
    }
    return config
  })


  //响应拦截
//接口请求完毕之后拦截
//无论接口是什么状态，都会拦截
  $http.interceptors.response.use(res=>{
      console.log(res)
      let data = res.data
      if(data.code ===200){
          return data.data
      }else if(res.code===201){
         alert('登录失效')
         localStorage.removeItem('token')
         router.push('/login')
      }
    //   return res
  })


  export default $http