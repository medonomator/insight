<template>
  <div id="app">
    <div class="header">
      <router-link to="/admin">Main</router-link>
      <router-link to="/admin/aphorisms">Aphorisms</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  line-height: 1.6;
}
.header {
  margin: 10px;
  margin-bottom: 30px;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.header a {
  padding: 10px;
  text-transform: uppercase;
  text-decoration: none;
  color: black;
  font-weight: 500;
  font-size: 20px;
  background: green;
  color: white;
  border-radius: 4px;
  transition: all 0.3s ease;
}
.header a:hover {
  background: rebeccapurple;
}
</style>
