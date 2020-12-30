import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import {firebaseApp}  from './firebase'
import ErrorPage from './components/ErrorPage.vue'
import Profile from './components/Profile.vue'
import Dashboard from './components/Dashboard.vue'
import History from './components/History.vue'
import Signup from './components/SignUp.vue'

Vue.use(Router)

let router =  new Router({
    routes: [
    {
        path: '/',
        name: 'Login',
        component: Login,
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/history',
        name: 'History',
        component: History,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '*',
        name: 'ErrorPage',
        component: ErrorPage
    }
]

})


//NavGuards
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if(!firebaseApp.auth().currentUser){
            next({
                path: '/',
                query: {
                    redirect: to.fullPath
                }
            })
        }
        else{
            next()
        }
    }
    else if(to.matched.some(record =>record.meta.requiresGuest)){
        if(firebaseApp.auth().currentUser){
            next({
                path: '/dashboard',
                query: {
                    redirect: to.fullPath
                }
            })
        }
        else{
            next()
        }
    }
    else{
        next()
    }
})


export default router
