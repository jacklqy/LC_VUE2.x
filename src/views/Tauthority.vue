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
export default {
  name: "Tauthority",
  data() {
    return {
      list: [],
    };
  },
  components:{Tree},
  created() {
    $http("/geTauthority").then((res) => {
      this.list = res;
    });
  },
  methods: {
       getIds(){
        // console.log(this.ids);
    }
  },
};
</script>

<style lang="scss" scoped>


</style>