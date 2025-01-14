<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="200px">
        <div class="title-bar">
          <img class="logo" src="../assets/logo.png" alt="logo" />
          <div class="title">鱼皮用户中心</div>
        </div>
      </a-col>
      <a-col flex="auto">
        <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" @click="doMenuClick" />
      </a-col>
      <a-col flex="150px">
        <div class="user-login-status">
          <div v-if="loginUser.id">
            {{ loginUser.username ?? '无名' }}
            <a-button type="primary" @click="logout" style="margin-left: 32px;">注销</a-button>
          </div>
          <div v-else>
            <a-button type="primary" href="/user/login">登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'
import { CrownOutlined, HomeOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { MenuProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { userLogout } from '@/api/user'

const store = useStore()
const loginUser = store.state.user

const router = useRouter()
// 点击菜单后的路由跳转事件
const doMenuClick = ({ key }: { key: string }) => {
  router.push({
    path: key,
  })
}

const current = ref<string[]>(['mail'])
// 监听路由变化，更新当前菜单选中状态
router.afterEach((to) => {
  current.value = [to.path]
})

const items = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/user/login',
    label: '用户登录',
    title: '用户登录',
  },
  {
    key: '/user/register',
    label: '用户注册',
    title: '用户注册',
  },
  {
    key: '/admin/userManage',
    icon: () => h(CrownOutlined),
    label: '用户管理',
    title: '用户管理',
  },
  {
    key: 'others',
    label: h(
      'a',
      { href: 'https://www.codefather.cn', target: '_blank' },
      '编程导航'
    ),
    title: '编程导航',
  },
])

const logout = async () => {
  let res = await userLogout()
  console.log('res', res);
  if (res.data.data == 1) {
    message.success('退出登录成功')
    store.dispatch('user/clearLoginUser')
    router.push('/')
  } else {
    message.error('退出登录失败')
  }
}
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: black;
  font-size: 18px;
  margin-left: 16px;
}

.logo {
  height: 48px;
}

.user-login-status {
  display: flex;
  justify-content: flex-end;
}
</style>
