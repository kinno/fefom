/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import Router from 'vue-router'
import Meta from 'vue-meta'

// Routes
import paths from './paths'

function route (path, view, name,meta) {
  return {
    name: name || view,
    path,
    component: (resovle) => import(
      `@/views/${view}.vue` || `@/components/app/${view}.vue`
    ).then(resovle),
    meta
  }
}

Vue.use(Router)

// Create a new router
const router = new Router({
  mode: 'history',
  routes: paths,
  // routes: paths.map(path => route(path.path, path.view, path.name, path.meta)).concat([
  //   { path: '*', redirect: '/' }
  // ]),
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   }
  //   if (to.hash) {
  //     return { selector: to.hash }
  //   }
  //   return { x: 0, y: 0 }
  // }
})

Vue.use(Meta)

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      console.log("ruta necesita auth", localStorage.getItem('jwt'))
      if (localStorage.getItem('jwt') == null) {
          next({
              path: '/',
              params: { nextUrl: to.fullPath }
          })
      } else {
          let user = JSON.parse(localStorage.getItem('user'))
          
          if(to.matched.some(record => record.meta.requiresFefom)) {
            console.log("ruta necesita fefom", user.tipo_usuario)
              if(user.tipo_usuario == 1){
                  next()
              }
              else{
               
                  next({ name: 'Dashboard'})
              }
          }else {
              next()
          }
      }
  } else if(to.matched.some(record => record.meta.guest)) {
    console.log("ruta no necesita auth")
      if(localStorage.getItem('jwt') == null){
          next()
      }
      else{
          next({ name: 'Dashboard'})
      }
  }else {
      next() 
  }
})

export default router
