import defaultSettings from '@/settings';
import { getSupplierInfo } from '@/api/user';
import store from '../index';

const { title, logo, tagsView, fixedHeader, sidebarLogo } = defaultSettings;

const state = {
  title: title,
  logo: logo,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  tagsView: tagsView
};

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  }
};

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data);
  },
  // 获取商家名称
  setSupplierInfo({ commit }) {
    return new Promise((resolve, reject) => {
       getSupplierInfo().then(({ data }) => {
         commit('CHANGE_SETTING', { key: 'title', value: data.supplier_name });
      });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

