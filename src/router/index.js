import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/components/Login'
import Home from '@/components/Home'

import clientRoutes from './client-routes'
import userRoutes from './user-routes'


Vue.use(Router);

const router = new Router({
	mode: 'history',
	routes: [
		{ 
			path: '/home', 
			name: 'home',
			component: Home,
			meta: {
				requiresAuth: true,
			} 
		},
		{ 
			path: '/login', 
			name: 'login',
			component: Login,
			meta: {
				guest: true,
			}  
		},
		{ path: '*', redirect: '/home' },
		{...clientRoutes},
		{...userRoutes}
	]
});

router.beforeEach((to, from, next) => {
	// redirect to login page if not logged in and trying to access a restricted page
	const user = JSON.parse(localStorage.getItem('user'))
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if(user == null ) {
			next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
		}else {
			if(to.matched.some(record => record.meta.is_admin)) {
				if(user.type === 'admin'){
					next();
				}else{
					next({ name: 'home'})
				}
				
			} else if(to.matched.some(record => record.meta.is_user)){  
				if(user.type === 'admin' || user.type === 'user'){
					next();
				}else{
					next({ name: 'home'})
				}
				
			}else{
				next();
			}
		}
		
	} else {
		next()
	}
	
	
  })


export default router
