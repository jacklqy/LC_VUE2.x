<template>
  <div>
    <h3>用户列表</h3>
    <div class="option-box">
        <div @click="isAdd=true" class="btn">新增用户</div>
    </div>

    <table border="1">
      <tr>
        <th>id</th>
        <th>昵称</th>
        <th>用户名</th>
        <th>角色</th>
        <th>操作</th>
      </tr>

      <tr v-for="(i,index) in list" :key="i.id">
        <td>{{ i.id }}</td>
        <td>{{ i.nikeName }}</td>
        <td>{{ i.userName }}</td>
        <td>
            <span class="role-name-span" v-for="n in i.role" :key="n.role">{{n.roleName}}</span>
        </td>
        <td>
            <span @click="upData(index)" class="btn-span">修改角色</span>
            <span @click="delUser(index)" class="btn-span">删除用户</span>
        </td>
      </tr>
    </table>

    <!-- 新增用户弹窗 -->
    <div @click.self="isAdd=false" v-if="isAdd" class="lay">
        <div class="add-user-box">
            <div class="inp-box">
                <span>昵称：</span>
                <input v-model="addData.nikeName" placeholder="请输入昵称" type="text">
            </div>
            <div class="inp-box">
                <span>账号：</span>
                <input  v-model="addData.userName" placeholder="请输入昵称" type="text">
            </div>
            <div class="inp-box">
                <span>角色：</span>
                <div class="role-list-box">
                    <label  v-for="i in roleList" :key="i.roleId">
                        <input v-model="addData.role" :value="i"  type="checkbox">
                        {{i.roleName}}
                    </label>
                </div>
            </div>

            <div class="inp-box">
              <div @click="addUserFun" class="add-btn">提交</div>  
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import $http from '../http/index'
import axios from 'axios'
export default {
    name:'UserList',
    data() {
        return {
            list:[],
            isAdd:false,
            roleList:[],
            addData:{
                nikeName:'',
                userName:'',
                role:[],
            },
            index:-1
        }
    },
    created(){
        // this.getList()
        // .then(res=>{
        //     this.getRole().then(r=>{
        //         console.log(res,r)
        //     })
        // })

        // this.getRole()

            // 可以同时处理多个请求
         axios.all([$http('/getUserList'),$http('/getRoleList')])
            .then(axios.spread((h1, h2)=>{
                // 两个请求现在都执行完成
                console.log(h1,h2)
                h2.forEach(e => {
                    delete e.authority
                });
                console.log(h2)
                this.list = h1
                this.roleList = h2
            }))
       
    },
    methods:{
        // getList(){
        //     $http('/getUserList').then(res=>{
        //         this.list = res
        //     })
        // },
        // getRole(){
        //    $http('/getRoleList').then(res=>{
        //         this.list = res
        //     }) 
        // }

        addUserFun(){
           for (const key in this.addData) {
               if(!this.addData[key]&&key!='role'){
                    alert('信息不全，不能提交')
                    return
               }
               if(key=='role'&&this.addData[key].length===0){
                    alert('信息不全，不能提交')
                    return
               }
           }

           let data = {
               id:this.index>-1?this.addData.id:this.list.length+1,
               userName:this.addData.userName,
               nikeName:this.addData.nikeName,
               role:this.addData.role.map(v=>{
                   return {
                       role: v.roleId,
                       roleName:v.roleName
                   }
               })
           }
           if(this.index===-1){
            this.list.push(data)
           }else{
              this.list[this.index] = data 
           }
           this.isAdd = false
           this.addData={
                nikeName:'',
                userName:'',
                role:[],
           }
        },

        delUser(index){
            this.list.splice(index,1)

        },
        upData(index){
            this.addData = {...this.list[index]}
            this.addData.role=this.addData.role.map(v=>{
                   return {
                       roleId: v.role,
                       roleName:v.roleName
                   }
               })
               this.index=index
            this.isAdd = true
        }
    }
};
</script>

<style lang="scss" scoped>
.role-name-span{
    margin-right: 5px;
    // color: cadetblue;
}
.btn-span{
    cursor: pointer;
    margin-right: 5px;
    color: red;
}
.add-user-box{
    z-index: 2;
    width: 500px;
    padding: 20px;
    background-color: #fff;
    border-radius: 15px;
    margin: 200px auto;
    .inp-box{
      height: 50px;
      display: flex;
      align-items: center;
      span{
          width: 50px;
      }
      input{
          flex:1;
          height: 25px;
      }
      .add-btn{
          flex: 1;
          height: 35px;
          line-height: 35px;
          border-radius: 10px;
          text-align: center;
          color: #fff;
          background-color: cadetblue;
          cursor: pointer;
      }
    }
    .role-list-box,label{
        display: flex;
        align-items: center;
        input{
            width: 15px;
            height: 15px;
            margin-right: 5px;
        }

    }
    label{
        margin-right: 15px;
    }
}

</style>