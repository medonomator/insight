<template>
  <div>
    <h1>Subscribers</h1>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Created</th>
        </tr>
      </thead>
      <tbody v-for="item in subscribers" :key="item.id">
        <tr>
          <td>{{ item.id }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.created_at.slice(0, -8 ).replace('T', ' ') }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { getBaseUrl } from "../helpers";

export default {
  data() {
    return {
      subscribers: [],
      count: 0
    };
  },
  // components: {
  //   "modal-form": ModalForm
  // },
  async mounted() {
    const res = await axios.get(`${getBaseUrl()}/v1/admin/subscribers`);
    this.subscribers = res.data.data;
    this.count = res.data.count;
  }
};
</script>

<style lang="scss" scoped></style>
