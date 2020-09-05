<template>
  <div>
    <h1>
      Materials <strong>{{ count }}</strong>
    </h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">websiteUrl</th>
          <th scope="col">youtubeUrl</th>
          <th scope="col">audiobooks</th>
          <th scope="col">books</th>
          <th scope="col">tags</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody v-for="item in materials" :key="item.id">
        <tr>
          <td>{{ item.id }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.website_url }}</td>
          <td>{{ item.youtube_url }}</td>
          <td>{{ item.audiobooks }}</td>
          <td>{{ item.books }}</td>
          <td>
            <p v-for="tag in item.tags" :key="tag.name">{{ tag.name }}</p>
          </td>
          <td class="actions">
            <div @click="show('updateMaterial', item)"><i class="fas fa-pencil-alt" aria-hidden="true"></i></div>
            <div @click="show('deleteMaterial', item)"><i class="fas fa-trash-alt" aria-hidden="true"></i></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { getBaseUrl } from "../helpers";
import ModalForm from "@/components/ModalForm";

export default {
  data() {
    return {
      materials: [],
      count: 0
    };
  },
  methods: {
    show(nameModal, item) {
      console.log('============================================================');
      console.dir(item, { depth: 5 });
      console.log('============================================================');
      this.$modal.show("add-aphorism", { func: this[nameModal], item });
    },
    hide() {
      this.$modal.hide("add-aphorism");
    }
  },
  components: {
    "modal-form": ModalForm
  },
  async mounted() {
    const res = await axios.get(`${getBaseUrl()}/v1/admin/materials`);
    this.materials = res.data.data;
    this.count = res.data.count;
  }
};
</script>

<style lang="scss" scoped>
.table td {
  max-width: 185px;

  overflow: hidden;
}

h1 strong {
  color: green;
  font-size: 24px;
}

.fa-pencil-alt,
.fa-trash-alt {
  font-size: 20px;
  margin: 0 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.fa-pencil-alt {
  color: green;
  &:hover {
    color: darken(green, 10%);
  }
}
.fa-trash-alt {
  color: darkred;
  &:hover {
    color: lightcoral;
  }
}

.actions {
  display: flex;
}
</style>
