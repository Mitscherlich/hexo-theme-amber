import { createApp } from 'vue'
import { createPinia } from 'pinia'
import bootstrap from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import nprogress from 'nprogress'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAngleLeft,
  faBook,
  faBookmark,
  faCalendar,
  faClock,
  faLink,
  faRss,
  faSearch,
  faTag,
  faUserEdit,
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebook,
  faGithubAlt,
  faSafari,
  faTwitter,
  faWeibo,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import router from './router'

export const store = createPinia()

export const app = createApp(App).use(router).use(store).use(bootstrap)

library.add(
  faAngleLeft,
  faBook,
  faBookmark,
  faCalendar,
  faClock,
  faLink,
  faRss,
  faSearch,
  faTag,
  faUserEdit,
)
library.add(faFacebook, faGithubAlt, faSafari, faTwitter, faWeibo)

app.component('fa-icon', FontAwesomeIcon)

router.isReady().then(async () => {
  router.beforeResolve(async (to, from, next) => {
    const matched = to.matched
    const prevMatched = from.matched

    let diffed = false
    const activated = matched.filter((component, index) => {
      return diffed || (diffed = prevMatched[index] !== component)
    })

    if (!activated.length) {
      return next()
    }

    try {
      nprogress.start()
      const hooks = activated
        .map((c: any) => c.fetch || (c.options && c.options.fetch))
        .filter(Boolean)

      await Promise.all(hooks.map((hook) => hook({ route: to })))

      if (window) {
        window.scrollTo(0, 0)
      }

      nprogress.done()
      next()
    } catch (e) {
      nprogress.done(true)
      next(e)
    }
  })

  // Fetch initial state
  const initMatched = router.currentRoute.value.matched
  const asyncDataHooks = initMatched
    .map((c: any) => c.fetch || (c.options && c.options.fetch))
    .filter(Boolean)
  await Promise.all(asyncDataHooks.map((hook) => hook({ route: router.currentRoute })))

  // start!
  app.mount('#app')
})
