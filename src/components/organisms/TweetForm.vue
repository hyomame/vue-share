<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card outlined tile>
          <v-card-title>
            <v-list-item>
              <v-list-item-avatar>
                <v-img :src="currentUser.avatar" max-width="50"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ currentUser.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card-title>
          <v-card-text>
            <v-form v-model="valid" @submit.prevent>
              <v-text-field
                v-model="tweetText"
                :rules="tweetRules"
                label="つぶやき"
                placeholder="最近どんなことがありましたか?"
                required
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-form @submit.prevent>
              <v-btn
                :disabled="!valid"
                @click="addTweet"
              >
                つぶやく
              </v-btn>
            </v-form>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Firebase from '@/firebase'

import { mapGetters } from 'vuex'

export default {
  name: 'TweetForm',
  data () {
    return {
      valid: false,
      tweetText: '',
      tweetRules: [
        v => !!v
      ]
    }
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  methods: {
    addTweet () {
      Firebase.addTweet(this.tweetText)
      this.tweetText = ''
    }
  }
}
</script>
