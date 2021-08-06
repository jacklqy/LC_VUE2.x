<template>
  <div>
    <h3>角色列表</h3>
    <div class="option-box">
        <div @click="isAdd=true" class="btn">新增角色</div>
    </div>

    <table border="1">
      <tr>
        <th>角色id</th>
        <th>角色名</th>
        <th>操作</th>
      </tr>

      <tr v-for="(i,index) in list" :key="i.roleId">
        <td>{{ i.roleId }}</td>
        <td>{{ i.roleName }}</td>
        <td>
            <span @click="upData(index)" class="btn-span">修改权限</span>
            <span @click="delUser(index)" class="btn-span">删除角色</span>
        </td>
      </tr>
    </table>

    <!-- 新增用户弹窗 -->
    <div @click.self="isAdd=false" v-if="isAdd" class="lay">
        <div class="add-user-box">
            <div class="inp-box">
                <span>角色名：</span>
                <input v-model="addData.userName" placeholder="请输入角色名" type="text">
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
export default {
    name:'RoleList',
    data() {
        return {
            list:[],
            isAdd:false,
            roleList:[],
            addData:{
                userName:'',
            },
            index:-1
        }
    },
    created(){
        this.getList()
       
    },
    methods:{
        getList(){
            $http('/getRoleList').then(res=>{
                this.list = res
            })
        },
        addUserFun(){
           if(!this.addData.userName){
             alert('请输入角色名字')
             return
           }

           let data = {
               roleId:this.list.length+1,
               roleName:this.addData.userName,
           }
          
           this.list.push(data) 

           this.isAdd = false
           this.addData={
                userName:'',
           }
        },

        delUser(index){
            this.list.splice(index,1)
        },
        upData(index){
            console.log(index);
            // this.addData = {...this.list[index]}
            // this.addData.role=this.addData.role.map(v=>{
            //        return {
            //            roleId: v.role,
            //            roleName:v.roleName
            //        }
            //    })
            //    this.index=index
            // this.isAdd = true
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
          width: 70px;
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