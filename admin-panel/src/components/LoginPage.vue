<template>
  <v-card class="v-card" max-width="344">
    <v-card-text>
      <v-text-field name="email" v-model="email" label="Login"></v-text-field>
      <v-text-field name="password" v-model="password" label="Password"></v-text-field>
    </v-card-text>
    <v-btn v-on:click="auth({ email, password })">Enter</v-btn>
  </v-card>
</template>

<script>
import axios from 'axios';
import { getBaseUrl, setAuthorizationToken, setToken } from '../helpers';
import router from '../router';

export default {
  data: function() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    auth: function({ email, password }) {
      axios
        .post(`${getBaseUrl()}/user/login`, {
          email,
          password,
        })
        .then(res => {
          const { token } = res.data;
          setAuthorizationToken(token);
          setToken(token);
          router.push('/admin');
        })
        /* eslint-disable no-console */
        .catch(error => {
          alert(error.message);
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  margin: auto;
  margin-top: 10%;
  padding-bottom: 30px;
  text-align: center;
}
</style>
