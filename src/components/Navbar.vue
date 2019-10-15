<template>
	<nav class="navbar navbar-default" v-if="isLoggedIn">
		<div class="container-fluid">
			<div class="navbar-header">
				<router-link active-class="active" to="/home" class="navbar-brand" v-once>
					<span class="glyphicon glyphicon-home" aria-hidden="true"></span>
					&nbsp;My Schedules
				</router-link>
			</div>
			<ul class="nav navbar-nav">
				<router-link tag="li" active-class="active" to="/users" v-if="currentUser.type === 'admin'">
					<a>
						<span class="glyphicon glyphicon-globe" aria-hidden="true"></span>
						&nbsp;Users
					</a>
				</router-link>
				<router-link tag="li" active-class="active" to="/clients" v-if="currentUser.type === 'admin' || currentUser.type === 'user' ">
					<a>
						<span class="glyphicon glyphicon-globe" aria-hidden="true"></span>
						&nbsp;Clients
					</a>
				</router-link>
			</ul>
			<ul v-if="isLoggedIn" class="nav navbar-nav navbar-right">
				<li>
					<a>
						<span class="glyphicon glyphicon-user" aria-hidden="true"></span>
						<b class="status">{{ currentUser.firstName }}</b>
					</a>
				</li>
				<li>
					<a href="#" @click.prevent="logout">
						<span class="glyphicon glyphicon-log-out" aria-hidden="true"></span>
						&nbsp;Log out
					</a>
				</li>

			</ul>
		</div>
	</nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	data() {
		return {
			logado: false,
		}
	},
	computed: {
		...mapGetters('auth',['isLoggedIn', 'currentUser'])
	},
	methods: {
		logout () {
			this.$store.dispatch('auth/logout')
			this.$router.push('/login')
		}
	},
	created () {
		console.log("-----Created",this.isLoggedIn)
	}
}
</script>

<style scoped>
  a.active {
    color: #000 !important;
    text-shadow: 2px 2px #ccc;
  }
  .status {
    color: #555;
	margin-left: 5px;
  }
</style>