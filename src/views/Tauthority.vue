<template>
  <div class="tauthority-box">
       <div class="option-box">
      <div @click="getIds" class="btn">提交修改</div>
    </div>
    <div>
      <!-- 一级权限的循环 -->
      <Tree :list="list"/>
    </div>
  </div>
</template>


<script>
import $http from "../http/index";
import Tree from '../components/Tree.vue'
import {mapState} from 'vuex'

export default {
  name: "Tauthority",
  data() {
    return {
      list: [],
      queryDate:''
    };
  },
  components:{Tree},
  computed:{
    // ids:()=>this.$store.state.ids,
     ...mapState(['ids'])
  },
  created() {
    this.queryDate = {
      id:this.$route.query.id,
      authority:JSON.parse(this.$route.query.authority)
    }
     this.$store.dispatch('SETIDS',this.queryDate.authority)
    // console.log( this.queryDate);

    $http("/geTauthority").then((res) => {
      this.list = res;
    });
  },

  beforeDestroy(){
      this.$store.dispatch('DELIDS')
  },
  methods: {
       getIds(){
        console.log(this.ids);
    }
  },
};
</script>

<style lang="scss" scoped>


</style>