import {
  getUser,
  getAddressList
} from '../service/getData'
import {
  ADD_COUNT,
  ADD_COUNT_BY,
  // GET_USERINFO,
  SAVE_ADDRESS,
} from './mutation-types.js'

export default {

  async countAdd({
    commit,
    state
  }) {
    let i = 0;
    setInterval(function () {
      commit(ADD_COUNT, ++i)
    }, 600)
  },
  async countAddBy({
    commit,
    state,
  }, count) {
    // console.log(init);
    let i = count;
    setInterval(function () {
      commit(ADD_COUNT_BY, ++i)
    }, 600)
  },

  // async getUserInfo({
  //   commit,
  //   state
  // }) {
  //   let res = await getUser();
  //   commit(GET_USERINFO, res)
  // },
  async saveAddress({
    commit,
    state
  }) {

    if (state.removeAddress.length > 0) return;

    let addres = await getAddressList(state.userInfo.user_id);
    commit(SAVE_ADDRESS, addres);
  },
}
