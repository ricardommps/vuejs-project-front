<template>
    <div class="row">
		<div class="col-sm-offset-4 col-sm-4">
			<h2>Login</h2>
			<form @submit.prevent="validateBeforeSubmit">
				<div class="form-group">
					<label for="username" class="control-label">Username</label>
					<input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
					<div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
				</div>
				<div class="form-group">
					<label htmlFor="password" class="control-label">Password</label>
					<input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
					<div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
				</div>
				<div class="form-group">
					<button class="btn btn-primary">Login</button>
					<router-link to="/register" class="btn btn-link">Register</router-link>
				</div>
			</form>
		</div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
	data () {
        return {
            username: '',
            password: '',
            submitted: false
        }
	},
	methods: {
		...mapMutations('notification', ['notify']),
		validateBeforeSubmit () {
			this.submitForm()
		},
		async submitForm (){
			try{
				await this.$store.dispatch('auth/login',{...this.$data})
				this.notify({ msg: 'You have been looged in.', type: 'info' })
				this.$router.push('/home')
			} catch(e){
				console.log(e)
			}
		}
	}
}
</script>