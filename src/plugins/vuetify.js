import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    disable: true,
    themes: {
      light: {
        primary: '#4caf50',
        secondary: '#2196f3',
        accent: '#009688',
        error: '#f44336',
        warning: '#ffeb3b',
        info: '#cddc39',
        success: '#8bc34a'
        },
        dark: {
          primary: '#4caf50',
        secondary: '#2196f3',
        accent: '#009688',
        error: '#f44336',
        warning: '#ffeb3b',
        info: '#cddc39',
        success: '#8bc34a'
        },
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
