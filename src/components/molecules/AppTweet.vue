<template>
  <v-card outlined tile>
    <v-card-title>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="user.avatar" max-width="50"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ user.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card-title>
    <v-card-text class="font-weight-bold">
      {{ tweet.text }}
    </v-card-text>
    <v-card-actions>
      <v-btn
        @click="favorite(tweet.id, tweet.favorite)"
        text
      >
        <v-icon>mdi-heart</v-icon>
        <span>{{ tweet.favorite}}</span>
      </v-btn>
      <v-btn
        v-if="isCurrentUser"
        @click="deleteTweet(tweet.id)"
        text
      >
        <v-icon>mdi-delete</v-icon>
        <span>Delete</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: 'AppTweet',
  props: {
    tweet: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    },
    isCurrentUser: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    deleteTweet (id) {
      console.log('no action')
    },
    favorite (tweetid, favorite) {
      console.log('no action')
    }
  }
}
</script>
