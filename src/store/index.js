import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import localStoragePlugin from './plugins/localStorage'
import items from './modules/clients.js'
import users from './modules/users.js'
import notification from './modules/notification'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: { notification, auth, items, users },
	plugins: [localStoragePlugin]
  })