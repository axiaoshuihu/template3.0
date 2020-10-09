export default [
    // 404
    {
      path: '/404',
      component: () => import('@/views/404'),
      hidden: true
    },
    // 404 page must be placed at the end !!!
    {
      path: '*',
      redirect: '/404',
      hidden: true
    }
];
