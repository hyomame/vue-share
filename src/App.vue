<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :color="appColor"
      :expand-on-hover="$vuetify.breakpoint.lgAndDown"
      :mini-variant="$vuetify.breakpoint.lgAndDown"
      :permanent="$vuetify.breakpoint.mdAndUp"
      app
      dark
    >
      <SideMenu />
    </v-navigation-drawer>
    <v-app-bar :color="appColor" app dark>
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.smAndDown"
        @click="showDrawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        {{ currentPage }}
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-row justify="center">
        <v-responsive max-width="600">
          <router-view />
        </v-responsive>
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
import SideMenu from '@/components/organisms/SideMenu'
import Firebase from '@/firebase'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    SideMenu
  },
  data () {
    return {
      drawer: false,
      appColor: 'blue darken-4',
      currentPage: '',
      appInfo: { title: 'Vwitter', icon: 'mdi-vuetify' },
      signedMenu: [
        { text: 'ホーム', icon: 'mdi-home', path: '/' },
        { text: 'プロフィール', icon: 'mdi-account', path: '/profile' },
        { text: 'サインアウト', icon: 'mdi-logout', path: '/signout' },
        { text: 'ヘルプ', icon: 'mdi-help', path: '/help' }
      ],
      notSignedMenu: [
        { text: '概要', icon: 'mdi-information-outline', path: '/about' },
        { text: 'サインイン', icon: 'mdi-login', path: '/signin' },
        { text: 'ヘルプ', icon: 'mdi-help', path: '/help' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'isSigned'
    ]),
    sideMenu: function () {
      if (this.isSigned) {
        return this.signedMenu
      } else {
        return this.notSignedMenu
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.currentPage = to.name
    }
  },
  created () {
    Firebase.setAuthState()
    this.currentPage = this.$router.currentRoute.name
  },
  methods: {
    showDrawer() {
      this.drawer = true
    }
  }
}
</script>
