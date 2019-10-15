import axios from 'axios';
import { authHeader } from '../../helpers';

const state = {
	users: {
		items:[]
	}
}

const mutations = {
	setItems(state, items) {
		state.users.items = items
	},
	clear(state) {
		const users = state.users;
		users.items = []
	}
}

const getters = {
	users: state => state.users.items,
	user: state => usersId => {
		const res = state.users.items.filter(({ id }) => id === usersId  )
		return res.length ? res[0] : null
	}
}

 const httpGetItems = async() => {
	const endpoint = `${process.env.VUE_APP_API_ENDPOINT}/users`;
	const headers = authHeader()
	const { data } = await axios.get(endpoint, { headers })
	return data
 }

 const actions = {

	async getItems({ commit } ) {
		const data = await httpGetItems()
		commit('setItems',data)
	},

	async create ({ dispatch }, item) {
		const endpoint = `${process.env.VUE_APP_API_ENDPOINT}/users/register/`;
		const headers = { ...authHeader(), 'Content-Type': 'application/json' }
		await axios.post(endpoint, item, {headers})
		return dispatch('getItems')
	},

	async delete ({ dispatch }, id) {
		const endpoint = `${process.env.VUE_APP_API_ENDPOINT}/users/${id}`;
		const headers = authHeader()
		await axios.delete(endpoint, { headers })
		return dispatch('getItems')
	}

 }

 export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions	 
 }