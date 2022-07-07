import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const Video = () => import('@/views/Video')
const My = () => import('@/views/My')
const Home = () => import('@/views/Home')
const Question = () => import('@/views/Question')
const Login = () => import('@/views/Login')
const Search = () => import('@/views/Search')
const Article = () => import('@/views/Article')
Vue.use(VueRouter)

const routes = [
  // { path: '/', redirect: My },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: 'home', name: 'home', component: Home },
      { path: 'video', name: 'video', component: Video },
      { path: 'question', name: 'question', component: Question },
      { path: 'my', name: 'my', component: My }
    ]
  },
  { path: '/login', component: Login },
  { path: '/search', component: Search },
  { path: '/article/:article_id', component: Article, name: 'article', props: true } // params 相关的路由 加props:true 可以让路由和组件解耦
]

const router = new VueRouter({
  routes
})

export default router
