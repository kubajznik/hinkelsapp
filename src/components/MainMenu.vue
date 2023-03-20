<template>
  <nav>
    <div v-if="loggedin && !adminview">
      <router-link to="/home"><font-awesome-icon icon="fa-solid fa-user" /></router-link>
    </div>
    <div v-if="loggedin && !adminview">
      <router-link to="/workplan"><font-awesome-icon icon="fa-solid fa-calendar-days" /></router-link>
    </div>
    <div v-if="loggedin && !adminview">
      <router-link to="/inventory"><font-awesome-icon icon="fa-solid fa-boxes-stacked" /></router-link>
    </div>
    <div v-if="loggedin && !adminview">
      <router-link to="/notes"><font-awesome-icon icon="fa-solid fa-note-sticky" /></router-link>
    </div>
    <div v-if="loggedin && adminview">
      <router-link to="/users"><font-awesome-icon icon="fa-solid fa-user" /></router-link>
    </div>
    <div v-if="loggedin && adminview">
      <router-link to="/shifts"><font-awesome-icon icon="fa-solid fa-calendar-week" /></router-link>
    </div>
    <div v-if="loggedin && adminview">
      <router-link to="/products"><font-awesome-icon icon="fa-solid fa-box-open" /></router-link>
    </div>
    <div v-if="loggedin && isadmin">
      <router-link to="/admin" @click="adminview = !adminview"><font-awesome-icon icon="fa-solid fa-screwdriver-wrench" /></router-link>
    </div>
    <div v-if="loggedin">
      <router-link to="/logout" @click="logout()"><font-awesome-icon icon="fa-solid fa-right-from-bracket" /></router-link>
    </div>
    <div v-else>
      <router-link to="/login"><font-awesome-icon icon="fa-solid fa-right-to-bracket" /></router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "MainMenu",
  data: function () {
    return {
      loggedin: false,
      adminview: false,
      isadmin: false,
    }
  },
  methods: {
    login() {
      this.loggedin = true;
    },
    logout () {
      this.loggedin = false;
    }
  },
  mounted() {
    this.emitter.on('logon', isadmin => {
      this.loggedin = true;
      this.isadmin = isadmin == 1;
    })
  }
}
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: sticky;
  top: 0;
  background: linear-gradient(0deg, lightgrey, grey);
  z-index: 5000;
}

a, a:link, a:visited {
  color: lightgrey;
  font-size: 1.5em;
}

a.router-link-active {
  color: grey;
}
</style>