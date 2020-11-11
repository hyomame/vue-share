<template>
  <v-container>
    <v-row>
      <v-col cols="12" align="center">
        <v-img src="@/assets/logo.svg" max-width="100"></v-img>
      </v-col>
      <v-col cols="12">
        <v-card align="center" justify="start">
          <v-card-text>
            サインイン処理中です
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Firebase from '@/firebase'

export default {
  name: 'Processing',
  created () {
    const hasRegistered = Firebase.registerAccount()

    hasRegistered.then(() => {
      alert('サインインしました!')
      this.$store.commit('signin')
      this.$router.push('/')
    }).catch(error => {
      alert(error.message)
      this.$router.push('/signin')
    })
  }
}
</script>
