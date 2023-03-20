<template>
  <div class="vertical">
    <font-awesome-icon icon="fa-solid fa-left-long" @click="$router.push('/users')"/>
    <LoaderAnimation v-if="showLoader"/>
    <div class="vertical" v-else>
      <h3 v-text="'Account von ' + user.username + ' bearbeiten'"></h3>
      <input type="email" v-model="user.email" />
      <input type="text" v-model="user.firstname" />
      <input type="text" v-model="user.lastname" />
      <font-awesome-icon icon="fa-solid fa-circle-minus" class="delete" @click="$router.push('/delete/user/' + user.id)"/>
    </div>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import axios from "axios";
import LoaderAnimation from "@/components/LoaderAnimation";

export default {
  name: "UserView",
  components: {FontAwesomeIcon, LoaderAnimation},
  props: {
    userID: String
  },
  data: function () {
    return {
      user: {},
      showLoader: true,
    }
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      axios.get(this.apibase + '/user/' + this.userID, {
        headers: {
          'Token': localStorage.getItem('token'),
        }
      }).then(response => {
        if (response.status === 200) {
          this.user = response.data[0];
          this.showLoader = false;
        } else {
          console.log("Server returned " + response.status + " : " + response.statusText);
        }
      });
    },
    deleteUser(id) {
      axios.delete(this.apibase + '/user/' + id, {
        headers: {
          'Token': localStorage.getItem('token'),
        }
      }).then(response => {
        if (response.status === 200) {
          this.$router.push('/users');
        } else {
          console.log("Server returned " + response.status + " : " + response.statusText);
        }
      });
    },
  }
}
</script>

<style scoped>

</style>