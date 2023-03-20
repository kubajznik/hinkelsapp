<template>
  <div class="vertical">
    <font-awesome-icon icon="fa-circle-plus" @click="this.$router.push('/newshift')" class="add"/>
    <span>Kommende Schichten</span>
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
        <font-awesome-icon icon="fa-solid fa-circle-minus" class="delete"
                           @click="$router.push('/delete/shift/'+shift.id)"/>
      </div>
    </div>
    <span>Vergangene Shichten</span>
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
        <font-awesome-icon icon="fa-solid fa-circle-minus" class="delete"
                           @click="$router.push('/delete/shift/'+shift.id)"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import LoaderAnimation from "@/components/LoaderAnimation";

export default {
  name: "ShiftAdmin",
  components: {
    FontAwesomeIcon,
    LoaderAnimation,
  },
  data: function () {
    return {
      upcomingShifts: [],
      pastShifts: [],
      showLoader: true,
    }
  },
  methods: {
    getShifts() {
      axios.get(this.apibase + '/shift/', {
        headers: {
          'Token': localStorage.getItem('token'),
        }
      }).then(response => {
        if (response.status === 200) {
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
    this.getShifts();
  }
}
</script>

<style>
.shift {
  background: darkgrey;
  border-radius: 20px;
  padding: 1em;
  margin: .5em auto .5em auto;
  display: flex;
  justify-content: space-between;
  min-width: 80vw;
}

.shift > div:last-child {
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

.past .delete {
  color: rgba(255, 0, 0, .5);
}

.add {
  font-size: 2em;
  color: green;
  margin-bottom: 1em;
}

.past {
  color: grey;
}
</style>