<template>
  <div class="login-box">
    <div class="form-box">
      <h1>Hello</h1>
      <div class="data-inp">
        <span>账号：</span>
        <input
          @blur="userNameChange"
          @input="userNameChange"
          v-model.trim="loginData.userName"
          placeholder="请输入账号"
          type="text"
        />
      </div>
      <div class="err" v-show="errText.userName">{{ errText.userName }}</div>
      <div class="data-inp">
        <span>密码：</span>
        <input
          @blur="passwordChange"
          @input="passwordChange"
          v-model.trim="loginData.password"
          placeholder="请输入密码"
          type="password"
        />
      </div>
      <div class="err" v-show="errText.password">{{ errText.password }}</div>
      <div class="data-inp">
        <div @click="downLoad" class="div-btn">登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      loginData: {
        userName: "",
        password: "",
      },
      errText: {
        userName: "",
        password: "",
      },
      // token:''
    };
  },
  // mounted(){
  //     let token = localStorage.getItem('token')
  //     if(token){
  //         this.$router.push('/')
  //     }
  // },
  methods: {
    downLoad() {
    //   let params = {
    //     // 根据后端需求传参
    //     attachments: "528fdba642304670a62302d3f84b7b85",
    //   };
      axios
        .post(
          "https://localhost:6001/api/OSS/DownloadZipByAttachments?attachments=6cd59755dc494e604776c4907d7983c4",
          {},
          {
            responseType: "blob",
            headers: {
              "Content-Type": "application/json; application/octet-stream",
            },
          }
        )
        .then(function (res) {
          console.log(res);
          const fileName = "文件.zip";
          const blob = new Blob([res.data], {
            type: "application/octet-stream;charset=utf-8",
          });
          if ("download" in document.createElement("a")) {
            console.log(3333);
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    userNameChange() {
      if (this.loginData.userName && this.loginData.userName.length > 5) {
        this.errText.userName = "";
      } else {
        this.errText.userName = "请输入正确格式的账号";
      }
    },
    passwordChange() {
      this.errText.password =
        this.loginData.password &&
        this.loginData.password.length > 5 &&
        this.loginData.password.length < 22
          ? ""
          : "密码长度应该为6~22位";
    },
    subFun() {
      this.userNameChange();
      this.passwordChange();
      let _this = this;
      if (this.errText.password || this.errText.userName) {
        return;
      } else {
        // alert('HTTP')
        axios
          .post(
            "https://www.fastmock.site/mock/323354e56ef21147c3f550e18435baa1/api/login",
            this.loginData
          )
          .then(function (response) {
            // console.log(response);
            let data = response.data;
            if (data.code === 200) {
              localStorage.setItem("token", data.data.token);
              // console.log(localStorage.getItem('token'))
              _this.$router.push("/");
            } else {
              alert(data.msg);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-box {
  height: 100vh;
  background: url("../assets/img/join2.jpg") 100%;
  box-sizing: border-box;
  padding-top: 200px;
  .form-box {
    width: 400px;
    height: 250px;
    background-color: #fff;
    border-radius: 15px;
    margin: 0 auto;
    h1 {
      text-align: center;
    }
    .data-inp {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 15px;
      color: #333;
      span {
        width: 50px;
      }
      input {
        flex: 1;
        height: 30px;
      }
      .div-btn {
        width: 100%;
        color: #fff;
        background-color: yellowgreen;
        border-color: yellowgreen;
        text-align: center;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
      }
    }
    .err {
      padding-left: 65px;
      color: red;
      font-size: 12px;
    }
  }
}
</style>