import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieDetail from '../views/MovieDetail.vue'
import Login from '../views/auth/Login.vue'
import Registration from '../views/auth/Registration.vue'
import Logout from '../views/auth/Logout.vue'
import NotFound from '../views/NotFound.vue'
// movies imports
import Create from '../views/admin/Create.vue'
import Update from '../views/admin/Update.vue'
import Read from '../views/admin/DisplayMovie.vue'
import Add from '../views/admin/Add.vue'

// user profile view page 
import Profile from '../views/Profile.vue'
import {jwtDecode as jwt_decode} from 'jwt-decode'

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
    component:Create,
    meta: { requiresAuth: true }
  },
  // update individual movie items
  {
    path:'/update/:id/edit',
    name:'Update',
    component:Update,
    props: true,
    meta:{requiresAuth:true}
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
    component:Profile,
    meta: { requiresAuth: true }

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
// vue.js:Navigation Guards
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isUserLoggedIn()) {
    next('/login');
  } else {
    next(); 
  }
});

const isUserLoggedIn = () => {
  const userToken = localStorage.getItem('token');
  if (!userToken) {
    return false; // Token not found, user is not logged in
  }
  try {
    const decodedToken = jwt_decode(userToken);
    return decodedToken.exp > Date.now() / 1000; // Check token expiration
  } catch (error) {
    console.error('Invalid token:', error);
    return false; // Invalid token, user is not logged in
  }
};




export default router
