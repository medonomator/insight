<template>
  <div class="content">
    <div class="block">
      <h1>Главная</h1>
      <p class="headerH1">{{ mainData.mainPage && mainData.mainPage.headerH1 }}</p>
      <p class="headerText">{{ mainData.mainPage && mainData.mainPage.headerText }}</p>
      <input v-on:click="show('isChangeContent')" type="button" value="Изменить" class="add-aphorism" />
    </div>
    <hr />
    <div class="block">
      <h1>Афоризмы</h1>
      <p class="headerH1">{{ mainData.aphorismPage && mainData.aphorismPage.headerH1 }}</p>
      <p class="headerText">{{ mainData.aphorismPage && mainData.aphorismPage.headerText }}</p>
      <input v-on:click="show('isChangeContent')" type="button" value="Изменить" class="add-aphorism" />
    </div>
    <hr />
    <div class="block">
      <h1>Аффирмации</h1>
      <p class="headerH1">{{ mainData.affirmationPage && mainData.affirmationPage.headerH1 }}</p>
      <p class="headerText">{{ mainData.affirmationPage && mainData.affirmationPage.headerText }}</p>
      <input v-on:click="show('isChangeContent')" type="button" value="Изменить" class="add-aphorism" />
    </div>
    <hr />
    <div class="block">
      <h1>Материалы</h1>
      <p class="headerH1">{{ mainData.materialPage && mainData.materialPage.headerH1 }}</p>
      <p class="headerText">{{ mainData.materialPage && mainData.materialPage.headerText }}</p>
      <input v-on:click="show('isChangeContent')" type="button" value="Изменить" class="add-aphorism" />
    </div>
    <modal-form />
  </div>
</template>

<script>
import axios from 'axios';
import { getBaseUrl } from '../helpers';
import ModalForm from '@/components/ModalForm';
export default {
  data() {
    return {
      mainData: {},
      count: 0,
      isChangeContent: false,
    };
  },
  components: {
    'modal-form': ModalForm,
  },
  async mounted() {
    const res = await axios.get(`${getBaseUrl()}/admin/getMainData`);
    this.mainData = res.data;
    console.log('=============================');
    console.log('logging', this.mainData);
    console.log('=============================');
  },
  methods: {
    show(nameModal, item) {
      this.$modal.show('add-aphorism', { func: this[nameModal], item });
    },
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

.headerH1,
.headerText {
  margin-bottom: 25px;
}
</style>
