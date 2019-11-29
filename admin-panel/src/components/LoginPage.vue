<template>
  <div>
    <input name="email" v-model="email" class="input" type="text" />
    <input name="password" v-model="password" class="input" type="text" />
    <input v-on:click="auth({ email, password })" type="button" value="Войти" class="auth" />
  </div>
</template>

<script>
import axios from "axios";
import { getBaseUrl, setAuthorizationToken, setToken } from "../helpers";
import Vue from "vue";
import { router } from "../router";

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
        .catch(error => console.log(error));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>