import { constantRoutes } from '@/router'; // 路由

import defaultRouters from '@/router/default.js'; // 路由
import redirect from '@/router/redirect.js'; // 404路由

const state = {
  menus: []
};
const actions = {
  getmenus({ commit }) {
    return new Promise((resolve, reject) => {
        var routers = routers = [...defaultRouters, ...redirect];

        var newmenus = getmenus(routers);
        commit('SET_MENUS', newmenus);
        resolve(routers);
    });
  }
};
const mutations = {
  SET_MENUS: (state, newmenus) => { state.menus = newmenus; }
};

// 获取过滤后导航所需要的路由
function getmenus(routers) {
  return routers.filter(item => {
    return !item.hidde && item.children;
  });
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
