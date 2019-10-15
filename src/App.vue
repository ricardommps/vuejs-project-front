<template>
  <div id="app">
	<navbar></navbar>
	<notifier></notifier>
	<router-view></router-view>
  </div>
</template>

<script>
import Notifier from './components/Notifier'
import Navbar from './components/Navbar'
export default {
  name: 'app',
  components: { Notifier, Navbar }
}
</script>

<style>
	#app {
		margin: 20px;
	}
</style>
