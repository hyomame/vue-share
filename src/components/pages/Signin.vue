<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        align="center"
      >
        <v-img
          src="@/assets/logo.svg"
          max-width="100"
        ></v-img>
      </v-col>
      <v-col align="center" cols="12">
        <v-btn @click="signin" style="text-transform: none" cols="3">
          Twitterアカウントでサインイン
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Signin',
  methods: {
    signin () {
      console.log('no action')
    }
  }
}
</script>
