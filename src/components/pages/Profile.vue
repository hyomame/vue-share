<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card outlined tile>
          <v-card-title>
            現在のユーザ
          </v-card-title>
          <v-card-text>
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
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click.stop="dialog=!dialog; getCurrentuserInfo()"
            >
              プロフィールを編集
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card>
        <v-card-title>プロフィールを編集</v-card-title>
        <v-card-text>
          <v-form v-model="valid" @submit.prevent>
            <v-text-field
              v-model="newUsername"
              :rules="usernameRules"
              label="アカウント名"
              required
            >
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-form @submit.prevent>
            <v-btn
              text
              :disabled="!valid"
              @click="updateUserProfile"
            >
              保存
            </v-btn>
            <v-btn
              text
              @click="dialog=!dialog"
            >
              キャンセル
            </v-btn>
          </v-form>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  data () {
    return {
      dialog: false,
      valid: false,
      newUsername: '',
      usernameRules: [
        v => !!v || '名前を入力してください'
      ]
    }
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ]),
    isUsernameInput: function () {
      if (this.newUsername) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    console.log('no action')
  },
  methods: {
    getCurrentuserInfo () {
      this.newUsername = this.currentUser.name
    },
    updateUserProfile () {
      console.log('no action')
      this.newUsername = ''
      this.dialog = !this.dialog
    }
  }
}
</script>
