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
      <div class="form-line" v-if="!selectedUser.position">
        Position
        <!--<select name="position" v-model="position">
          <option v-for="[id, label] of Object.entries(selectedUser.position)" value="user.id" :key="id"
                  v-text="label"></option>
        </select>-->
        <select name="position" v-model="position">
          <option value="service">Service</option>
          <option value="kueche">Küche</option>
        </select>
      </div>
      <div class="form-line">
        Datum
        <input type="date" name="date" v-model="date"/>
      </div>
      <div class="form-line">
        Von
        <input type="time" step="900" name="start" v-model="start"/>
      </div>
      <div class="form-line">
        Bis
        <input type="time" name="end" v-model="end"/>
      </div>
      <div class="form-line">
        <input type="submit" class="button yes" v-on:click.prevent="submitForm()" value="Speichern"/>
        <button class="no" @click="this.$router.push('/shifts')">Abbrechen</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddShift",
  data: function () {
    return {
      users: [],
      selectedUser: {},
      user: '',
      position: '',
      date: '',
      start: '',
      end: '',
    }
  },
  props: {
    userID: String,
  },
  methods: {
    updateSelectedUser() {
      this.selectedUser = this.users[document.querySelector('#user').value];
    },
    submitForm() {
      let formData = new FormData;
      formData.append('user', this.user);
      formData.append('position', this.position);
      formData.append('date', this.date);
      formData.append('start', this.start);
      formData.append('end', this.end);

      axios.post(this.apibase + '/shift', formData, {
        headers: {
          'Token': localStorage.getItem('token'),
        }
      })
          .then(() => {
            this.$router.push('/shifts');
          })
          .catch((error) => {
            console.log(error);
          });
    },
    resetForm() {
      this.newpw = false;
      this.user = '';
      this.position = '';
      this.date = '';
      this.start = '';
      this.end = '';
    },
    getUsers() {
      axios.get(this.apibase + '/user/', {
        headers: {
          'Token': localStorage.getItem('token'),
        }
      }).then(response => {
        if (response.status === 200) {
          for (let d of response.data) {
            this.users.push(d);
          }
        } else {
          console.log("Server returned " + response.status + " : " + response.statusText);
        }
      });
    }
  },
  mounted() {
    this.getUsers();
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
</style>