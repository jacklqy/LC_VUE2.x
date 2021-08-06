<template>
  <div>
  
    <div v-for="(i, index) in list" :key="index" class="list">
      <div>
        <img
          @click="isExtChange(index)"
          v-if="i.roleList && !isExt[index]"
          src="../assets/img/1.png"
          alt=""
        />
        <img
          @click="isExtChange(index)"
          v-else-if="i.roleList && isExt[index]"
          src="../assets/img/2.png"
          alt=""
        />
        <input v-model="ids" :value="i.roleId" type="checkbox" />
        {{ i.name }}
      </div>
      <Tree v-if="i.roleList && !isExt[index]" :list="i.roleList" />

      <!-- 二级权限的循环  --- 数据源是一级里的roleList
        <div v-for="r in i.roleList" :key="r.roleId" class="list">
          <div>{{ r.name }}</div>
          三级权限的循环  --- 数据源是二级里的roleList
          <div v-for="s in r.roleList" :key="s.roleId" class="list">
            <div>{{ s.name }}</div>
             四级权限的循环  --- 数据源是三里的roleList
            <div v-for="o in s.roleList" :key="o.roleId" class="list">
                <div>{{ o.name }}</div>
            </div>
          </div>
        </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Tree",
  data() {
    return {
      //当树形结构是展开的时候，数组里对应的那一项的值为false
      //展开的状态  为false的时候就是展开，为true的时候就是收起
      isExt: [],
      ids: [],
    };
  },
  props: {
    list: Array,
  },
  beforeMount() {
    // this.isExt.length = this.list.length
    // console.log(this.list)
  },
  methods: {
    isExtChange(index) {
        // console.log(this.$store.state);
      // this.isExt[index] = !this.isExt[index]
      // [,,false]
      this.$set(this.isExt, index, !this.isExt[index]);
      // console.log(this.isExt)
    },
   
  },
};
</script>

<style lang="scss" scoped>
.list {
  margin-left: 15px;
  line-height: 25px;
}
img {
  width: 15px;
  height: 15px;
  cursor: pointer;
}
</style>