<template>
  <div class="vertical">
    <div class="profile-header">
      <font-awesome-icon icon="fa-solid fa-umbrella-beach" @click="$router.push('/vacation')" />
      <font-awesome-icon icon="fa-solid fa-pen" @click="$router.push('/userview/' + user)" />
      <font-awesome-icon icon="fa-solid fa-key" @click="$router.push('/login/changepw')"/>
    </div>
    <h4>Kommende Schichten</h4>
    <LoaderAnimation v-if="showLoader"/>
    <div v-for="shift of upcomingShifts" :id="shift.id" :key="shift.id" class="shift">
      <div>
        <span v-text="shift.firstname + ' ' + shift.lastname.substring(0,1) + '.'"></span>, <span
          v-text="shift.position"></span>
        <br>
        <span v-text="shift.date"></span>
        <br>
        <span v-text="shift.start"></span> - <span v-text="shift.end"></span>
      </div>
      <div>
        <font-awesome-icon icon="fa-solid fa-shuffle" style="font-size: 1.5em"
                           @click="$router.push('/swap/'+shift.id)"/>
      </div>
    </div>
    <p v-if="!showLoader && upcomingShifts.length === 0">Keine kommenden Schichten</p>
    <h4>Vergangene Shichten</h4>
    <LoaderAnimation v-if="showLoader"/>
    <div v-for="shift of pastShifts" :id="shift.id" :key="shift.id" class="shift past">
      <div>
        <span v-text="shift.firstname + ' ' + shift.lastname.substring(0,1) + '.'"></span>, <span
          v-text="shift.position"></span>
        <br>
        <span v-text="shift.date"></span>
        <br>
        <span v-text="shift.start"></span> - <span v-text="shift.end"></span>
      </div>
      <div>
      </div>
    </div>
    <p v-if="!showLoader && pastShifts.length === 0">Keine vergangenen Schichten</p>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import LoaderAnimation from "@/components/LoaderAnimation";
import axios from "axios";

export default {
  name: "UserHome",
  components: {
    FontAwesomeIcon,
    LoaderAnimation,
  },
  data: function () {
    return {
      upcomingShifts: [],
      pastShifts: [],
      showLoader: true,
      user: null,
    }
  },
  methods: {
    getShifts() {
      axios.get(this.apibase + '/shift/user/' + localStorage.getItem('user'), {
        headers: {
          'Token': localStorage.getItem('token'),
        }
      }).then(response => {
        if (response.status === 200) {
          console.log(response.data)
          for (let d of response.data) {
            console.log(Date.parse(d.date) > Date.now())
            if (Date.parse(d.date) > Date.now()) this.upcomingShifts.push(d);
            else this.pastShifts.push(d);
          }
          console.log(this.pastShifts)
          this.showLoader = false;
        } else {
          console.log("Server returned " + response.status + " : " + response.statusText);
        }
      });
    },
  },

  mounted() {
    this.user = localStorage.getItem('user');
    this.getShifts();
  }
}
</script>

<style scoped>
.profile-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 80%;
  font-size: 1.5em;
  padding: .5em 0;
}

h4 {
  margin-block-end: .1em;
}
</style>