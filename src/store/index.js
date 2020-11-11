import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSigned: false,
    users: [],
    tweets: [],
    currentUser: {}
  },
  getters: {
    isSigned: state => {
      return state.isSigned
    },
    users: state => {
      return state.users
    },
    getUserById: (state) => (index) => {
      return state.users[index]
    },
    tweets: state => {
      return state.tweets
    },
    currentUser: state => {
      return state.currentUser
    }
  },
  mutations: {
    // Update isSigned
    signin (state) {
      state.isSigned = true
    },
    signout (state) {
      state.isSigned = false
    },
    // Update users
    pushUser (state, userObject) {
      const index = state.users.findIndex(user => user.id === userObject.id)
      if (index === -1) {
        state.users.push(userObject)
      }
    },
    modifyUser (state, userObject) {
      const index = state.users.findIndex(user => user.id === userObject.id)
      if (index !== -1) {
        state.users.splice(index, 1, userObject)
      }
    },
    removeUser (state, userObject) {
      const index = state.users.findIndex(user => user.id === userObject.id)
      if (index !== -1) {
        state.users.splice(index, 1)
      }
    },
    resetUsers (state) {
      state.users = []
    },
    // Update tweets
    pushTweet (state, tweetObject) {
      const index = state.tweets.findIndex(tweet => tweet.id === tweetObject.id)
      if (index === -1) {
        state.tweets.splice(0, 0, tweetObject)
      }
    },
    modifyTweet (state, tweetObject) {
      const index = state.tweets.findIndex(tweet => tweet.id === tweetObject.id)
      if (index !== -1) {
        state.tweets.splice(index, 1, tweetObject)
      }
    },
    removeTweet (state, tweetObject) {
      const index = state.tweets.findIndex(tweet => tweet.id === tweetObject.id)
      if (index !== -1) {
        state.tweets.splice(index, 1)
      }
    },
    resetTweets (state) {
      state.tweets = []
    },
    // Update currentUser
    setCurrentUser (state, userObject) {
      state.currentUser = userObject
    },
    resetCurrentUser (state) {
      state.currentUser = {}
    }
  },
  actions: {
    signout (context) {
      context.commit('signout')
      context.commit('resetUsers')
      context.commit('resetTweets')
      context.commit('resetCurrentUser')
    }
  },
  modules: {
  }
})
