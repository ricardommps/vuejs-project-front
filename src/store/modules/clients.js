import axios from 'axios';
import { authHeader } from '../../helpers';

const state = {
	clients: {
		items:[]
	}
}

const mutations = {
	setItems(state, items) {
		state.clients.items = items
	},
	clear(state) {
		const clients = state.clients;
		clients.items = []
	}
}

const getters = {
	items: state => state.clients.items,
	item: state => clientId => {
		const res = state.clients.items.filter(({ id }) => id === clientId  )
		return res.length ? res[0] : null
	}
}

 const httpGetItems = async() => {
	const endpoint = `${process.env.VUE_APP_API_ENDPOINT}/clients`;
	const headers = authHeader()
	console.log("------httpGetItems",headers)
	const { data } = await axios.get(endpoint, { headers })
	return data
 }

 const actions = {

	async getItems({ commit } ) {
		const data = await httpGetItems()
		commit('setItems',data)
	},

	async changePage({ commit }) {
		const data = await httpGetItems()
		commit('setItems',data)
	},

	async modify ({ dispatch }, { item, id }) {
		const endpoint = `${process.env.VUE_APP_API_ENDPOINT}/clients/${id}`;
		const headers = { ...authHeader(), 'Content-Type': 'application/json' }
		await axios.put(endpoint, item, { headers })
		return dispatch('getItems')
	},

	async create ({ dispatch }, item) {
		const endpoint = `${process.env.VUE_APP_API_ENDPOINT}/clients/register/`;
		const headers = { ...authHeader(), 'Content-Type': 'application/json' }
		await axios.post(endpoint, item, {headers})
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