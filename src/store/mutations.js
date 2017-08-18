import * as types from './mutation-types'

export default {
  [types.UPDATE_USERINFO] (state, data){
    state.userinfo = data
  }
};
