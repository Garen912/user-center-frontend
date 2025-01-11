interface State {
  user: {
    username: { [key: string]: any },
    userRole: number,
  }
}

const getters = {
  username: (state: State) => state.user.username,
}
export default getters
