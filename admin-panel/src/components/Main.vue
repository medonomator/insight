<template>
  <div class="main">
    <div class="left-bar">
      <router-link to="/admin/aphorisms">Афоризмы</router-link>
      <router-link to="/admin/meterials">Материалы</router-link>
      <router-link to="/admin/subscribers">Subscribers</router-link>
      <router-link to="/admin/tasks">Tasks</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.left-bar {
  background: #4e007d;
  height: 100vh;
  width: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  // box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  // box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  // box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  // box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  a {
    color: white;
    margin-right: 20px;
    font-size: 20px;
    transition: 0.3s ease;
    &:hover {
      color: rgb(180, 255, 220);
    }
  }

  margin-right: 20px;
}

.main {
  display: flex;
  flex-direction: row;
}
</style>
