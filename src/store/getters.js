const getters = {
  isLogin: state => !!state.user.isLogin,
  user: state => state.user.user,
}
export default getters
