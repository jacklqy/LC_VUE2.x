<template>
  <div class="index-box">
    <div class="header-box">
      <img src="../assets/logo.png" alt="" />
      <h1>朝夕VIP平台</h1>
      <span>嗨~ Tina</span>
    </div>
    <div class="main-box">
      <div class="left-box">
        <router-link
          tag="div"
          :class="{'active':active===i.name}"
          :to="i.path"
          v-for="i in routerList"
          :key="i.name"
          >{{ i.meta.title }}</router-link
        >
      </div>
      <div class="content-box">
           <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
// import tokenChange from '../mixins/tokenChange'
export default {
  name: "Index",
  //   mixins:[tokenChange],
  data() {
    return {
      routerList: [],
      active:''
    };
  },
  mounted() {
    this.routerList = this.$router.getRoutes().filter(v=>v.meta.isShow);
    console.log(this.routerList)
    console.log('--------------')
    console.log(this.$route)
    this.active = this.$route.name
    console.log(this.active)
    console.log('--------------')

  },
};
</script>

<style lang="scss" scoped>
.router-link-active{
  background-color: cadetblue;
  color: #fff;
}
.index-box {
  height: 100vh;
  .header-box {
    box-sizing: border-box;
    height: 13vh;
    background-color: cadetblue;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    color: #fff;
    img {
      width: 80px;
    }
  }
  .main-box {
    height: 87vh;
    display: flex;
    .left-box {
      width: 180px;
      background-color: #999;
      overflow-y: auto;
      div {
        height: 25px;
        line-height: 20px;
        color: #fff;
        padding: 10px;
        cursor: pointer;
        &:hover {
          background: cadetblue;
        }
      }
    }
    .content-box {
      box-sizing: border-box;
      flex: 1;
      background-color: #efefef;
      overflow-y: auto;
      padding: 15px;
    }
  }
}
</style>