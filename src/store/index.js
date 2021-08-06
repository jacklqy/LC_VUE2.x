import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //响应式的数据
    ids:[],
    name:'',
  },
  mutations: {
    // setName(state,str){
    //   state.name = str
    // }
    setIds(state,arr){
      state.ids = arr
    },
  },
  actions: {
    // SETNAME(context){
    //   http.get().then(res=>{
    //     context.commit('setName',res)
    //   })
    // }

    DELIDS(context){
      context.commit('setIds',[])
    },
    SETIDS(context,ids){
      context.commit('setIds',ids)
    }

  },
  // modules: {
    
  // }
})
