<template>
  <div class="aphorisms">
    <div>
      <!-- <strong>Всего: {{ this.count }}</strong> Афоризмов -->
    </div>
    <!-- <modal-form /> -->

    <input @click="show('addAphorism')" type="button" value="Добавить" class="add-aphorism" />
    <ul class="aphorisms-header">
      <div class="header-input-filter">
        <v-text-field @input="authorFilterHandler" label="Автор"></v-text-field>
      </div>
      <div class="header-input-filter">
        <v-text-field @input="bodyFilterHandler" label="Афоризм"></v-text-field>
      </div>
    </ul>

    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">Автор</th>
          <th class="text-left">Афоризм</th>
          <th class="text-left">Топик</th>
          <th class="text-left">Редактировать</th>
          <th class="text-left">Удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in this.aphorismData" :key="item._id">
          <td style="width: 200px">{{ item.author }}</td>
          <td>{{ item.body }}</td>
          <td>
            <span
              class="aphorisms-topic"
              v-for="(tag, index) in item.tags"
              :key="index"
            >{{ tag.name }}</span>
          </td>
          <td>
            <font-awesome-icon @click="show('updateAphorism', item)" class="icon-pencil" icon="pen"></font-awesome-icon>
          </td>
          <td>
            <font-awesome-icon @click="deleteAphorism(item._id)" class="icon-trash" icon="trash"></font-awesome-icon>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import axios from "axios";
import { getBaseUrl } from "../helpers";
// import ModalForm from "@/components/ModalForm";

export default {
  data() {
    return {
      aphorismData: [],
      count: 0
    };
  },
  // components: {
  //   "modal-form": ModalForm
  // },
  async mounted() {
    const res = await axios.get(`${getBaseUrl()}/v1/admin/aphorisms`);
    this.aphorismData = res.data.data;
    this.count = res.data.count;
  },
  methods: {
    authorFilterHandler: async function(value) {
      const author = value ? `?author=${value}` : "";
      const res = await axios.get(`${getBaseUrl()}/v1/admin/aphorisms${author}`);
      this.aphorismData = res.data.data;
      this.count = res.data.count;
    },
    bodyFilterHandler: async function(value) {
      const body = value ? `?body=${value}` : "";
      const res = await axios.get(`${getBaseUrl()}/v1/admin/aphorisms${body}`);
      this.aphorismData = res.data.data;
      this.count = res.data.count;
    },
    deleteAphorism: function(_id) {
      axios
        .delete(`${getBaseUrl()}/v1/admin/aphorisms`, { data: { _id } })
        .then(() => {
          this.aphorismData = this.aphorismData.filter(
            item => item._id !== _id
          );
        });
    },
    addAphorism: function({ author, body, tags, category }) {
      axios
        .post(`${getBaseUrl()}/v1/admin/aphorisms`, {
          author,
          body,
          tags: tags.split(", "),
          category
        })
        .then(res => {
          this.aphorismData.unshift({
            author,
            body,
            tags: tags.split(", ").map(item => ({ name: item })),
            _id: res.data._id
          });
          this.$modal.hide("add-aphorism");
        });
    },
    updateAphorism: function({ author, body, tags, _id, category }) {
      axios
        .put(`${getBaseUrl()}/v1/admin/aphorisms`, {
          _id,
          author,
          body,
          tags: tags.split(","),
          category
        })
        .then(() => {
          this.aphorismData = this.aphorismData.map(item => {
            return item._id === _id
              ? {
                  ...item,
                  author,
                  body,
                  tags: tags.split(", ").map(item => ({ name: item })),
                  _id,
                  category
                }
              : item;
          });
          this.$modal.hide("add-aphorism");
        });
    },
    show(nameModal, item) {
      this.$modal.show("add-aphorism", { func: this[nameModal], item });
    },
    hide() {
      this.$modal.hide("add-aphorism");
    }
  }
};
</script>
<style lang="sass" scoped>

.header-input-filter
  width: 150px
  margin-left: 15px

.aphorisms-header
  margin: 20px 0
  display: flex
  &-item
    display: flex

.aphorisms
  text-align: left
  font-size: 20px
  margin: 20px

  &-item
    border-radius: 4px
    display: flex
    background: #3f3250
    cursor: pointer
    color: white
    transition: all .3s ease
    &:hover
      background: #534763

  &-author
    width: 250px
    border-right: 1px solid
    align-self: center
    padding: 15px 5px

  &-body
    flex: 1
    align-self: center
    padding-left: 10px

  &-tags
    width: 200px
    border-left: 1px solid
    font-size: 16px
    display: flex
    flex-direction: column
    padding-left: 10px
    align-self: center

.icon-trash
  align-self: center
  padding-right: 10px
  font-size: 30px
  cursor: pointer
  transition: all .3s ease
  &:hover
    color: red

.icon-pencil
  position: relative
  top: 2px
  width: 90px
  font-size: 20px
  transition: all .3s ease
  cursor: pointer
  &:hover
    color: green

.aphorisms-topic
  margin-right: 10px
</style>
