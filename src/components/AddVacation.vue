<template>
  <div class="vertical">
    <h2>Neue Schicht anlegen</h2>
    <form id="shift-form" method="POST">
      <div class="form-line">
        Name
        <select name="user" id="user" v-model="user">
          <option>...</option>
          <option v-for="user of users" :value="user.id" :key="user.id"
                  v-text="user.firstname + ' ' + user.lastname" :selected="this.userID==user.id?'selected':''"></option>
        </select>
      </div>
      <div class="form-line">
        Von
        <input type="date" v-model="start"/>
      </div>
      <div class="form-line">
        Bis
        <input type="date" v-model="end"/>
      </div>
      <div class="form-line">
        <input type="submit" class="button yes" v-on:click.prevent="submitForm()" value="Speichern"/>
        <button class="no" @click="this.$router.push('/vacation')">Abbrechen</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddVacation",
  data: function () {
    return {
      users: [],
      selectedUser: {},
      user: '',
      start: '',
      end: '',
    }
  },
  methods: {
    submitForm() {
      let formData = new FormData;
      formData.append('user', this.user);
      formData.append('start', this.start);
      formData.append('end', this.end);

      axios.post(this.apibase + '/vacation', formData, {
        headers: {
          'Token': localStorage.getItem('token'),
        }
      })
          .then(() => {
            this.$router.push('/vacation');
          })
          .catch((error) => {
            console.log(error);
          });
    },
    resetForm() {
      this.user = '';
      this.start = '';
      this.end = '';
    },
  }
}
</script>

<style scoped>

</style>