<template>
  <div class="vertical">
    <font-awesome-icon icon="fa-circle-plus" @click="this.$router.push('/vacation/new')" class="add"/>
    <span>Kommende Urlaube</span>
    <LoaderAnimation v-if="showLoader"/>
    <div v-for="vacation of upcomingVacations" :id="vacation.id" :key="vacation.id" class="shift">
      <div>
        <span v-text="vacation.user"></span>
        <br>
        <span v-text="vacation.date"></span>
        <br>
        <span v-text="vacation.start"></span> - <span v-text="vacation.end"></span>
      </div>
      <div>
        <font-awesome-icon icon="fa-solid fa-circle-minus" class="delete"
                           @click="$router.push('/delete/shift/'+vacation.id)"/>
      </div>
    </div>
    <span>Vergangene Urlaube</span>
    <div v-for="vacation of pastVacations" :id="vacation.id" :key="vacation.id" class="shift past">
      <div>
        <span v-text="vacation.user"></span>
        <br>
        <span v-text="vacation.date"></span>
        <br>
        <span v-text="vacation.start"></span> - <span v-text="vacation.end"></span>
      </div>
      <div>
        <font-awesome-icon icon="fa-solid fa-circle-minus" class="delete"
                           @click="$router.push('/delete/shift/'+vacation.id)"/>
      </div>
    </div>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import LoaderAnimation from "@/components/LoaderAnimation";
import axios from "axios";

export default {
  name: "VacationOverview",
  components: {
    FontAwesomeIcon,
    LoaderAnimation,
  },
  data: function () {
    return {
      upcomingVacations: [],
      pastVacations: [],
      showLoader: true,
    }
  },
  methods: {
    getVacations() {
      axios.get(this.apibase + '/vacation/', {
        headers: {
          'Token': localStorage.getItem('token'),
        }
      }).then(response => {
        if (response.status === 200) {
          for (let d of response.data) {
            console.log(Date.parse(d.date) > Date.now())
            if (Date.parse(d.date) > Date.now()) this.upcomingVacations.push(d);
            else this.pastVacations.push(d);
          }
          console.log(this.pastVacations)
          this.showLoader = false;
        } else {
          console.log("Server returned " + response.status + " : " + response.statusText);
        }
      });
    },
  },
  mounted() {
    this.getVacations();
  }
}

</script>

<style scoped>
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