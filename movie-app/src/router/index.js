import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieDetail from '../views/MovieDetail.vue'
import Login from '../views/auth/Login.vue'
import Registration from '../views/auth/Registration.vue'

// movies imports
import Create from '../views/admin/Create.vue'
import Update from '../views/admin/Update.vue'
import Read from '../views/admin/DisplayMovie.vue'
import Add from '../views/admin/Add.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/movie/:id',
    name:'MovieDetail',
    component:MovieDetail,
    props:true
  },
  {
    path:'/login',
    name:Login,
    component:Login
  },
  
  {
    path:'/register',
    name:Registration,
    component:Registration
  },
//  movies routes for admin page
  {
    path:'/create',
    name:Create,
    component:Create
  },
  // update individual movie items
  {
    path:'/update/:id/edit',
    name:Update,
    component:Update,
    props: true
  },
  {
    path:'/Add',
    name:Add,
    component:Add,
  },
  {
    path:'/movies',
    name:Read,
    component:Read
  }
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router