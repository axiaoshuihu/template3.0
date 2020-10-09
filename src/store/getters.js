const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  name: state => state.permission.name,
  tagsView: state => state.settings.tagsView,
  asyncRoutes: state => state.permission.addRoutes,
  routesObj: state => state.permission.routesObj,
  menus: state => state.permission.menus
};
export default getters;
