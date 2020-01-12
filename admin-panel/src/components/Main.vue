<template>
  <div>
    <v-app-bar class="app-bar">
      <router-link to="/admin/content">Контент</router-link>
      <router-link to="/admin/aphorisms">Афоризмы</router-link>
      <router-link to="/admin/affirmation">Аффирмации</router-link>
      <router-link to="/admin/meterials">Материалы</router-link>
      <router-link to="/admin/tasks">Tasks</router-link>

      <v-spacer></v-spacer>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.app-bar {
  background: #3753e7 !important;
  a {
    color: white;
    margin-right: 20px;
    font-size: 20px;
    transition: 0.3s ease;
    &:hover {
      color: rgb(180, 255, 220);
    }
  }
}
.v-btn--outlined .v-btn__content .v-icon,
.v-btn--round .v-btn__content .v-icon {
  color: white;
}
</style>
