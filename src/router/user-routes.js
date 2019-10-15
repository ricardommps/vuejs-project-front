import UserList from '@/components/users/UserList'
import Users from '@/components/users/Users'
import User from '@/components/users/User'

export default {
	path: '/users',
	name: 'users',
	component: Users,
	meta: {
		requiresAuth: true,
		is_admin : true
	},
	children: [
		{
			path: '',
			component: UserList
		},
		{
			path: 'new',
			component: User
		}
	]
}