<template>
  <form class="form">
    <input v-model="email" type="text" name="email" class="form-control" placeholder="Email" />
    <br />
    <input v-model="password" type="text" name="password" class="form-control" placeholder="Password" />
    <br />
    <button v-on:click="auth({ email, password })" type="button" class="btn btn-primary">Primary</button>
  </form>
</template>

<script>
import axios from "axios";
import { getBaseUrl, setAuthorizationToken, setToken } from "../helpers";
import router from "../router";

export default {
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    auth: function({ email, password }) {
      axios
        .post(`${getBaseUrl()}/user/login`, {
          email,
          password
        })
        .then(res => {
          const { token } = res.data;
          setAuthorizationToken(token);
          setToken(token);
          router.push("/admin");
        })
        .catch(error => {
          alert(error.message);
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  margin-top: 200px;
  width: 300px;
  margin: auto;
}
</style>
