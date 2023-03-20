<template>
  <div class="vertical">
    <font-awesome-icon icon="fa-circle-plus" @click="this.$router.push('/newuser')" class="add"/>
    <LoaderAnimation v-if="showLoader"/>
    <div v-for="user of users" :id="user.id" :key="user.id" class="user"
         :style="'border-color: rgb(' + user.color + ');'" v-else >
      <div @click="this.$router.push('/userview/'+user.id)">
        <span v-text="user.firstname + ' ' + user.lastname"></span>
        <br>
        <span v-text="user.email"></span>
      </div>
      <div style="z-index: 1000;" @click="$router.push('/newshift/'+user.id)">
        <font-awesome-icon icon="fa-solid fa-up-right-from-square"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LoaderAnimation from "@/components/LoaderAnimation";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "UserAdmin",
  components: {FontAwesomeIcon, LoaderAnimation},
  data: function () {
    return {
      users: [],
      showLoader: true,
    }
  },
  methods: {
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
          this.showLoader = false;
        } else {
          console.log("Server returned " + response.status + " : " + response.statusText);
        }
      });
    },
  },


  mounted() {
    this.getUsers();
  }
}
</script>

<style scoped>
.user {
  background: darkgrey;
  border-radius: 20px;
  margin: .5em auto .5em auto;
  display: flex;
  justify-content: space-between;
  width: 80vw;
  border-style: inset;
  border-left: 20px solid;
  border-bottom: none;
  border-top: none;
  border-right: none;
}

.user>div {
  padding: 1em;
}

.user > div:last-child {
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete {
  font-size: 1.5em;
  color: red;
}

.delete:hover, .delete:active {
  font-weight: bold;
}

.add {
  font-size: 2em;
  color: green;
}
</style>