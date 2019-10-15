<template>
	<div class="row">
		<div class="col-sm-offset-4 col-sm-4">
			<h3>User</h3>
			<hr/>
			<form @submit.prevent="validateBeforeSubmit">
				<div class="form-group">
					<label class="contro-label" for="firstName"> First Name </label>
					<input id="firstName"
						v-model.trim="firstName"
						class="form-control" type="text" placeholder="First Name">
				</div>

				<div class="form-group">
					<label class="contro-label" for="lastName"> Last Name </label>
					<input id="lastName"
						v-model.trim="lastName"
						class="form-control" type="text" placeholder="Last Name">
				</div>

				<div class="form-group">
					<label class="contro-label" for="username"> Username</label>
					<input id="username"
						type="text"
						v-model.trim="username"
						class="form-control" placeholder="Username">
				</div>

				<div class="form-group">
					<label class="contro-label" for="type"> Type </label>
					<select v-model="type" id="type" class="form-control" required>
						<option>client</option>
						<option>user</option>
						<option>admin</option>
					</select>
				</div>

				<div class="form-group">
					<label class="contro-label" for="password"> Password </label>
					<input id="phone"
						type="password"
						v-model.trim="password"
						class="form-control" placeholder="Password">
				</div>

				<div class="form-group">
					<button type="submit" class="btn btn-default">Submit</button>
					&nbsp;
					<router-link to="../" append class="btn btn-default">Back</router-link>
				</div>
			</form>
		</div>
	</div>	
		
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	props: ['id'],
	data() {
		return {
			firstName: '',
			lastName: '',
			username: '',
			password: '',
			type: ''
		}
	},
	computed: {
		...mapGetters('users',['use'])
	},
	methods: {
		...mapActions('users', ['create']),
		validateBeforeSubmit (){
			this.submitForm()
		},
		async submitForm () {
			if(this.id) {
				try {
					await this.modify({ item: {...this.$data }, id: this.id })
					this.$router.push('/users')
				} catch (e) {
					console.log(e)
				}
			}else{
				try {
					await this.create({ ...this.$data })
					this.$router.push('/users')
				}catch (e) {
					console.log(e)
				}
			}
		}
	},
	created () {
		if( !this.id ) return
		const user = this.item(this.id)
		if(!user){
			this.$router.push('/users')
			return
		}
		this.firstName = user.firstName
		this.lastName = user.lastName
		this.username = user.username
		this.password = user.password
		this.type = user.type
	}
}
</script>