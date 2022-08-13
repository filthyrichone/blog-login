<template>
  <div class="login-page">
    <div class="login-box">
      <div class="log-title">
        <!-- <img src="./assets/default_avatar.jpg" alt="avatar"> -->
        <div
          @click="isActive = 'login'"
          :class="{ active: isActive === 'login' }"
        >
          login
        </div>
        <span style="border-right: 1px solid #efefef; height: 15px"></span>
        <div
          @click="isActive = 'singon'"
          :class="{ active: isActive === 'singon' }"
        >
          singon
        </div>
      </div>
      <div class="log-wrap">
        <div class="wrap-item">
          <label class="lable-txt" for="username"
            ><i class="iconfont icon-uname"></i
          ></label>
          <input
            v-focus
            @keydown.enter="submit"
            type="text"
            name="username"
            v-model="form.username"
            id="username"
          />
        </div>
        <div class="wrap-item">
          <label class="lable-txt" for="password"
            ><i class="iconfont icon-pwd"></i
          ></label>
          <input
            @keydown.enter="submit"
            type="password"
            name="password"
            v-model="form.password"
            id="pwd"
          />
        </div>
        <div class="wrap-item submit">
          <button
            v-if="isActive === 'login'"
            @click="submit"
            type="submit"
            class="submit-btn"
          >
            login
          </button>
          <button
            v-if="isActive === 'singon'"
            @click="submit"
            type="submit"
            class="submit-btn"
          >
            sing on
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  mounted() {
      const type = this.getUrlParam('type');
      if (type) {
          this.isActive = type;
      }
  },
});
</script>

<script lang="ts" setup>
console.log(document.cookie);
import { ref, reactive, toRaw, Directive, InputHTMLAttributes } from "vue";
import { http } from "@/hooks/http";
const vFocus: Directive = {
  mounted(el: HTMLInputElement) {
    el.focus();
  },
};
const isActive = ref("login");
const form = reactive({
  username: "",
  password: "",
});
const submit = async () => {
  try {
    const refer = getUrlParam('refer');
    const res = await http({
      url: isActive.value === "login" ? "/login" : "/register",
      method: "POST",
      data: {
        ...toRaw(form),
      },
    });
    if (res.status === "success") {
      window.open(refer, "_self");
    } else {
      console.error("login error");
    }
  } catch (error) {
    console.error(error);
  }
};

const getUrlParam = (name: string) => {
    if (location.href.includes(name)) {
      const reg = new RegExp(`${name}=.*&?`)
      const temp = location.href
        .match(reg)[0]
        .replace(`${name}=`, "")
        .replace(/&.*/, "") ;
        return temp;
    }
}
</script>
<style>
.login-page {
  height: 100%;
  background: center/cover url("@/assets/login_bgimg.jpg") no-repeat;
}
.lable-txt {
  color: white;
  white-space: nowrap;
  padding-right: 8px;
}
.submit-btn:hover {
  cursor: pointer;
  background-color: #89baeb;
}
.submit-btn {
  border-radius: 4px;
  padding: 8px 15px;
  font-size: 14px;
  color: white;
  background-image: linear-gradient(135deg, #d5e7e8, #0aafff);
  border: none;
}
input:focus {
  outline: none;
  border-color: #409eff;
}
input {
  -webkit-appearance: none;
  background-color: transparent;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #0aafff;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 1;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.submit {
  display: flex;
  justify-content: center;
  align-items: center;
}
.log-title img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.log-title div {
  font-size: 19px;
  font-weight: 600;
  line-height: 16px;
  padding: 0 20px;
  color: #efefef;
}
.log-title .active {
  color: #0aafff;
}
.log-title:hover {
  cursor: pointer;
}
.log-title {
  height: 36px;
  width: 100%;
  margin-top: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.log-wrap {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
/* .login-box::before {
  margin: -30px;
  filter: blur(10px);
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: center/cover no-repeat url("@/assets/bgimg.jpg");
  background-attachment: fixed;
  z-index: -1;
} */
.login-box {
  background-color: rgba(252, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  overflow: hidden;
  /* background-color: rgba(252, 248, 248, 0.301); */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  width: 300px;
  max-height: 400px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
