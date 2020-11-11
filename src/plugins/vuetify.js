import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  breakpoint: {
    thresholds: {
      xs: 480,
      sm: 600,
      md: 960,
      lg: 1280
    }
  }
})
