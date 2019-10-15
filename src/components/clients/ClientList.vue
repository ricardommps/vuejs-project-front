<template>
	<div>
		<h3>Clients List</h3>
		<hr/>
		<router-link to="new" append class="btn btn-sm btn-primary">
			New Client
		</router-link>
		<div class="table-responsive">
			<table class="table table-striped">
				<thead>
					<tr>
					<th style="width: 30%">Name</th>
					<th style="width: 20%">Cpf/Cnpj</th>
					<th style="width: 20%">E-mail</th>
					<th style="width: 10%">Phone</th>
					<th style="width: 10%">BlackList</th>
					<th class="col-4">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="client in items" :key="client.id">
						<td>{{client.firstName}} {{client.lastName}}</td>
						<td>{{client.cpfCnpj}}</td>
						<td>{{client.email}}</td>
						<td>{{client.phone}}</td>
						<td>{{client.blackList}}</td>
						<td class="col-4">
							<router-link :to="client.id" append title="Edit Client">
								<i class="glyphicon glyphicon-pencil icon-action"></i>
							</router-link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	computed: {
      ...mapGetters('items', ['items'])
	},
	methods: {
		...mapActions('items',
			['getItems'])
	},
	mounted () {
      this.getItems()
    }
}
</script>

<style>
	.icon-action{
		margin-right: 15px
	}
</style>