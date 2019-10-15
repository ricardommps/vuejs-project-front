import ClientList from '@/components/clients/ClientList'
import Clients from '@/components/clients/Clients'
import Client from '@/components/clients/Client'

export default {
	path: '/clients',
	name: 'clients',
	component: Clients,
	meta: {
		requiresAuth: true,
		is_user : true
	},
	children: [
		{
			path: '',
			component: ClientList
		},
		{
			path: 'new',
			component: Client
		},
		{
			path: ':id',
			component: Client,
			props: true
		}
	]
}