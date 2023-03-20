<template>
  <div class="vertical" v-if="needpwchange || changepw === 'changepw'">
    <form method="post">
      <input type="password" placeholder="altes Passwort ..." v-model="pwChange.oldPW">
      <input type="password" placeholder="neues Passwort ..." v-model="pwChange.newPW">
      <input type="password" placeholder="Passwort wiederholen ..." v-model="pwChange.checkPW">
      <input type="submit" value="Speichern" v-on:click.prevent="changePW()">
    </form>
  </div>
  <div class="vertical" v-else>
    <form method="post">
      <input type="text" name="username" placeholder="Username ..." v-model="form.username">
      <input type="password" name="password" placeholder="Passwort ..." v-model="form.password">
      <input type="submit" value="Anmelden" v-on:click.prevent="login()" class="button yes">
    </form>
    <span v-if="wrongPW">Falsches Passwort</span>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "LoginPage",
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      pwChange: {
        oldPW: '',
        newPW: '',
        checkPW: '',
      },
      needpwchange: false,
      wrongPW: false,
    }
  },
  props: {
    user: String,
    pw: String,
    changepw: String,
  },
  mounted() {
    if (this.user && this.pw) {
      this.form.username = this.b64DecodeUnicode(this.user);
      this.form.password = this.b64DecodeUnicode(this.pw);
      this.login();
    }
  },
  methods: {
    login() {
      let formData = new FormData;
      formData.append('username', this.form.username);
      formData.append('password', this.form.password);

      axios.post(this.apibase + '/user/login', formData)
          .then((res) => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', res.data.user);
            localStorage.setItem('isadmin', res.data.isadmin);
            this.emitter.emit('logon', res.data.isadmin);
            if (res.data.needpwchange) this.needpwchange = true;
            else this.$router.push('/workplan');
          })
          .catch((error) => {
            if (error.response.status === 403) this.wrongPW = true;
          });
    },
    changePW() {
      let formData = new FormData;
      formData.append('old_pw', this.pwChange.oldPW);
      formData.append('new_pw', this.pwChange.newPW);
      formData.append('check_pw', this.pwChange.checkPW);

      axios.post(this.apibase + '/user/changepw', formData)
          .then(() => {
            this.$router.push('/shifts');
          })
          .catch((error) => {
            console.log(error);
          });
    },
    b64DecodeUnicode(str) {
      // Going backwards: from bytestream, to percent-encoding, to original string.
      return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    }
  },
}
</script>

<style scoped>

</style>