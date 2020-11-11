<template>
  <v-container>
    <v-row no-gutters>
      <v-col
        cols="12"
        v-for="(tweet, index) in tweets"
        :key="index"
      >
        <AppTweet
          :tweet="tweet"
          :user="getTweetUser(tweet)"
          :isCurrentUser="isCurrentUser(tweet)"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import AppTweet from '@/components/molecules/AppTweet'

export default {
  name: 'Timeline',
  components: {
    AppTweet
  },
  computed: {
    ...mapGetters([
      'users',
      'tweets',
      'currentUser'
    ]),
    getTweetUser: function () {
      return function (tweet) {
        const index = this.users.findIndex(user => user.uid === tweet.user)

        if (index !== -1) {
          return this.users[index]
        }
      }
    },
    isCurrentUser: function () {
      return function (tweet) {
        if (this.currentUser.uid === tweet.user) {
          return true
        } else {
          return false
        }
      }
    }
  }
}
</script>
