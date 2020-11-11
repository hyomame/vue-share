<template>
  <v-container class="pa-0">
    <v-list-item>
      <v-list-item-icon>
        <v-icon>{{ appInfo.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title class="title">{{ appInfo.title }}</v-list-item-title>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item
        v-for="(item, index) in sideMenu"
        :key="index"
        :to="item.path"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SideMenu',
  data () {
    return {
      appInfo: { title: 'Vwitter', icon: 'mdi-vuetify' },
      signedMenu: [
        { text: 'ホーム', icon: 'mdi-home', path: '/' },
        { text: 'プロフィール', icon: 'mdi-account', path: '/profile' },
        { text: 'サインアウト', icon: 'mdi-logout', path: '/signout' },
        { text: 'ヘルプ', icon: 'mdi-help', path: '/help' }
      ],
      unsignedMenu: [
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
        return this.unsignedMenu
      }
    }
  }
}
</script>
