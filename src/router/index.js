import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function load (view) {
  return () => import(`@/views/${view}.vue`)
}

const routes = [
  {
    path: '/',
    component: load('Home'),
    children: [
      {
        path: '',
        name: 'Start',
        component: load('partials/Start')
      },
      {
        path: 'typeText',
        name: 'Input Text',
        component: load('partials/TypeText')
      },
      {
        path: 'typeNumber',
        name: 'Input Number',
        component: load('partials/TypeNumber')
      },
      {
        path: 'typeEmail',
        name: 'Input E-mail',
        component: load('partials/TypeEmail')
      },
      {
        path: 'typePassword',
        name: 'Input Password',
        component: load('partials/TypePassword')
      },
      {
        path: 'typeSearch',
        name: 'Input Search',
        component: load('partials/TypeSearch')
      },
      {
        path: 'typeTel',
        name: 'Input Tel',
        component: load('partials/TypeTel')
      },
      {
        path: 'typeUrl',
        name: 'Input Url',
        component: load('partials/TypeUrl')
      },
      {
        path: 'typeTextarea',
        name: 'Input Textarea',
        component: load('partials/TypeTextarea')
      },
      {
        path: 'typeRange',
        name: 'Input Range',
        component: load('partials/TypeRange')
      },
      {
        path: 'typeFile',
        name: 'Input File',
        component: load('partials/TypeFile')
      },
      {
        path: 'date',
        name: 'Date',
        component: load('partials/Date')
      }
    ]
  }
]

const router = new Router({
  mode: 'hash',
  base: __dirname,
  routes
})

export default router
