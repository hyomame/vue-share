<template>
  <v-container>
    <v-row>
      <v-col
        align="center"
        cols="12"
      >
        <v-img
          src="@/assets/logo.svg"
          max-width="100"
        ></v-img>
      </v-col>
      <v-col cols="12">
        <v-card align="center">
          <v-card-text>
            サインアウトします。<br>
            よろしいですか？
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        align="center"
        cols="12"
      >
        <v-btn
          @click="signout"
          style="text-transform: none"
          cols="3"
        >
          サインアウト
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Firebase from '@/firebase'

export default {
  name: 'Signout',
  methods: {
    signout () {
      Firebase.signout()
    }
  }
}
</script>
