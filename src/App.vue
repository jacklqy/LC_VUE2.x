<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link> 
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
*{
  margin: 0;
  padding: 0;
}
h3 {
  margin: 15px 0;
}
.option-box {
  display: flex;
  align-items: center;
  > div {
    margin-right: 20px;
    select,
    input {
      padding: 3px 10px;
    }
  }
  .btn {
    background-color: cadetblue;
    color: #fff;
    padding: 3px 10px;
    cursor: pointer;
  }
}
table {
  // border: 1px solid #efefef;
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  th {
    width: 20%;
    padding: 15px;
  }
  td {
    text-align: center;
    padding: 15px;
  }
  tr:hover {
    background-color: cadetblue;
    color: #fff;
  }
}

.lay{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #99999973;
}
</style>
