import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ids:['Tina'],
    name:'Tina',
    id:""
  },
  mutations: {
    // setName(state,str){
    //   state.name = str
    // }
  },
  actions: {
    // SETNAME(context){
    //   http.get().then(res=>{
    //     context.commit('setName',res)
    //   })
    // }
  },
  modules: {
  }
})
