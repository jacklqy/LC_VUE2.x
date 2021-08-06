<template>
  <div>
    <h3>朝夕订单</h3>
    <div class="option-box">
      <div>
        <span>性别：</span>
        <select v-model="optionData.sex" name="" id="">
          <option value="">全部</option>
          <option value="男">男</option>
          <option value="女">女</option>
        </select>
      </div>
      <div>
        <span>id：</span>
        <input v-model="optionData.id"  type="text" />
      </div>
      <div>
        <div @click="getOption"  class="btn">查询</div>
      </div>
    </div>

    <table border="1">
      <tr>
        <th>id</th>
        <th>姓名</th>
        <th>性别</th>
        <th>地区</th>
        <th>职业</th>
      </tr>

      <tr v-for="i in pageList[page]" :key="i.id">
        <td>{{ i.id }}</td>
        <td>{{ i.username }}</td>
        <td>{{ i.sex }}</td>
        <td>{{ i.city }}</td>
        <td>{{ i.classify }}</td>
      </tr>
    </table>

    <div class="page-box">
      <!-- <select @change="getCont" name="" id="">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
            </select> -->
      <select v-model.number="cont" name="" id="">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>

      <span @click="getPage(page - 1)">上一页</span>
      <span
        :class="{ active: index === page }"
        @click="getPage(index)"
        v-for="(i, index) in pageList"
        :key="i.id"
        >{{ index + 1 }}</span
      >
      <span @click="getPage(page + 1)">下一页</span>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import $http from '../http/index'
export default {
  name: "Order",
  data() {
    return {
      list: [],
      pageList: [],
      page: 0,
      cont: 5,
      optionData:{
          sex:'',
          id:''
      }
    };
  },
  created() {
    this.getList();
  },
  watch: {
     cont(){
        //  console.log(v)
         this.getListPage()
     } 
  },
  methods: {
    getList() {
      $http("get/table").then((res) => {
        // let data = res.data;
        // if (data.code === 200) {
        //   this.list = data.data;
          this.list = res;
          this.getListPage();
          console.log(this.list);
          // [1,2,3,4,5,6,7,8,9,10]

          //[
          //     [1,2,3,4,5],
          //     [6,7,8,9,10]
          // ]
        // }
      });
    },
    getListPage() {
      //   this.list
      let option = {}
      this.optionData.id?option.id = this.optionData.id:'';
      this.optionData.sex?option.sex = this.optionData.sex:'';
    console.log(option)
     let ListData =[]
      if(option.id||option.sex){
          let {sex='',id=''} = option 
         ListData = this.list.filter(v=>{
            // if(Object.keys(option).length==2){
            if(sex&&id){
                return v.sex===sex&&v.id==id
            }else{
                return v.sex===sex||v.id==id
            }
            //  for (const key in option) {
            //      if(option[key]===v[key]){
            //         return v
            //      }
            //  }
        //    return this.optionData.id
        //    if(this.optionData.id){
        //        v.id===this.this.optionData.id
        //    }
        //    if(this.optionData.sex){
        //        v.sex ===this.optionData.sex
        //    }

       })
       console.log(ListData)
      }else{
          ListData = this.list
      }
       
      var arr = [];
      for (let index = 0; index < ListData.length; index++) {
        let data = ListData.slice(index, this.cont + index); //10 //20
        //    index+=9//9 //19
        index += this.cont - 1;
        arr.push(data);
      }
      this.pageList = arr;
    },
    getPage(page) {
      if (page < 0) {
        alert("已经是第一页了");
        return;
      } else if (page >= this.pageList.length) {
        alert("已经是最后一页了");
        return;
      }
      this.page = page;
    },
    getCont(e) {
      //   console.log(e)
      this.cont = +e.target.value;
      this.getListPage();
    },

    getOption(){
        // console.log(this.optionData)
        this.getListPage();
    }
  },
};
</script>

<style lang="scss" scoped>

.page-box {
  text-align: right;
  span,
  select {
    border: 1px solid #333;
    padding: 5px 10px;
    cursor: pointer;
    margin-right: 5px;
    background-color: #fff;
  }
  .active {
    color: red;
    border-color: red;
  }
}
</style>