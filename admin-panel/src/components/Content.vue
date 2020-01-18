<template>
  <div class="content">
    <div class="block">
      <h1>Главная</h1>
      <v-text-field :disabled="isChangeMainPageData" v-model="mainPage.headerH1" />
      <v-textarea :disabled="isChangeMainPageData" v-model="mainPage.headerText" />
      <v-btn
        :disabled="!isChangeMainPageData"
        class="button"
        color="#2196F3"
        @click="isChangeMainPageData = !isChangeMainPageData"
        >Редактировать</v-btn
      >
      <v-btn
        :disabled="isChangeMainPageData"
        class="button"
        color="#64DD17"
        @click="
          saveData({ mainPage });
          isChangeMainPageData = !isChangeMainPageData;
        "
        >Сохранить</v-btn
      >
    </div>

    <div class="block">
      <h1>Афоризмы</h1>
      <v-text-field :disabled="isChangeAphorismPageData" v-model="aphorismPage.headerH1" />
      <v-textarea :disabled="isChangeAphorismPageData" v-model="aphorismPage.headerText" />

      <v-btn
        :disabled="!isChangeAphorismPageData"
        class="button"
        color="#2196F3"
        @click="isChangeAphorismPageData = !isChangeAphorismPageData"
        >Редактировать</v-btn
      >
      <v-btn
        :disabled="isChangeAphorismPageData"
        class="button"
        color="#64DD17"
        @click="
          saveData({ aphorismPage });
          isChangeAphorismPageData = !isChangeAphorismPageData;
        "
        >Сохранить</v-btn
      >
    </div>

    <div class="block">
      <h1>Аффирмации</h1>
      <v-text-field :disabled="isChangeAffirmationPageData" v-model="affirmationPage.headerH1" />
      <v-textarea :disabled="isChangeAffirmationPageData" v-model="affirmationPage.headerText" />

      <v-btn
        :disabled="!isChangeAffirmationPageData"
        class="button"
        color="#2196F3"
        @click="isChangeAffirmationPageData = !isChangeAffirmationPageData"
        >Редактировать</v-btn
      >
      <v-btn
        :disabled="isChangeAffirmationPageData"
        class="button"
        color="#64DD17"
        @click="
          saveData({ affirmationPage });
          isChangeAffirmationPageData = !isChangeAffirmationPageData;
        "
        >Сохранить</v-btn
      >
    </div>

    <div class="block">
      <h1>Материалы</h1>
      <v-text-field :disabled="isChangeMaterialPageData" v-model="materialPage.headerH1" />
      <v-textarea :disabled="isChangeMaterialPageData" v-model="materialPage.headerText" />

      <v-btn
        :disabled="!isChangeMaterialPageData"
        class="button"
        color="#2196F3"
        @click="isChangeMaterialPageData = !isChangeMaterialPageData"
        >Редактировать</v-btn
      >
      <v-btn
        :disabled="isChangeMaterialPageData"
        class="button"
        color="#64DD17"
        @click="
          saveData({ materialPage });
          isChangeMaterialPageData = !isChangeMaterialPageData;
        "
        >Сохранить</v-btn
      >
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { getBaseUrl } from '../helpers';
export default {
  data() {
    return {
      mainPage: {},
      aphorismPage: {},
      affirmationPage: {},
      materialPage: {},
      isChangeMainPageData: true,
      isChangeAphorismPageData: true,
      isChangeAffirmationPageData: true,
      isChangeMaterialPageData: true,
    };
  },
  async mounted() {
    try {
      const { data } = await axios.get(`${getBaseUrl()}/admin/mainData`);
      const { mainPage, aphorismPage, affirmationPage, materialPage } = data;

      this.mainPage = mainPage || {};
      this.aphorismPage = aphorismPage || {};
      this.affirmationPage = affirmationPage || {};
      this.materialPage = materialPage || {};
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async saveData(data) {
      try {
        await axios.put(`${getBaseUrl()}/admin/mainData`, data);
      } catch (error) {
        console.log(error);
      }
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
.button {
  margin-right: 20px;
}
</style>
