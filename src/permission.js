import router from './router';
import store from './store';
import { Message } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

import getPageTitle from '@/utils/get-page-title';
import nProgress from 'nprogress';

NProgress.configure({
  showSpinner: false
}); // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);
  if (to.path == '/login') {
    next();
    nProgress.done();
} else {
    // 2、登录用户信息（分角色  管理员  销售人员  初审人员）
    // 正常跳转   vuex中获取角色信息
    var hasRoles = store && store.getters.roles && store.getters.roles.length > 0;

    if (hasRoles) {
        next(); // 有角色  跳出拦截
        nProgress.done();
    } else {
        try { // 页面刷新 第一次登录
            const { roles } = await store.dispatch('user/getInfo'); // 获取用户详情
            var routers = await store.dispatch('permission/getmenus');
            router.options.routes = routers;
            router.addRoutes(routers);
            if (roles) {
                next({ ...to });
                nProgress.done();
            } else {
                next(`/login?redirect=${to.path}`);
                NProgress.done();
            }
        } catch (error) {
          await store.dispatch('user/resetToken');
          Message.error('Token已过期');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
    }
}
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
