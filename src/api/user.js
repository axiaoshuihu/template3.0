import request from '@/utils/request';
// 登录
export const goToLogin = (data) => request({
  url: 'user/login',
  method: 'POST',
  data
});
// 退出
export const goToLogout = () => request({
  url: 'user/logout',
  method: 'POST'
});
// 修改密码
export const changePassword = (params) => request({
  url: '/user/password',
  method: 'PUT',
  params: params
});

// 获取用户信息
export const getInfo = (token) => request({
  url: `user/info?token=${token}`,
  method: 'GET'
});
