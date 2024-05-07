import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieDetail from '../views/MovieDetail.vue'
import Login from '../views/auth/Login.vue'
import Registration from '../views/auth/Registration.vue'
import Logout from '../views/auth/Logout.vue'
// movies imports
import Create from '../views/admin/Create.vue'
import Update from '../views/admin/Update.vue'
import Read from '../views/admin/DisplayMovie.vue'
import Add from '../views/admin/Add.vue'

// user profile view page 
import Profile from '../views/Profile.vue'

const routes = [
  {
    // home routes:update this once functionality is tested
    path: '/',
    name: 'Add',
    component: Add
  },
  {
    path:'/movie/:id',
    name:'MovieDetail',
    component:MovieDetail,
    props:true
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path:'/logout',
    name:'Logout',
    component:Logout
  },
  
  {
    path:'/register',
    name:'Registration',
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
    name:'Update',
    component:Update,
    props: true
  },
  // {
  //   path:'/Add',
  //   name:'Add',
  //   component:Add,
  // },
  {
    path:'/movies',
    name:'Read',
    component:Read
  },
  // user profile
  {
    path:'/profile',
    name:'Profile',
    component:Profile

  },
   
  //all 404
  {
    path:'/:catchAll(.*)',
    name:'NotFound',
    component:NotFound
  }
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
