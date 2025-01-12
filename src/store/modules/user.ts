import type { Commit } from 'vuex'
import { fetchLoginUser } from '@/utils/user'
import type { UserState } from './user.interface'

const state: UserState = {
  username: '未登录',
}

const mutations = {
  SET_LOGIN_USER: (
    state: UserState,
    loginUser: { [key: string]: string }
  ) => {
    Object.assign(state, loginUser)
  },

  CLEAR_LOGIN_USER: (state: UserState) => {
    Object.keys(state).forEach((key) => {
      if (key !== 'username') {
        delete state[key]
      }
    })
    state.username = '未登录'
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
