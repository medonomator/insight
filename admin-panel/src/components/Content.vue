<template>
  <div class="content">
    <div class="block">
      <h1>Главная</h1>
      <p class="headerH1">{{ mainData.mainPage.headerH1 }}</p>
      <!-- <font-awesome-icon @click="show('toggleInput', item)" class="icon-pencil" icon="pen"></font-awesome-icon> -->
      <p class="headerText">{{ mainData.mainPage.headerText }}</p>
    </div>
    <hr />
    <div class="block">
      <h1>Афоризмы</h1>
      <p class="headerH1">{{ mainData.aphorismPage.headerH1 }}</p>
      <p class="headerText">{{ mainData.aphorismPage.headerText }}</p>
    </div>
    <hr />
    <div class="block">
      <h1>Аффирмации</h1>
      <p class="headerH1">{{ mainData.affirmationPage.headerH1 }}</p>
      <p class="headerText">{{ mainData.affirmationPage.headerText }}</p>
    </div>
    <hr />
    <div class="block">
      <h1>Материалы</h1>
      <p class="headerH1">{{ mainData.materialPage.headerH1 }}</p>
      <p class="headerText">{{ mainData.materialPage.headerText }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { getBaseUrl } from '../helpers';
export default {
  data() {
    return {
      mainData: {},
      count: 0,
    };
  },
  async mounted() {
    const res = await axios.get(`${getBaseUrl()}/admin/getMainData`);
    this.mainData = res.data;
    console.log('=============================');
    console.log('logging', this.mainData);
    console.log('=============================');
  },
};
</script>

<style lang="scss" scoped>
.content {
  margin: 20px;
}
.block {
  margin-bottom: 40px;
}

h1 {
  font-size: 24px;
  margin: 10px 0;
}

.headerH1 {
  margin-bottom: 15px;
}
</style>
