import type { Commit } from 'vuex'
import { fetchLoginUser } from '@/utils/user'

const state = {
  username: '未登录',
}

const mutations = {
  SET_LOGIN_USER: (
    state: { [key: string]: string },
    loginUser: { [key: string]: string }
  ) => {
    Object.assign(state, loginUser)
    sessionStorage.setItem('loginUser', JSON.stringify(loginUser))
  },

  CLEAR_LOGIN_USER: (state: { [key: string]: string }) => {
    Object.keys(state).forEach((key) => {
      state[key] = ''
    })
    sessionStorage.removeItem('loginUser')
  },
}

const actions = {
  async setLoginUser({ commit }: { commit: Commit }) {
    const loginUser = await fetchLoginUser()
    if (loginUser) {
      commit('SET_LOGIN_USER', loginUser)
    }
  },

  async clearLoginUser({ commit }: { commit: Commit }) {
    commit('CLEAR_LOGIN_USER')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
