<template>
  <modal name="add-aphorism" @before-close="beforeClose" @before-open="beforeOpen">
    <div class="modal-form">
      <input v-model="aphorismInputData.author" type="text" placeholder="Автор" />
      <textarea v-model="aphorismInputData.body" rows="10" cols="45" class="aphorism-textarea" placeholder="Афоризм" />
      <input v-model="aphorismInputData.tags" type="text" placeholder="Топик" />
      <input class="add-aphorism" v-on:click="handler(aphorismInputData)" type="button" value="Добавить" />
    </div>
  </modal>
</template>
<script>
export default {
  data: function() {
    return {
      count: 0,
      aphorismInputData: {
        author: '',
        body: '',
        tags: '',
        _id: '',
      },
      handler: () => {},
    };
  },
  methods: {
    beforeOpen(event) {
      const { item, func } = event.params;

      /** if update */
      if (item) {
        this.aphorismInputData = {
          ...item,
          tags: item.tags.map(({ name }) => name).join(', '),
        };
      }

      this.handler = func;
    },
    beforeClose() {
      this.aphorismInputData = {
        author: '',
        body: '',
        tags: '',
      };
    },
  },
};
</script>
<style lang="sass" scoped>
.modal-form
  display: flex
  flex-direction: column
  padding: 20px
  input, textarea
    margin: 3px
    border-radius: 4px
    border: 1px solid silver
    padding: 6px 10px
    font-size: 16px

.aphorism-textarea
  height: 100px
</style>
