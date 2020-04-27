import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/invite/src/components/HelloWorld'


const Login = () => import('views/views/login/index.vue');
const Home = () => import('views/views/home/index.vue');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          component: HelloWorld,
          name: 'HelloWorld'
        },
        {
          path: 'login',
          component: Login,
          name: 'login'
        },
        {
          path: 'home',
          component: Home,
          name: 'home'
        }
      ]
    }
  ]
})
