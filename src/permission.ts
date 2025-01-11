import router from '@/router'
import { getStore } from '@/store'
import { message } from 'ant-design-vue'

/**
 * 全局权限校验
 */
router.beforeEach(async (to, from, next) => {
  const store = await getStore
  const toUrl = to.fullPath
  const loginUser = JSON.parse((sessionStorage.getItem('loginUser') as string))

  if (loginUser) {
    store.commit('user/SET_LOGIN_USER', loginUser)
  } else {
    store.commit('user/CLEAR_LOGIN_USER')
  }

  if (toUrl.startsWith('/admin')) {
    if (!loginUser || loginUser.userRole !== 1) {
      message.error('没有权限')
      next(`/user/login?redirect=${to.fullPath}`)
      return
    }
  } else {
    if (toUrl === '/user/login' && loginUser) {
      message.error('已经登录，请勿重复登录')
      next(`/redirect?path=${from.fullPath}`)
      return
    }
  }
  next()
})
