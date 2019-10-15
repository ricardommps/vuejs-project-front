  import axios from 'axios'
  import { init } from '../plugins/localStorage'
  import _ from 'lodash';
  const state = {
	currentUser: init
  }

  const mutations = {

	setToken (state, user) {
		state.currentUser = user
	},
	resetToken (state) {
		state.currentUser = null
	}

  }

  const actions = {
	async login({commit}, user){
		const endpoint = `${process.env.VUE_APP_API_ENDPOINT}/users/authenticate`;
		const headers = { 'Content-Type': 'application/json' }
		const { data } = await axios.post(endpoint, user,headers)
		commit('setToken', data)
	},
	logout ({ commit }) {
		commit('resetToken')
	}

  }

  const _parseLodash = (str)  => {
	return _.attempt(JSON.parse.bind(null, str));
  }

  const getters = {
	isLoggedIn (state) {
		console.log('-----isLoggedIn',state.currentUser)
		if(!state.currentUser) return false
		try {
			if(state.currentUser.token) return true
			let user = _parseLodash(state.currentUser)
			if(!user.token) return false
			return true
		} catch(err) {
			return false
		}
		
	},

	currentUser (state) {
		if(!state.currentUser) return null
		try {
			if(state.currentUser.token) return state.currentUser
			let user = _parseLodash(state.currentUser)
			if(!user.token) return null
			return user
		} catch(err) {
			console.error(err)
			return null
		}
	}
	
  }

  export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
  }