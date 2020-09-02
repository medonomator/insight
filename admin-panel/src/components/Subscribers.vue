<template>
  <div>
    <h1>Subscribers</h1>
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

    console.log("============================================================");
    console.dir(res.data, { depth: 5 });
    console.log("============================================================");
    this.subscribers = res.data.data;
    this.count = res.data.count;
  }
};
</script>

<style lang="scss" scoped></style>
