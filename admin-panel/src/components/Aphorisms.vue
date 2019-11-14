<template>
  <div>
    <div>
      <strong>{{ this.count }}</strong> Aphorisms
    </div>
    <modal-form />
    <input v-on:click="show('addAphorism')" type="button" value="Добавить" class="add-aphorism" />
    <ul class="aphorisms-header">
      <div class="aphorisms-header-item">
        <b>Автор</b>
        <input name="author" @input="headerFilter" class="aphorisms-filter" type="text" />
      </div>
      <div class="aphorisms-header-item">
        <b>Афоризм</b>
        <input name="body" @input="headerFilter" class="aphorisms-filter" type="text" />
      </div>e
      <div class="aphorisms-header-item">
        <b>limit</b>
        <select>
          e
          <option>100</option>
          <option>200</option>
          <option>500</option>
          <option>Все</option>
        </select>
      </div>
    </ul>
    <ul class="aphorisms" v-for="item in this.aphorismData" :key="item._id">
      <li class="aphorisms-item">
        <span class="aphorisms-author">{{ item.author }}</span>
        <span class="aphorisms-body">{{ item.body }}</span>
        <div class="aphorisms-tags">
          <span v-for="(tag, index) in item.tags" :key="index">{{ tag.name }}</span>
        </div>
        <font-awesome-icon v-on:click="show('updateAphorism', item)" class="icon-pencil" icon="pen"></font-awesome-icon>
        <span v-on:click="deleteAphorism(item._id)" class="aphorisms-delete">+</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { getBaseUrl } from "../helpers";
import ModalForm from "@/components/ModalForm";

export default {
  data() {
    return {
      aphorismData: [],
      count: 0
    };
  },
  components: {
    "modal-form": ModalForm
  },
  async mounted() {
    const res = await axios.get(`${getBaseUrl()}/admin/aphorisms`);
    this.aphorismData = res.data.data;
    this.count = res.data.count;
  },
  methods: {
    headerFilter: async function(e) {
      const res = await axios.get(
        `${getBaseUrl()}/admin/aphorisms?${e.target.name}=${e.target.value}`
      );
      this.aphorismData = res.data.data;
      this.count = res.data.count;
    },
    deleteAphorism: function(_id) {
      axios
        .delete(`${getBaseUrl()}/admin/aphorisms`, { data: { _id } })
        .then(res => {
          this.aphorismData = this.aphorismData.filter(
            item => item._id !== _id
          );
        });
    },
    addAphorism: function({ author, body, tags }) {
      axios
        .post(`${getBaseUrl()}/admin/aphorisms`, {
          author,
          body,
          tags: tags.split(", ")
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
    updateAphorism: function({ author, body, tags, _id }) {
      axios
        .put(`${getBaseUrl()}/admin/aphorisms`, {
          _id,
          author,
          body,
          tags: tags.split(",")
        })
        .then(res => {
          this.aphorismData = this.aphorismData.map(item => {
            return item._id === _id
              ? {
                  ...item,
                  author,
                  body,
                  tags: tags.split(", ").map(item => ({ name: item })),
                  _id
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

.aphorisms-header
  margin: 20px 0
  display: flex
  &-item
    display: flex
 
.aphorisms
  text-align: left
  font-size: 20px
  margin: 10px 0

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

  &-delete
    align-self: center
    padding-right: 10px
    font-size: 40px
    transform: rotate(45deg)
    cursor: pointer
    position: relative
    top: 4px
    transition: all .3s ease
    &:hover
      color: red

.add-aphorism
  border: none
  color: white
  background: #238000
  border-radius: 4px
  padding: 5px 20px
  font-size: 16px
  cursor: pointer
  transition: all .3s ease
  &:hover
    background: lighten(#238000, 5%)
    
.icon-pencil 
  align-self: center  
  padding-right: 15px
  transition: all .3s ease
  &:hover
    color: orange
</style>
