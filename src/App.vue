<template>
  <div id="app" class="container shadow-lg p-3 mb-5 bg-body">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.container {
  text-align: center;
  margin-top: 60px;
  border-radius: 10%;
}

#app {
  background-color: rgb(211, 250, 237);
}
</style>
