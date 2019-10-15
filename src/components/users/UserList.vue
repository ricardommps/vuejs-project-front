<template>
	<div>
		<h3>Users List</h3>
		<hr/>
		<router-link to="new" append class="btn btn-sm btn-primary">
			New User
		</router-link>
		<div class="table-responsive">
			<table class="table table-striped">
				<thead>
					<tr>
					<th style="width: 30%">First Name</th>
					<th style="width: 20%">Last Name</th>
					<th style="width: 20%">Type</th>
					<th class="col-4">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="user in users" :key="user.id">
						<td>{{user.firstName}}</td>
						<td>{{user.lastName}}</td>
						<td><strong>{{user.type.toUpperCase()}}</strong></td>
						<td class="col-4">
							<a @click="handleClickDelete(user.id)">
								<i class="glyphicon glyphicon-remove icon-action"></i>
							</a>
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
      ...mapGetters('users', ['users'])
	},
	methods: {
		...mapActions('users',['getItems','delete']),
		async handleClickDelete(id) {
			await this.delete(id)
		}
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