import {
  SAVE_TOKEN
} from './mutation-types.js'
import {storage} from '../config/mUtils'


export default {
  doneTodos: state => {
    return state.todos.filter(todo => todo.done)
  },
  getTodoById: (state, getters) => (id) => {
    return state.todos.find(todo => todo.id === id)
  },

  getToken: state => {
    let token = storage.getLocal('token');
    if (state.token) {
      return state.token;
    } else if (token) {
      state.token = token;
      return token;
    } else {
      //todo
      return false;
    }
  },
  getUserInfo: state => {
    let userInfo = storage.getLocal('userInfo');
    if (state.userInfo.nick_name) {
      return state.userInfo;
    } else if (userInfo) {
      // 这样写更新vuex数据
      state.userInfo = {...userInfo}
      //   state.userInfo = Object.assign({},userInfo)
      return userInfo;
    } else {
      return false;
    }
  }
}
