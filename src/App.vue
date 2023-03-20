<template>

  <MainMenu/>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<script>
import MainMenu from "@/components/MainMenu";
import axios from "axios";

export default {
  name: 'App',
  components: {
    MainMenu
  },
  mounted() {
    axios.get(this.apibase + '/user/' + localStorage.getItem('user'), {
      headers: {
        'Token': localStorage.getItem('token'),
      }
    }).then(response => {
      if (response.status === 200) {
        //this.emitter.emit('logon', localStorage.getItem('isadmin'));
        this.emitter.emit('logon', null);
        this.$router.push('/workplan');
      }
    }).catch(() => {
      this.$router.push('/login');
    });
  }
}

</script>

<style>
body {
  margin: 0;
}

#app {
  display: grid;
  grid-template-rows: 5em auto;
  height: 100vh;
  margin: 0;
  font-family: Montserrat;
}

@font-face {
  font-family: Montserrat;
  src: url("../public/font/montserrat/Montserrat-Regular.ttf");
}

.wrapper {
  padding: .5em;
}

.button, button {
  border-radius: 20px;
  border: none;
  color: white;
  text-transform: uppercase;
  font-size: 1em !important;
  font-family: Montserrat;
  padding: 0 .5em;
}

.button.yes, button.yes {
  background: green;
}
.button.no, button.no {
  background: red;
}
</style>
