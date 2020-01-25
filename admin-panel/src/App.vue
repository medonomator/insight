<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  line-height: 1.6;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
}

.add-aphorism {
  border: none;
  color: white;
  outline: none;
  background: #5969be;
  border-radius: 4px;
  padding: 5px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: lighten(#5969be, 5%);
  }
}
</style>
