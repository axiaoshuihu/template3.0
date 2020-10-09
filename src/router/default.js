import Layout from '@/layout';
const routers = [
  /* 业务功能路由 */
  // 首页
  {
    name: 'Index',
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-s-home', noCache: true, affix: true }
    }]
  },
  {
    name: 'Goods',
    path: '/goods',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '事件', icon: 'el-icon-s-home' },
    children: [{
      path: 'mygoods',
      name: 'Mygoods',
      component: () => import('@/views/goods/mygoods/index'),
      meta: { title: '我的事件', icon: 'el-icon-s-home', noCache: true }
    }, {
      path: 'usergoods',
      name: 'Usergoods',
      component: () => import('@/views/goods/usergoods/index'),
      meta: { title: '其它', icon: 'el-icon-s-home', noCache: true },
      children: [
        {
          path: 'userone',
          name: 'userone',
          component: () => import('@/views/goods/usergoods/userone'),
          meta: { title: '其它事件1', icon: 'el-icon-s-home', noCache: true }
        },
        {
          path: 'usertwo',
          name: 'usertwo',
          component: () => import('@/views/goods/usergoods/usertwo'),
          meta: { title: '其它事件2', icon: 'el-icon-s-home', noCache: true }
        }
      ]
    }]
  }

];

export default routers;
