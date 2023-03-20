<template>
  <div v-if="newpw" class="vertical afterscreen">
    <span>Passwort für neuen Account: </span>
    <span v-if="newpw" v-text="newpw"></span>
    <button @click="resetForm()">Weiteren Account anlegen</button>
    <button @click="this.$router.push('/users')">Zur Accountübersicht</button>
  </div>
  <div class="vertical" v-else>
    <h2>Neuen Account anlegen</h2>
    <form id="user-form" method="POST">
      <div class="form-line">
        Username
        <input name="user" v-model="username" id="user" type="text">
      </div>
      <div class="form-line">
        E-Mail
        <input type="email" v-model="email" name="email"/>
      </div>
      <div class="form-line">
        Vorname
        <input type="text" v-model="firstname" name="firstname"/>
      </div>
      <div class="form-line">
        Nachname
        <input type="text" v-model="lastname" name="lastname"/>
      </div>
      <div class="form-line">
        <input type="submit" value="Speichern" v-on:click.prevent="submitForm()">
        <button @click="this.$router.push('/users')">Abbrechen</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddUser",

  data: function () {
    return {
      username: '',
      email: '',
      firstname: '',
      lastname: '',
      newpw: false,
    }
  },
  methods: {
    submitForm() {
      let formData = new FormData;
      formData.append('username', this.username);
      formData.append('email', this.email);
      formData.append('firstname', this.firstname);
      formData.append('lastname', this.lastname);

      axios.post(this.apibase + '/user', formData, {
        headers: {
          'Token': localStorage.getItem('token'),
        }
      })
          .then(() => {
            this.$router.push('/users');
          })
          .catch((error) => {
            console.log(error);
          });
    },
    resetForm() {
      this.newpw = false;
      this.username = '';
      this.email = '';
      this.firstname = '';
      this.lastname = '';
    }
  }
}
</script>

<style>
div.vertical {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

div.form-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

input, option, select, button {
  font-size: 1.5em;
  margin: .5em;
}

.afterscreen span {
  font-size: 1.5em;
}
</style>