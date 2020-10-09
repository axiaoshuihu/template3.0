import { goToLogin, goToLogout, getInfo } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
// import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',

  roles: []
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },

  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const {
      username,
      password
    } = userInfo;
    return new Promise((resolve, reject) => {
      goToLogin({
        account: username.trim(),
        password: password
      }).then(({
        data
      }) => {
        commit('SET_TOKEN', data.data.token);
        setToken(data.data.token);
        resolve();
      }).catch(error => {
        console.log(error, 'error');
        reject(error);
      });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then((res) => {
       commit('SET_ROLES', res.data.data.roles);
       resolve(res.data.data);
      }).catch(error => {
        console.log(error + 'error');
        reject(error);
      });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      goToLogout().then(res => {
        commit('SET_ROLES', []);
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
      removeToken();
      resolve();
    });
  }

};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
