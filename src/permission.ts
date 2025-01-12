import router from '@/router'
import { getStore } from '@/store'
import { message } from 'ant-design-vue'

/**
 * 全局权限校验
 */
router.beforeEach(async (to, from, next) => {
  const store = await getStore
  const loginUser = (store.state as any).user
  const toUrl = to.fullPath

  if (toUrl.startsWith('/admin')) {
    if (!loginUser || loginUser.userRole !== 1) {
      message.error('没有权限')
      next(`/user/login?redirect=${to.fullPath}`)
      return
    }
  }
  if (toUrl === '/user/login' && loginUser.id) {
    message.error('已经登录，请勿重复登录')
    next(`/redirect?path=${from.fullPath}`)
    return
  }
  next()
})
