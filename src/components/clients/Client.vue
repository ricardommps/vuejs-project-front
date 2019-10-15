<template>
	<div class="row">
		<div class="col-sm-offset-4 col-sm-4">
			<h3>Edit CLient</h3>
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
					<label class="contro-label" for="cpfCnpj"> Cpf/Cnpj </label>
					<input id="cpfCnpj"
						v-model.trim="cpfCnpj"
						class="form-control" type="text" placeholder="Cpf/Cnpj">
				</div>

				<div class="form-group">
					<label class="contro-label" for="email"> E-Mail </label>
					<input id="email"
						type="email"
						v-model.trim="email"
						class="form-control" placeholder="exemplo@exemplo.com">
				</div>

				<div class="form-group">
					<label class="contro-label" for="phone"> Phone </label>
					<input id="phone"
						type="phone"
						v-model.trim="phone"
						class="form-control" placeholder="(00)000000000">
				</div>

				<div class="form-group">
					<label class="contro-label" for="address"> Address </label>
					<input id="address"
						type="text"
						v-model.trim="address"
						class="form-control" placeholder="Address">
				</div>

				<div class="custom-control custom-checkbox form-group">
					<input type="checkbox" class="custom-control-input" id="blackList" v-model.trim="blackList">
					<label class="custom-control-label" for="blackList">BlackList</label>
				</div>
				<div class="form-group">
					<button type="submit" class="btn btn-default">Submit</button>
					&nbsp;
					<router-link to="../" append class="btn btn-default">Reject</router-link>
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
			cpfCnpj: '',
			firstName: '',
			lastName: '',
			email: '',
			address: '',
			phone: '',
			blackList: null

		}
	},
	computed: {
		...mapGetters('items',['item'])
	},
	methods: {
		...mapActions('items', ['modify','create']),
		validateBeforeSubmit (){
			this.submitForm()
		},
		async submitForm () {
			if(this.id) {
				try {
					await this.modify({ item: {...this.$data }, id: this.id })
					this.$router.push('/clients')
				} catch (e) {
					console.log(e)
				}
			}else{
				try {
					await this.create({ ...this.$data })
					this.$router.push('/clients')
				}catch (e) {
					console.log(e)
				}
			}
		}
	},
	created () {
		console.log('--------CLIENT PAGE', this.id )
		if( !this.id ) return
		const client = this.item(this.id)
		if(!client){
			this.$router.push('/clients')
			return
		}
		this.cpfCnpj = client.cpfCnpj
		this.firstName = client.firstName
		this.lastName = client.lastName
		this.email = client.email
		this.address = client.address
		this.phone = client.phone
		this.blackList = client.blackList
	}
}
</script>