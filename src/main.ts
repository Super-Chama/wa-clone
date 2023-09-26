import App from './App.vue'
import { createApp } from 'vue'
import 'normalize.css/normalize.css'
import { firebaseApp } from './firebase'
import { VueFire, VueFireAuth } from 'vuefire'

createApp(App)
  .use(VueFire, {
    firebaseApp,
    modules: [
      VueFireAuth()
    ]
  })
  .mount('#app')
