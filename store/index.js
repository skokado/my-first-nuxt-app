import Vuex from 'vuex'

const baseUrl = 'https://qiita.com/api/v2'

export default () => (new Vuex.Store({
  state: {
    items: [],
    users: {},
    userItems: {}
  },
  getters: {
    items: (state) => state.items,
    users: (state) => state.users,
    userItems: (state) => state.userItems
  },
  mutations: {
    setItems(state, { items }) {
      state.items = items
    },
    setUser(state, { user }) {
      state.users[user.id] = user
    },
    setUserItems(state, { user, items }) {
      state.userItems[user.id] = items
    }
  },
  actions: {
    async fetchItems({ commit }) {
      const items =
        await this.$axios.$get(`${baseUrl}/items?query=tag:nuxt.js`)
      commit('setItems', { items })
    },
    async fetchUserInfo({ commit }, { id }) {
      const [user, items] = await Promise.all([
        this.$axios.$get(`${baseUrl}/users/${id}`),
        this.$axios.$get(`${baseUrl}/items?query=user:${id}`)
      ])
      commit('setUser', { user })
      commit('setUserItems', { user, items })
    }
  }
}))
