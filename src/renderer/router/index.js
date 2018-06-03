import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome-view',
      component: require('@/components/WelcomeView').default
    },
      {
          path: '/inspire',
          name: 'inspire',
          component: require('@/components/InspireView').default
      },
      {
          path: '/settings',
          name: 'settings',
          component: require('@/components/SettingsView').default
      },
      {
          path: '/about',
          name: 'about',
          component: require('@/components/AboutView').default
      },
      {
          path: '/profile',
          name: 'profile',
          component: require('@/components/ProfileView').default
      },
      {
          path: '/login',
          name: 'login',
          component: require('@/components/LoginView').default
      },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
