import * as types from './mutation-types'

export default {
  [types.AUTH_LOGIN] (state, payload) {
    throw new Error('AUTH_LOGIN mutaion should be implemented')
  },

  [types.FETCH_ALL_TASKLIST] (state, payload) {
    throw new Error('FETCH_ALL_TASKLIST mutaion should be implemented')
  },

  [types.ADD_TASK] (state, payload) {
    throw new Error('ADD_TASK mutaion should be implemented')
  },

  [types.UPDATE_TASK] (state, payload) {
    throw new Error('UPDATE_TASK mutaion should be implemented')
  },

  [types.REMOVE_TASK] (state, payload) {
    throw new Error('REMOVE_TASK mutaion should be implemented')
  },

  [types.AUTH_LOGOUT] (state, payload) {
    throw new Error('AUTH_LOGOUT mutaion should be implemented')
  }
}
